import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// For this initial Expo scaffolding without NativeWind fully transpiled,
// we will use StyleSheet to guarantee the layout maps directly.
// (Nativewind v4 requires babel config which we can add next).

const { width } = Dimensions.get('window');

export default function App() {
  const [hardware, setHardware] = useState<any>(null);
  const [wsStatus, setWsStatus] = useState<string>("CONNECTING");
  const [activeAgent, setActiveAgent] = useState<string | null>("alpha");
  const [time, setTime] = useState<string>("SYNCING...");

  useEffect(() => {
    // Basic local clock
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'
      }) + ' UTC');
    }, 1000);

    // WebSocket Connection to LOCAL PC
    // NOTE: On an iOS physical device or simulator, 'localhost' points to the phone itself.
    // To connect to the Next.js server, we need the PC's actual local IPv4 address.
    // For scaffolding, we will set a placeholder that the user can replace.
    const wsUrl = 'ws://192.168.1.X:3001'; // <-- USER MUST REPLACE X WITH THEIR IP

    let ws: WebSocket;
    try {
      ws = new WebSocket(wsUrl);

      ws.onopen = () => setWsStatus("ONLINE");
      ws.onclose = () => setWsStatus("OFFLINE");
      ws.onerror = () => setWsStatus("ERROR");

      ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === 'HARDWARE_TELEMETRY') {
            setHardware(payload.data);
          }
        } catch (e) {
          console.error("Message parse error");
        }
      };
    } catch (e) {
      setWsStatus("OFFLINE");
    }

    return () => {
      clearInterval(timer);
      if (ws) ws.close();
    };
  }, []);

  const cpuLoad = hardware ? hardware.cpu.usagePercent : 0;
  const ramLoad = hardware ? hardware.memory.usagePercent : 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Top Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logoText}>OSCILLATE</Text>
          <Text style={styles.subLogoText}>MISSION CONTROL</Text>
        </View>
        <View style={styles.statusPill}>
          <View style={[styles.statusDot, wsStatus === 'ONLINE' ? styles.bgEmerald : styles.bgWarning]} />
          <Text style={styles.statusText}>{wsStatus}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Hardware Telemetry Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>LOCAL COMPUTE NODE</Text>
            <Text style={styles.timeText}>{time}</Text>
          </View>

          <View style={styles.metricRow}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricLabel}>CORE I9-14900K</Text>
              <Text style={styles.metricValue}>{cpuLoad}%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, styles.bgEmerald, { width: `${cpuLoad}%` }]} />
            </View>
          </View>

          <View style={styles.metricRow}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricLabel}>64GB DDR5</Text>
              <Text style={styles.metricValue}>{ramLoad}% / {hardware ? hardware.memory.totalGB : '64.0'} GB</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, styles.bgGold, { width: `${ramLoad}%` }]} />
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>ORCHESTRATION NODES</Text>

        {/* Agent Alpha */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveAgent(activeAgent === 'alpha' ? null : 'alpha')}
          style={[styles.card, activeAgent === 'alpha' && styles.cardActiveEmerald]}
        >
          <View style={styles.agentHeader}>
            <View>
              <Text style={styles.agentName}>Claw-Alpha</Text>
              <Text style={styles.agentModel}>Qwen-2.5-Coder:32b</Text>
            </View>
            <View style={styles.execBadge}>
              <View style={[styles.statusDot, styles.bgEmerald]} />
              <Text style={[styles.badgeText, styles.textEmerald]}>EXEC</Text>
            </View>
          </View>
          {activeAgent === 'alpha' && (
            <View style={styles.expandedContent}>
              <Text style={[styles.expandedText, styles.textEmerald]}>Memory: 18.4GB Context</Text>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, styles.bgEmerald, { width: '80%' }]} />
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Agent Beta */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveAgent(activeAgent === 'beta' ? null : 'beta')}
          style={[styles.card, activeAgent === 'beta' && styles.cardActiveGold]}
        >
          <View style={styles.agentHeader}>
            <View>
              <Text style={styles.agentName}>Claw-Beta</Text>
              <Text style={styles.agentModel}>Llama-3.1:8b</Text>
            </View>
            <View style={[styles.execBadge, { borderColor: 'rgba(212, 175, 55, 0.2)', backgroundColor: 'rgba(212, 175, 55, 0.1)' }]}>
              <View style={[styles.statusDot, styles.bgGold]} />
              <Text style={[styles.badgeText, styles.textGold]}>THINK</Text>
            </View>
          </View>
          {activeAgent === 'beta' && (
            <View style={styles.expandedContent}>
              <Text style={[styles.expandedText, styles.textGold]}>Memory: 4.2GB Context</Text>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, styles.bgGold, { width: '30%' }]} />
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Agent Gamma */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveAgent(activeAgent === 'gamma' ? null : 'gamma')}
          style={[styles.card, activeAgent === 'gamma' && styles.cardActiveLazulite]}
        >
          <View style={styles.agentHeader}>
            <View>
              <Text style={styles.agentName}>Security Node</Text>
              <Text style={styles.agentModelLazulite}>Gemma-2:27b</Text>
            </View>
          </View>
          {activeAgent === 'gamma' && (
            <View style={styles.expandedContent}>
              <Text style={[styles.expandedText, { color: '#2563eb' }]}>PID: 4992 Network Spike</Text>
            </View>
          )}
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#111',
  },
  logoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 2,
  },
  subLogoText: {
    color: '#666',
    fontSize: 10,
    fontFamily: 'Courier',
    letterSpacing: 1,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  statusText: {
    color: '#a1a1aa',
    fontSize: 10,
    fontFamily: 'Courier',
    letterSpacing: 1,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
    marginTop: 30,
    marginBottom: 15,
    opacity: 0.8,
  },
  card: {
    backgroundColor: 'rgba(25,25,25,0.6)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  cardActiveEmerald: {
    borderColor: 'rgba(16, 185, 129, 0.4)',
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
  },
  cardActiveGold: {
    borderColor: 'rgba(212, 175, 55, 0.4)',
    backgroundColor: 'rgba(212, 175, 55, 0.05)',
  },
  cardActiveLazulite: {
    borderColor: 'rgba(37, 99, 235, 0.4)',
    backgroundColor: 'rgba(37, 99, 235, 0.05)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  timeText: {
    color: '#666',
    fontSize: 10,
    fontFamily: 'Courier',
  },
  metricRow: {
    marginBottom: 15,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metricLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    fontFamily: 'Courier',
    letterSpacing: 1,
  },
  metricValue: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Courier',
  },
  progressBarBg: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  agentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  agentName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  agentModel: {
    color: 'rgba(16, 185, 129, 0.7)',
    fontSize: 10,
    fontFamily: 'Courier',
  },
  agentModelLazulite: {
    color: '#2563eb',
    fontSize: 10,
    fontFamily: 'Courier',
  },
  execBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  badgeText: {
    fontSize: 9,
    fontFamily: 'Courier',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  expandedContent: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  expandedText: {
    fontSize: 10,
    fontFamily: 'Courier',
    marginBottom: 8,
  },
  bgEmerald: { backgroundColor: '#10b981' },
  bgGold: { backgroundColor: '#d4af37' },
  bgWarning: { backgroundColor: '#f59e0b' },
  bgLazulite: { backgroundColor: '#2563eb' },
  textEmerald: { color: '#10b981' },
  textGold: { color: '#d4af37' },
});
