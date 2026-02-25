const WebSocket = require('ws');
const si = require('systeminformation');
const http = require('http');

const PORT = 3001;
const HTTP_PORT = 3002;

// Create WebSocket Server
const wss = new WebSocket.Server({ port: PORT });
console.log(`WebSocket Server started on ws://localhost:${PORT}`);

// Hardware Telemetry Broadcaster
setInterval(async () => {
    try {
        const cpu = await si.currentLoad();
        const memory = await si.mem();
        const graphics = await si.graphics();
        
        // Find main GPU (usually the discrete one if available)
        const gpu = graphics.controllers.find(g => g.vram > 0) || graphics.controllers[0] || { name: 'Generic GPU', vram: 8192, utilizationGpu: 0 };
        const vramTotal = gpu.vram ? (gpu.vram / 1024).toFixed(1) : '8.0'; // Approx GB

        const telemetry = {
            type: 'HARDWARE_TELEMETRY',
            data: {
                cpu: { usagePercent: Math.round(cpu.currentLoad) },
                memory: { 
                    usedGB: (memory.active / 1024 / 1024 / 1024).toFixed(1),
                    totalGB: (memory.total / 1024 / 1024 / 1024).toFixed(1),
                    usagePercent: Math.round((memory.active / memory.total) * 100)
                },
                gpu: {
                    name: gpu.model || 'RTX GPU',
                    usagePercent: gpu.utilizationGpu || 0, // Not always available on all OSes without admin
                    vramTotalGB: vramTotal
                }
            }
        };

        broadcast(telemetry);
    } catch (e) {
        console.error('Error fetching telemetry:', e);
    }
}, 2000); // Every 2 seconds

// HTTP Server for OpenClaw to push updates
const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/agent-update') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const update = JSON.parse(body);
                // Broadcast this update to frontend as 'AGENT_UPDATE'
                broadcast({ type: 'AGENT_UPDATE', data: update });
                res.writeHead(200);
                res.end('Update broadcasted');
            } catch (e) {
                res.writeHead(400);
                res.end('Invalid JSON');
            }
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(HTTP_PORT, () => {
    console.log(`HTTP Bridge listening on http://localhost:${HTTP_PORT}`);
});

function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}
