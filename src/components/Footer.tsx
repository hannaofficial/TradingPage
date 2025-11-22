import React from 'react';
import {
    Settings,
    Wallet,
    Twitter,
    Compass,
    Activity,
    BarChart2,
    ChevronDown,
    Fuel,
    Gauge,
    Wifi,
    PanelBottom,
    Bell,
    Palette,
    Gamepad2,
    FileText,
    Coins,
    Droplets,
    Zap,
    ListFilter
} from 'lucide-react';
import Image from 'next/image';

export const Footer: React.FC = () => {
    return (
        <div className="h-7 w-full bg-[#050505] border-t border-zinc-800 flex items-center justify-between px-2 text-[10px] text-zinc-400 font-medium select-none overflow-x-auto no-scrollbar">
            {/* Left Section */}
            <div className="flex items-center gap-1.5 shrink-0">
                {/* Preset Button */}
                <button className="flex items-center gap-1 px-2 py-0.5 bg-[#1e293b] hover:bg-[#1e293b]/80 rounded text-blue-400 transition-colors">
                    <ListFilter size={10} />
                    <span className="font-bold tracking-wide">PRESET 1</span>
                </button>

                {/* Wallet Selector */}
                <button className="flex items-center gap-1.5 px-1.5 py-0.5 bg-[#0c0c0e] border border-zinc-800 rounded-full hover:border-zinc-700 transition-colors ml-0.5">
                    <div className="flex items-center gap-1">
                        <Wallet size={10} className="text-zinc-400" />
                        <span className="text-zinc-200 font-semibold">1</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Image src="/solana-logo.svg" alt="SOL" width={8} height={8} className="w-2 h-2" />
                        <span className="text-emerald-400 font-semibold">0</span>
                    </div>
                    <ChevronDown size={9} className="text-zinc-600" />
                </button>

                <div className="w-px h-3 bg-zinc-800 mx-0.5"></div>

                {/* Settings */}
                <button className="p-1 hover:text-zinc-200 transition-colors">
                    <Settings size={12} />
                </button>

                {/* Nav Items with Dots */}
                <div className="flex items-center gap-3 ml-0.5">
                    <button className="flex items-center gap-1 hover:text-zinc-200 transition-colors relative group">
                        <Wallet size={12} />
                        <span>Wallet</span>
                        <span className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-pink-500 rounded-full"></span>
                    </button>

                    <button className="flex items-center gap-1 hover:text-zinc-200 transition-colors relative group">
                        <Twitter size={12} />
                        <span>Twitter</span>
                        <span className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-pink-500 rounded-full"></span>
                    </button>

                    <button className="flex items-center gap-1 hover:text-zinc-200 transition-colors relative group">
                        <Compass size={12} />
                        <span>Discover</span>
                        <span className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-pink-500 rounded-full"></span>
                    </button>

                    <button className="flex items-center gap-1 hover:text-zinc-200 transition-colors relative group">
                        <Activity size={12} />
                        <span>Pulse</span>
                        <span className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-pink-500 rounded-full"></span>
                    </button>

                    <div className="w-px h-3 bg-zinc-800"></div>

                    <button className="flex items-center gap-1 hover:text-zinc-200 transition-colors">
                        <BarChart2 size={12} />
                        <span>PnL</span>
                    </button>
                </div>

                <div className="w-px h-3 bg-zinc-800 mx-0.5"></div>

                {/* Status Pill */}
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-[#0c0c0e] border border-zinc-800 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                </div>

                <div className="w-px h-3 bg-zinc-800 mx-0.5"></div>

                {/* Market Tickers - Commented out by user */}
                {/* <div className="flex items-center gap-4">
                    ...
                </div> */}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3 shrink-0 ml-3">
                <span className="text-zinc-300 font-semibold">$52.6K</span>

                <div className="flex items-center gap-1 text-zinc-400">
                    <Fuel size={10} />
                    <span>0.0263</span>
                </div>

                <div className="flex items-center gap-1 text-zinc-400">
                    <Gauge size={10} />
                    <span>0.0404</span>
                </div>

                <div className="w-px h-3 bg-zinc-800"></div>

                {/* Connection Status */}
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-950/30 border border-emerald-900/50 rounded text-emerald-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="font-medium">Connection is stable</span>
                </div>

                <div className="w-px h-3 bg-zinc-800"></div>

                {/* Global Dropdown */}
                <button className="flex items-center gap-1 hover:text-zinc-200 transition-colors">
                    <span>GLOBAL</span>
                    <ChevronDown size={9} />
                </button>

                <div className="w-px h-3 bg-zinc-800"></div>

                {/* Utility Icons */}
                <div className="flex items-center gap-2.5">
                    <button className="hover:text-zinc-200 transition-colors"><PanelBottom size={12} /></button>
                    <button className="hover:text-zinc-200 transition-colors"><Bell size={12} /></button>
                    <button className="hover:text-zinc-200 transition-colors"><Gamepad2 size={12} /></button>

                    <button className="flex items-center gap-1 hover:text-zinc-200 transition-colors">
                        <FileText size={12} />
                        <span>Docs</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
