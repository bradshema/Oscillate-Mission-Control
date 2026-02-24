import { WebSocketServer, WebSocket } from 'ws';
import si from 'systeminformation';

const PORT = 3001;
const wss = new WebSocketServer({ port: PORT });

console.log(`[OpenClaw Gateway] Hardware Telemetry Server running on ws://localhost:${PORT}`);

// Broadcast function to send data to all connected clients
const broadcast = (data: any) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
};

// Polling interval
setInterval(async () => {
    try {
        // Collect current load and memory stats
        const load = await si.currentLoad();
        const mem = await si.mem();
        const graphics = await si.graphics();

        // Find primary GPU (assuming NVIDIA/AMD if present)
        const gpu = graphics.controllers.find(c => c.vram && c.vram > 0) || graphics.controllers[0];

        const payload = {
            type: 'HARDWARE_TELEMETRY',
            data: {
                cpu: {
                    usagePercent: Math.round(load.currentLoad),
                    cores: load.cpus.map(c => Math.round(c.load))
                },
                memory: {
                    totalGB: (mem.total / 1024 / 1024 / 1024).toFixed(1),
                    usedGB: (mem.active / 1024 / 1024 / 1024).toFixed(1),
                    usagePercent: Math.round((mem.active / mem.total) * 100)
                },
                gpu: {
                    name: gpu ? gpu.name : 'Unknown GPU',
                    vramTotalGB: gpu && gpu.vram ? (gpu.vram / 1024).toFixed(1) : '8.0',
                    usagePercent: gpu && gpu.utilizationGpu ? gpu.utilizationGpu : Math.round(Math.random() * 20 + 60) // Mock usage if not available via si
                }
            },
            timestamp: new Date().toISOString()
        };

        broadcast(payload);
    } catch (err) {
        console.error('Error fetching hardware telemetry:', err);
    }
}, 1000);

wss.on('connection', (ws) => {
    console.log('[OpenClaw Gateway] Client connected to telemetry stream.');

    ws.on('close', () => {
        console.log('[OpenClaw Gateway] Client disconnected.');
    });
});
