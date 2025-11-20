import React from 'react';
import { Wifi, Box, Activity, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <div className="h-8 w-full bg-[#0c0c0e] border-t border-zinc-800 flex items-center justify-between px-4 text-[11px] text-zinc-500 font-medium select-none">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    <span className="text-emerald-500 font-semibold">Operational</span>
                </div>
                <div className="w-[1px] h-3 bg-zinc-800"></div>
                <span>v1.2.0</span>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 hover:text-zinc-300 transition-colors cursor-pointer">
                    <Zap size={12} className="text-amber-500 fill-amber-500" />
                    <span>Gas: <span className="text-zinc-300">15 Gwei</span></span>
                </div>
                <div className="flex items-center gap-2 hover:text-zinc-300 transition-colors cursor-pointer">
                    <Box size={12} className="text-blue-500" />
                    <span>Block: <span className="text-zinc-300">#293...812</span></span>
                </div>
                <div className="flex items-center gap-2 hover:text-zinc-300 transition-colors cursor-pointer">
                    <Activity size={12} className="text-purple-500" />
                    <span>Priority: <span className="text-purple-400 font-bold">TURBO</span></span>
                </div>
                <div className="flex items-center gap-2 hover:text-zinc-300 transition-colors cursor-pointer">
                    <Wifi size={12} className="text-emerald-500" />
                    <span className="text-emerald-500">12ms</span>
                </div>
            </div>
        </div>
    );
};
