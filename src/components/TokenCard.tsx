import React, { memo, useState, useEffect } from 'react';
import { TokenData } from '@/types';
import { formatCurrency, formatTimeAgo, cn } from '@/utils/utils';
import { Shield, Globe, Search, Users, Rocket, Copy, Zap, Leaf, Lock, EyeOff, FlagOff, TouchpadOff, ShieldCheck, ChevronRight, DollarSign } from 'lucide-react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface TokenCardProps {
    token: TokenData;
    conversionActive?: boolean;
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

export const TokenCard: React.FC<TokenCardProps> = memo(({ token, conversionActive }) => {
    const metricSize = useSelector((state: RootState) => state.displaySettings.metricSize);
    const palette = BORDER_PALETTES[pickIndex(token.id || token.symbol || 'default', BORDER_PALETTES.length)];

    const isLarge = metricSize === 'large';
    const isNew = token.status === 'new';
    const isMigrated = token.status === 'migrated';

    // Dynamic size based on holders (1-1000)
    // Scale from 0.9 to 1.1
    const holderScale = 0.9 + (token.holders / 1000) * 0.2;

    const [timeAgo, setTimeAgo] = useState(formatTimeAgo(token.createdAt));
    const [imgError, setImgError] = useState(false);
    const [solanaError, setSolanaError] = useState(false);

    // Deterministic icon selection
    const iconIdx = pickIndex(token.id || token.symbol || 'fallback', ICONS.length);
    const Icon = ICONS[iconIdx];

    useEffect(() => {
        const update = () => setTimeAgo(formatTimeAgo(token.createdAt));

        // Optimize interval: 1s for new tokens (<1m), 60s for older tokens
        const age = Date.now() - token.createdAt;
        const intervalMs = age < 60000 ? 1000 : 60000;

        const interval = setInterval(update, intervalMs);
        return () => clearInterval(interval);
    }, [token.createdAt]);




    return (
        <div className={cn(
            "group relative flex gap-2 px-3 py-3 bg-transparent hover:bg-zinc-800/60 transition-colors duration-200 w-full overflow-hidden",
            isLarge ? "h-[130px]" : "h-[100px]",
            conversionActive && "bg-zinc-900/20" // Slight bg tint if active
        )}>

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
            <div className="relative shrink-0">

                {/* Outer colored ring (bg shows through the gap) */}
                <div className={cn(
                    "rounded-sm p-px inline-block",
                    palette.bg
                )}>
                    {/* Inner neutral border + image container */}
                    <div className={cn(
                        "p-px rounded-[2px] overflow-hidden bg-zinc-900 border border-zinc-800 shadow-sm",
                        isLarge ? "h-[80px] w-[80px]" : "h-[60px] w-[60px]"
                    )}>
                        {!imgError ? (
                            <Image
                                src={token.imageUrl}
                                alt={token.name || token.symbol}
                                className="h-full w-full object-cover"
                                width={isLarge ? 80 : 60}
                                height={isLarge ? 80 : 60}
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-800/50">
                                <Icon size={isLarge ? 32 : 24} className="text-zinc-500" />
                            </div>
                        )}
                    </div>
                </div>

                {/*  indicator */}
                <div className="absolute bottom-2 -right-0.5 pointer-events-none">
                    <div
                        className={cn(
                            "h-3.5 w-3.5 rounded-full flex items-center justify-center bg-black border-[1px]",
                            palette.border
                        )}
                    >
                        <Icon size={8} className="text-white" />
                    </div>
                </div>





                {/* ID label under image */}
                <div className={cn(
                    "text-zinc-500 font-mono text-center truncate",
                    isLarge ? "text-[11px] w-[80px]" : "text-[10px] w-[60px]"
                )}>
                    {token.id?.slice(0, 4)}...{token.id?.slice(-4)}
                </div>
            </div>



            {/* Center: Info & Badges */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                {/* Row 1: Header */}
                <div className="flex items-center gap-1.5 min-w-0">
                    <h3 className={cn(
                        "font-semibold text-zinc-100 truncate leading-none",
                        isLarge ? "text-[17px]" : "text-[15px]"
                    )}>{token.symbol}</h3>
                    <span className={cn(
                        "text-zinc-500 truncate leading-none",
                        isLarge ? "text-[15px]" : "text-[13px]"
                    )}>{token.name}</span>
                    <Copy size={isLarge ? 14 : 12} className="text-zinc-600 hover:text-zinc-400 cursor-pointer shrink-0" />
                </div>

                {/* Row 2: Age & Socials */}
                <div className="flex items-center gap-2 text-zinc-500 min-w-0">
                    <span className={cn(
                        "font-bold leading-none shrink-0",
                        isLarge ? "text-[13px]" : "text-[11px]",
                        isNew ? "text-emerald-500" : "text-blue-400"
                    )}>
                        {timeAgo}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                        {token.isSafe ? <Shield size={isLarge ? 14 : 12} className="text-emerald-500" /> : <Lock size={isLarge ? 14 : 12} />}
                        <Globe size={isLarge ? 14 : 12} className="hover:text-blue-400 cursor-pointer" />
                        <Search size={isLarge ? 14 : 12} className="hover:text-zinc-300 cursor-pointer" />
                    </div>
                    <div
                        className={cn(
                            "flex items-center gap-0.5 font-mono text-zinc-400 shrink-0 transition-all duration-300",
                            isLarge ? "text-[13px]" : "text-[11px]"
                        )}
                        style={{ transform: `scale(${holderScale})`, transformOrigin: 'left center' }}
                    >
                        <Users size={isLarge ? 14 : 12} />
                        <span>{token.holders}</span>
                    </div>
                    <div className={cn(
                        "flex items-center gap-0.5 font-mono text-amber-500/80 shrink-0",
                        isLarge ? "text-[13px]" : "text-[11px]"
                    )}>
                        <span className={isLarge ? "text-[12px]" : "text-[10px]"}>👑</span>
                        <span>{(token.top10Holders || 1).toFixed(0)}%</span>
                    </div>
                </div>

                {/* Row 3: Badges */}
                <div className="flex items-center gap-1 flex-wrap h-4 overflow-hidden">
                    {token.badges.slice(0, 4).map((badge, i) => (
                        <div key={i} className="flex items-center gap-1">
                            {badge.icon === 'shield' && <Shield size={10} className="text-emerald-500" />}
                            <StatBadge text={badge.label} variant={badge.type} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Metrics */}
            <div className={cn(
                "flex flex-col items-end justify-between shrink-0 ml-1 py-0.5 z-10",
                isLarge ? "w-[120px]" : "w-[105px]"
            )}>
                {/* Row 1: MC & Vol */}
                <div className="text-right w-full">
                    <div className="flex items-baseline justify-end gap-1">
                        <span className={cn(
                            "text-zinc-600 uppercase font-bold",
                            isLarge ? "text-[11px]" : "text-[10px]"
                        )}>V</span>
                        <span className={cn(
                            "font-medium text-zinc-300 tabular-nums",
                            isLarge ? "text-[14px]" : "text-[12px]"
                        )}>
                            {formatCurrency(token.volume)}
                        </span>
                        <span className={cn(
                            "text-zinc-600 uppercase font-bold ml-1",
                            isLarge ? "text-[11px]" : "text-[10px]"
                        )}>MC</span>
                        <span className={cn(
                            "font-bold tabular-nums",
                            isLarge ? "text-[14px]" : "text-[12px]",
                            isMigrated ? "text-blue-400" : "text-emerald-400"
                        )}>
                            {formatCurrency(token.marketCap)}
                        </span>
                    </div>
                </div>

                {/* Row 2: Liquidity & TX */}
                <div className="w-full flex flex-col items-end gap-0.5">
                    <div className="flex items-center gap-1 justify-end w-full">
                        <span className={cn(
                            "text-zinc-500 font-mono",
                            isLarge ? "text-[11px]" : "text-[10px]"
                        )}>F</span>
                        <span className="text-zinc-500 font-mono flex items-center">
                            {!solanaError ? (
                                <Image
                                    src='/solana-logo.svg'
                                    alt="SOL"
                                    className={cn("object-contain", isLarge ? "w-4 h-4" : "w-3.5 h-3.5")}
                                    width={isLarge ? 16 : 14}
                                    height={isLarge ? 16 : 14}
                                    onError={() => setSolanaError(true)}
                                />
                            ) : (
                                <DollarSign size={isLarge ? 14 : 12} className="text-pink-400" fill="currentColor" />
                            )}
                        </span>
                        <span className={cn(
                            "text-zinc-300 font-mono",
                            isLarge ? "text-[13px]" : "text-[11px]"
                        )}>0.0{Math.floor(Math.random() * 9)}</span>
                        <span className={cn(
                            "text-zinc-500 font-mono ml-1",
                            isLarge ? "text-[11px]" : "text-[10px]"
                        )}>TX</span>
                        <span className={cn(
                            "text-zinc-300 font-mono",
                            isLarge ? "text-[13px]" : "text-[11px]"
                        )}>{token.txCount}</span>
                        <div className="w-8 h-0.5 bg-rose-500/50 rounded-full ml-1 overflow-hidden shrink-0">
                            <div className="h-full bg-emerald-500" style={{ width: `${Math.random() * 100}%` }}></div>
                        </div>
                    </div>
                </div>

                {/*  Quick Buy Button OR Conversion Symbol */}
                {conversionActive ? (
                    <div className="flex items-center  mt-1">
                        {/* Red Circle */}
                        <div className="w-4 h-4 rounded-full border border-rose-500/50 flex items-center justify-center bg-rose-500/10">
                            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                        </div>

                        {/* Animated Arrows - Light Sweep (Masked Overlay) */}
                        {/* Animated Arrows - per-arrow staggered pulse (left -> right) */}
                        <div className="relative flex items-center -space-x-0.5 w-8 justify-center">
                            {/* Base Layer (Dim) */}
                            <div className="flex items-center text-emerald-900/40 -space-x-0.5">
                                <ChevronRight size={8} strokeWidth={3} />
                                <ChevronRight size={8} strokeWidth={3} />
                                <ChevronRight size={8} strokeWidth={3} />
                            </div>

                            {/* Overlay Layer (Bright) - each arrow gets its own animated span */}
                            <div className="absolute inset-0 flex items-center justify-center -space-x-0.5 pointer-events-none">
                                <span className="arrow-bright" style={{ animationDelay: '0s' }}>
                                    <ChevronRight size={8} strokeWidth={3} className="text-emerald-400" />
                                </span>
                                <span className="arrow-bright" style={{ animationDelay: '0.13s' }}>
                                    <ChevronRight size={8} strokeWidth={3} className="text-emerald-400" />
                                </span>
                                <span className="arrow-bright" style={{ animationDelay: '0.26s' }}>
                                    <ChevronRight size={8} strokeWidth={3} className="text-emerald-400" />
                                </span>
                            </div>
                        </div>


                        {/* Yellow Circle */}
                        <div className="w-4 h-4 rounded-full border border-amber-500/50 flex items-center justify-center bg-amber-500/10">
                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                        </div>
                    </div>
                ) : (
                    <button className={cn(
                        "flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-black font-bold rounded-2xl transition-colors shadow-[0_0_10px_rgba(37,99,235,0.2)]",
                        isLarge ? "text-[13px] py-1.5 px-3" : "text-[11px] py-1 px-2"
                    )}>
                        <Zap size={isLarge ? 14 : 12} fill="currentColor" />
                        <span>0 SOL</span>
                    </button>
                )}
            </div>

            {/* Shine Effect Overlay - Improved Visibility */}
            {conversionActive && (
                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 bottom-0 left-0 w-[200%] animate-shimmer bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -skew-x-12" />
                </div>
            )}
        </div>
    );
}, (prev, next) => {
    return (
        prev.token.id === next.token.id &&
        prev.token.marketCap === next.token.marketCap &&
        prev.token.txCount === next.token.txCount &&
        prev.token.volume === next.token.volume &&
        prev.token.holders === next.token.holders &&
        prev.token.top10Holders === next.token.top10Holders &&
        prev.conversionActive === next.conversionActive
    );
});