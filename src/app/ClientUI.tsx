"use client"

import { useState, useEffect } from "react";
import {
    Terminal,
    Cpu,
    HardDrive,
    LayoutGrid,
    Activity,
    Flame,
    Zap,
    Globe,
    Radio,
    Lock,
    ChevronRight
} from "lucide-react";

export function BackgroundEffects() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            {/* Base Dark Grey to Black Gradient */}
            <div className="absolute inset-0 bg-gradient-to-bl from-[#2a2a2a] via-[#050505] to-black opacity-90"></div>

            {/* Animated Soft Highlights mimicking light sweep */}
            <div className="absolute inset-0 opacity-40 mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]">
                <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vh] bg-[radial-gradient(ellipse_at_center,_rgba(80,80,80,0.25)_0%,_transparent_60%)] blur-3xl rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[70vh] bg-[radial-gradient(ellipse_at_center,_rgba(60,60,60,0.2)_0%,_transparent_60%)] blur-3xl rounded-full"></div>
            </div>
        </div>
    );
}

export function ForegroundHUD() {
    const [time, setTime] = useState<string>("SYNCING...");

    useEffect(() => {
        setTime(new Date().toLocaleTimeString([], { hour12: false }));
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour12: false }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            {/* Vignette Edge Darkening for depth */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#000000_100%)] z-20"></div>

            {/* FOREGROUND LAYER: MODERN FLOATING GLASS HUD */}
            <div className="absolute inset-0 z-30 pointer-events-none p-6 md:p-10 flex flex-col justify-between">

                {/* TOP NAV: Minimal Pill Bar */}
                <header className="flex justify-between items-start pointer-events-auto">
                    {/* Main Logo Pill */}
                    <div className="flex items-center gap-4 bg-black/40 backdrop-blur-2xl border border-white/5 rounded-full px-6 py-3 shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-all hover:bg-black/60 hover:border-oscillate-emerald/30 group">
                        <Globe className="w-5 h-5 text-oscillate-emerald group-hover:animate-pulse" strokeWidth={1.5} />
                        <h1 className="text-sm font-sans tracking-[0.2em] font-medium text-white uppercase flex items-center gap-2">
                            OpenClaw<span className="text-oscillate-emerald font-bold mc-text-glow">Gateway</span>
                        </h1>
                    </div>

                    {/* Time & System Status Pill */}
                    <div className="flex items-center gap-6 bg-black/40 backdrop-blur-2xl border border-white/5 rounded-full px-6 py-3 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-oscillate-emerald opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-oscillate-emerald shadow-[0_0_8px_var(--color-oscillate-emerald-intense)]"></span>
                            </span>
                            <span className="text-[10px] uppercase font-mono tracking-widest text-[#a1a1aa] mr-4">Online</span>
                        </div>
                        <div className="h-4 w-[1px] bg-white/10"></div>
                        <span className="font-mono text-sm tracking-widest text-white">{time}</span>
                    </div>
                </header>

                {/* MIDDLE SECTION: Asymmetric Floating Widgets */}
                <main className="flex-grow flex justify-between items-center py-8">

                    {/* LEFT: Smooth Telemetry & Terminal */}
                    <div className="w-[320px] flex flex-col gap-6 pointer-events-auto h-full justify-center">

                        {/* HARDWARE TELEMETRY */}
                        <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-3xl border border-white/[0.05] rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:border-oscillate-gold/20 transition-colors">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-oscillate-gold/[0.02] rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-oscillate-gold/10 transition-colors"></div>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-oscillate-gold/10 border border-oscillate-gold/20 rounded-xl text-oscillate-gold">
                                    <Cpu className="w-4 h-4" />
                                </div>
                                <h2 className="text-xs font-sans tracking-[0.2em] font-medium text-[#a1a1aa]">Sys Compute</h2>
                            </div>

                            <div className="flex flex-col gap-5">
                                {/* Core */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center text-[10px] font-mono tracking-widest">
                                        <span className="text-white/60 flex items-center gap-1"><Zap className="w-3 h-3 text-oscillate-gold/60" /> i9-14900HX</span>
                                        <span className="text-oscillate-gold">74%</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden w-full relative">
                                        <div className="absolute top-0 left-0 h-full bg-oscillate-gold shadow-[0_0_10px_var(--color-oscillate-gold-glow)] rounded-full w-[74%]"></div>
                                    </div>
                                </div>
                                {/* VRAM */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center text-[10px] font-mono tracking-widest">
                                        <span className="text-white/60 flex items-center gap-1"><Flame className="w-3 h-3 text-oscillate-error/60" /> RTX 4070</span>
                                        <span className="text-oscillate-error">6.4/8 GB</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden w-full relative">
                                        <div className="absolute top-0 left-0 h-full bg-oscillate-error shadow-[0_0_10px_var(--color-oscillate-error)] rounded-full w-[80%]"></div>
                                    </div>
                                </div>
                                {/* RAM */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center text-[10px] font-mono tracking-widest">
                                        <span className="text-white/60 flex items-center gap-1"><HardDrive className="w-3 h-3 text-oscillate-emerald/60" /> SYSTEM RAM</span>
                                        <span className="text-oscillate-emerald">24.2 GB</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden w-full relative">
                                        <div className="absolute top-0 left-0 h-full bg-oscillate-emerald shadow-[0_0_10px_var(--color-oscillate-emerald-glow)] rounded-full w-[75%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* MINIMAL TERMINAL */}
                        <div className="bg-gradient-to-t from-black/80 to-transparent backdrop-blur-2xl border-l-[3px] border-oscillate-emerald/80 border-y border-r border-[#ffffff0a] rounded-r-2xl p-4 flex flex-col gap-3 h-[200px]">
                            <div className="flex gap-2 text-[9px] font-mono tracking-[0.2em] text-[#a1a1aa] mb-1">
                                <span className="text-oscillate-emerald">TERMINAL</span>
                                <span className="opacity-50">{"// OUTPUT STREAM"}</span>
                            </div>
                            <div className="flex-grow overflow-y-auto font-mono text-[10px] leading-relaxed text-[#d4d4d8] flex flex-col gap-2 scrollbar-none">
                                <div className="opacity-70">&gt; System Boot Sequence...</div>
                                <div className="opacity-70">&gt; WebSocket layer attached on port 3000.</div>
                                <div><span className="text-oscillate-emerald">@claw-alpha:</span> Pipeline BRADIAN received. Resolving LLM dependencies.</div>
                                <div className="text-oscillate-warning"><span className="text-white/40">&gt; Sys:</span> Memory allocation spike +12%.</div>
                                <div><span className="text-oscillate-emerald">@claw-beta:</span> Awaiting downstream schemas...</div>
                                <div className="text-oscillate-error"><span className="text-white/40">&gt; Sys:</span> Task Scheduler anomaly flagged by Security Node.</div>
                                <div className="flex items-center gap-1 text-oscillate-emerald mt-auto animate-pulse">
                                    <Terminal className="w-3 h-3" /> <div className="w-2 h-3 bg-oscillate-emerald opacity-70"></div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT: Agent Orchestration Core */}
                    <div className="w-[340px] flex flex-col gap-4 pointer-events-auto items-end">

                        <div className="flex items-center gap-3 mb-2 mr-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            <h2 className="text-xs font-sans tracking-[0.2em] font-medium text-white uppercase shadow-sm">Agent Nodes</h2>
                        </div>

                        {/* ACTIVE AGENT CARD (Qwen) */}
                        <div className="w-full bg-black/40 backdrop-blur-3xl border border-oscillate-emerald/30 rounded-3xl p-5 relative overflow-hidden group shadow-[0_10px_40px_rgba(0,0,0,0.5)] transform hover:-translate-x-2 transition-all duration-300">
                            {/* Subtle glass gleam */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-oscillate-emerald to-transparent opacity-30"></div>

                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-oscillate-emerald/10 border border-oscillate-emerald/40 flex items-center justify-center">
                                        <Radio className="w-4 h-4 text-oscillate-emerald" />
                                    </div>
                                    <div>
                                        <h3 className="font-sans text-sm font-semibold tracking-wide text-white group-hover:text-oscillate-emerald transition-colors">Claw-Alpha</h3>
                                        <p className="text-[9px] font-mono tracking-widest text-oscillate-emerald/70">Qwen-2.5-Coder:32b</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-oscillate-emerald/10 px-3 py-1 rounded-full border border-oscillate-emerald/20">
                                    <div className="w-1.5 h-1.5 rounded-full bg-oscillate-emerald animate-pulse"></div>
                                    <span className="text-[9px] font-mono font-bold tracking-widest text-oscillate-emerald">EXEC</span>
                                </div>
                            </div>

                            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-3 flex justify-between items-center group-hover:bg-white/[0.05] transition-colors">
                                <div className="text-[10px] font-mono text-[#d4d4d8] opacity-80 truncate">Building render nodes...</div>
                                <ChevronRight className="w-4 h-4 text-white/30" />
                            </div>
                        </div>

                        {/* THINKING AGENT CARD (Llama) */}
                        <div className="w-11/12 bg-black/60 backdrop-blur-3xl border border-oscillate-gold/20 rounded-3xl p-5 relative overflow-hidden group shadow-[0_10px_40px_rgba(0,0,0,0.5)] transform hover:-translate-x-2 transition-all duration-300">
                            {/* Subtle Gold glass gleam */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-oscillate-gold to-transparent opacity-20"></div>

                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-oscillate-gold/10 border border-oscillate-gold/30 flex items-center justify-center">
                                        <LayoutGrid className="w-4 h-4 text-oscillate-gold" />
                                    </div>
                                    <div>
                                        <h3 className="font-sans text-sm font-semibold tracking-wide text-white group-hover:text-oscillate-gold transition-colors">Claw-Beta</h3>
                                        <p className="text-[9px] font-mono tracking-widest text-[#a1a1aa]">Llama-3.1:8b</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-oscillate-gold/10 px-3 py-1 rounded-full border border-oscillate-gold/20">
                                    <div className="w-1.5 h-1.5 rounded-full bg-oscillate-gold/60 animate-pulse"></div>
                                    <span className="text-[9px] font-mono font-bold tracking-widest text-oscillate-gold">THINK</span>
                                </div>
                            </div>
                            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3 flex justify-between items-center group-hover:bg-white/[0.05] transition-colors">
                                <div className="text-[10px] font-mono text-[#a1a1aa] truncate">Analyzing schema...</div>
                                <ChevronRight className="w-4 h-4 text-oscillate-gold/50" />
                            </div>
                        </div>

                        {/* SECURITY/ANOMALY (Gemma) */}
                        <div className="w-10/12 bg-black/40 backdrop-blur-3xl border-l-[3px] border-oscillate-error/80 border-y border-r border-white/5 rounded-3xl p-5 relative overflow-hidden group shadow-[0_10px_40px_rgba(0,0,0,0.5)] transform hover:-translate-x-2 transition-all duration-300 mt-2">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(239,68,68,0.1),_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-3 relative z-10">
                                    <div className="w-8 h-8 rounded-full bg-oscillate-error/10 border border-oscillate-error/30 flex items-center justify-center">
                                        <Lock className="w-4 h-4 text-oscillate-error" />
                                    </div>
                                    <div>
                                        <h3 className="font-sans text-sm font-semibold tracking-wide text-white">Security Node</h3>
                                        <p className="text-[9px] font-mono tracking-widest text-oscillate-error">Gemma-2:27b</p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-[10px] font-mono text-white/60 relative z-10 truncate mt-2">Anomaly: \Network Perfomance</p>
                        </div>

                    </div>

                </main>

                {/* BOTTOM HUD BARS */}
                <footer className="w-full flex justify-between items-end pointer-events-auto">
                    {/* QUEUE */}
                    <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 flex gap-6 items-center shadow-2xl">
                        <div className="bg-oscillate-emerald text-black text-[10px] font-bold font-mono tracking-widest px-3 py-1 rounded-full uppercase">Queue</div>
                        <div className="flex items-center gap-4 border-l border-white/10 pl-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-mono text-[#a1a1aa] tracking-widest">T-01</span>
                                <span className="text-xs text-white">BRADIAN Trim Alpha</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-white/20 mx-2" />
                            <div className="flex flex-col opacity-40">
                                <span className="text-[10px] font-mono text-[#a1a1aa] tracking-widest">T-02</span>
                                <span className="text-xs text-white">Sync Audio</span>
                            </div>
                        </div>
                    </div>

                    {/* USER PING / DEPLOY */}
                    <button className="h-12 w-12 rounded-full border border-oscillate-gold/50 bg-oscillate-gold/10 flex items-center justify-center shadow-[0_0_20px_var(--color-oscillate-gold-glow)] hover:bg-oscillate-gold hover:text-black transition-colors overflow-hidden group group-hover:scale-105 transform">
                        <Activity className="w-5 h-5 text-oscillate-gold group-hover:text-black transition-colors" />
                    </button>
                </footer>

            </div>
        </>
    );
}
