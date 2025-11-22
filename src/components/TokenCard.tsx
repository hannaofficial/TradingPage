import React, { memo } from 'react';
import { TokenData } from '@/types';
import { formatCurrency, formatTimeAgo, cn } from '@/utils/utils';
import { Shield, Globe, Search, Users, Rocket, Copy, Zap, Leaf, Lock, EyeOff, FlagOff, TouchpadOff, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

interface TokenCardProps {
    token: TokenData;
}




// Sub-components for cleanliness
const StatBadge = ({ text, variant }: { text: string, variant: string }) => {
    let bg = "bg-zinc-800/50";
    let textCol = "text-zinc-400";

    if (variant === 'success') { bg = "bg-emerald-500/10"; textCol = "text-emerald-500"; }
    if (variant === 'danger') { bg = "bg-rose-500/10"; textCol = "text-rose-500"; }
    if (variant === 'info') { bg = "bg-blue-500/10"; textCol = "text-blue-400"; }

    return (
        <span className={cn("px-1.5 py-[2px] rounded-[3px] text-[9px] font-medium whitespace-nowrap flex-shrink-0", bg, textCol)}>
            {text}
        </span>
    );
};


const ICONS = [Leaf, Rocket, ShieldCheck, Zap];

// stable pick based on token id (deterministic, so it doesn't change every render)
function pickIndex(id: string, max: number) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < id.length; i++) {
        h = Math.imul(h ^ id.charCodeAt(i), 16777619) >>> 0;
    }
    return h % max;
}

// for now I am randomly picking a border color but it can be scalable once the logic is known to any number of border colors
const BORDER_PALETTES = [
    { bg: 'bg-rose-500/80', ring: 'ring-rose-500/40', border: 'border-rose-500' },
    { bg: 'bg-emerald-500/80', ring: 'ring-emerald-500/40', border: 'border-emerald-500' },
    { bg: 'bg-blue-400/70', ring: 'ring-blue-400/30', border: 'border-blue-400' },
    { bg: 'bg-amber-400/70', ring: 'ring-amber-400/30', border: 'border-amber-400' },
    { bg: 'bg-violet-500/70', ring: 'ring-violet-500/30', border: 'border-violet-500' },
];

function stableHashToIndex(id: string, max: number) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < id.length; i++) {
        h = Math.imul(h ^ id.charCodeAt(i), 16777619) >>> 0;
    }
    return h % max;
}


//Token Card Function

export const TokenCard: React.FC<TokenCardProps> = memo(({ token }) => {
    const isNew = token.status === 'new';
    const isMigrated = token.status === 'migrated';





    /* inside component */
    const USE_RANDOM_BORDER = false; // set true for fully random each render
    const paletteIndex = USE_RANDOM_BORDER
        ? Math.floor(Math.random() * BORDER_PALETTES.length)
        : stableHashToIndex(token.id || token.symbol || Math.random().toString(), BORDER_PALETTES.length);
    const palette = BORDER_PALETTES[paletteIndex];

    return (
        <div className="group relative flex gap-2 px-3 py-3 bg-transparent hover:bg-zinc-800/60 transition-colors duration-200 w-full overflow-hidden h-[100px]">
            {/* Hover actions (place this as the first child inside the top-level .group div) */}
            <div className="absolute left-2 top-4 flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-20">
                <button className="h-4 w-4 flex items-center p-[2px] justify-center rounded-sm bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800/80 transition">
                    <EyeOff size={12} />
                </button>

                <button className="h-4 w-4 flex items-center p-[2px] justify-center rounded-sm bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800/80 transition">
                    <TouchpadOff size={12} />
                </button>

                <button className="h-4 w-4 flex items-center p-[2px] justify-center rounded-sm bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800/80 transition">
                    <FlagOff size={12} />
                </button>
            </div>

            {/* Image*/}
            <div className="relative flex-shrink-0">

                {/* Outer colored ring (bg shows through the gap) */}
                <div className={cn(
                    "rounded-sm p-px inline-block",
                    palette.bg
                )}>
                    {/* Inner neutral border + image container */}
                    <div className="h-[60px] w-[60px] p-px rounded-[2px] overflow-hidden bg-zinc-900 border border-zinc-800 shadow-sm">
                        <Image
                            src={token.imageUrl}
                            alt={token.name || token.symbol}
                            className="h-full w-full object-cover"
                            width={60}
                            height={60}
                        />
                    </div>
                </div>

                {/* Status Indicator  */}
                {/* <div className="absolute bottom-2 -right-0.5">
                    <div className={cn(
                        "h-3.5 w-3.5 rounded-full flex items-center justify-center bg-black border-[1px]",
                        palette.border
                    )}>
                        {isNew ? (
                            <Leaf size={8} className="text-emerald-400" />
                        ) : (
                            <Rocket size={8} className="text-rose-400" />
                        )}
                    </div>
                </div> */}
                {/*  indicator */}
                {(() => {


                    const idx = pickIndex(token.id || token.symbol || 'fallback', ICONS.length);
                    const Icon = ICONS[idx];

                    return (
                        <div className="absolute bottom-2 -right-0.5 pointer-events-none">
                            <div
                                className={cn(
                                    "h-3.5 w-3.5 rounded-full flex items-center justify-center bg-black border-px",
                                    palette.border // same border color as image ring
                                )}
                            >
                                <Icon size={8} className="text-white" />
                            </div>
                        </div>
                    );
                })()}





                {/* ID label under image */}
                <div className=" text-[10px] text-zinc-500 font-mono text-center truncate w-[60px]">
                    {token.id?.slice(0, 4)}...{token.id?.slice(-4)}
                </div>
            </div>



            {/* Center: Info & Badges */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                {/* Row 1: Header */}
                <div className="flex items-center gap-1.5 min-w-0">
                    <h3 className="text-[13px] font-bold text-zinc-100 truncate leading-none">{token.symbol}</h3>
                    <span className="text-[11px] text-zinc-500 truncate leading-none">{token.name}</span>
                    <Copy size={10} className="text-zinc-600 hover:text-zinc-400 cursor-pointer flex-shrink-0" />
                </div>

                {/* Row 2: Age & Socials */}
                <div className="flex items-center gap-2 text-zinc-500 min-w-0">
                    <span className={cn("text-[10px] font-bold leading-none flex-shrink-0", isNew ? "text-emerald-500" : "text-blue-400")}>
                        {formatTimeAgo(token.createdAt)}
                    </span>
                    <div className="flex items-center gap-1 flex-shrink-0">
                        {token.isSafe ? <Shield size={10} className="text-emerald-500" /> : <Lock size={10} />}
                        <Globe size={10} className="hover:text-blue-400 cursor-pointer" />
                        <Search size={10} className="hover:text-zinc-300 cursor-pointer" />
                    </div>
                    <div className="flex items-center gap-0.5 text-[10px] font-mono text-zinc-400 flex-shrink-0">
                        <Users size={10} />
                        <span>{token.holders}</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-[10px] font-mono text-amber-500/80 flex-shrink-0">
                        <span className="text-[8px]">👑</span>
                        <span>{token.top10Holders || 1}%</span>
                    </div>
                </div>

                {/* Row 3: Badges */}
                <div className="flex items-center gap-1 flex-wrap h-4 overflow-hidden">
                    {token.badges.slice(0, 4).map((badge, i) => (
                        <div key={i} className="flex items-center gap-1">
                            {badge.icon === 'shield' && <Shield size={8} className="text-emerald-500" />}
                            <StatBadge text={badge.label} variant={badge.type} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Metrics */}
            <div className="flex flex-col items-end justify-between w-[85px] flex-shrink-0 ml-1 py-0.5">
                {/* Row 1: MC & Vol */}
                <div className="text-right w-full">
                    <div className="flex items-baseline justify-end gap-1">
                        <span className="text-[9px] text-zinc-600 uppercase font-bold">V</span>
                        <span className="text-[11px] font-medium text-zinc-300 tabular-nums">
                            {formatCurrency(token.volume)}
                        </span>
                        <span className="text-[9px] text-zinc-600 uppercase font-bold ml-1">MC</span>
                        <span className={cn("text-[11px] font-bold tabular-nums", isMigrated ? "text-blue-400" : "text-emerald-400")}>
                            {formatCurrency(token.marketCap)}
                        </span>
                    </div>
                </div>

                {/* Row 2: Liquidity & TX */}
                <div className="w-full flex flex-col items-end gap-0.5">
                    <div className="flex items-center gap-1 justify-end w-full">
                        <span className="text-[9px] text-zinc-500 font-mono">F</span>
                        <span className="text-[10px] text-zinc-300 font-mono">0.0{Math.floor(Math.random() * 9)}</span>
                        <span className="text-[9px] text-zinc-500 font-mono ml-1">TX</span>
                        <span className="text-[10px] text-zinc-300 font-mono">{token.txCount}</span>
                        <div className="w-8 h-0.5 bg-zinc-800 rounded-full ml-1">
                            <div className="h-full bg-emerald-500" style={{ width: `${Math.random() * 100}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Row 3: Quick Buy Button */}
                <button className="flex items-center   gap-1 bg-blue-600 hover:bg-blue-500 text-black text-[10px] font-bold py-1 px-2 rounded-2xl transition-colors shadow-[0_0_10px_rgba(37,99,235,0.2)]">
                    <Zap size={10} fill="currentColor" />
                    <span>0 SOL</span>
                </button>
            </div>
        </div>
    );
}, (prev, next) => {
    return (
        prev.token.id === next.token.id &&
        prev.token.marketCap === next.token.marketCap &&
        prev.token.txCount === next.token.txCount &&
        prev.token.volume === next.token.volume
    );
});