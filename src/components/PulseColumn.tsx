import React from 'react';
import { TokenData, CardVariant } from '../types';
import { TokenCard } from './TokenCard';
import { Skeleton } from './ui/Skeleton';
import { Zap, SlidersHorizontal } from 'lucide-react';

interface PulseColumnProps {
    title: string;
    variant: CardVariant;
    tokens: TokenData[];
    loading?: boolean;
    hideHeader?: boolean;
}

export const PulseColumn: React.FC<PulseColumnProps> = ({ title, variant, tokens, loading, hideHeader = false }) => {

    return (
        <div className="flex flex-col h-full w-full bg-black overflow-hidden relative border-r border-zinc-800/50 last:border-r-0">
            {/* Fixed Column Header - Hidden if requested (for Mobile Tab View) */}
            {!hideHeader && (
                <div className="flex-shrink-0 flex items-center justify-between bg-black px-3 border-b border-zinc-800 h-12 z-10">

                    {/* Title */}
                    <h2 className="text-[14px] font-bold text-zinc-100 tracking-tight">{title}</h2>

                    {/* Controls Group */}
                    <div className="flex items-center gap-3">

                        {/* Live Counter */}
                        <div className="flex items-center gap-1.5">
                            <Zap size={12} className="text-zinc-500 fill-zinc-500" />
                            <span className="text-[12px] font-mono text-zinc-400">0</span>
                        </div>

                        {/* Presets Filter */}
                        <div className="flex items-center bg-zinc-900 rounded-lg border border-zinc-800 h-6 px-1">
                            <button className="px-2 h-full flex items-center text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors">P1</button>
                            <button className="px-2 h-full flex items-center text-[10px] font-bold text-zinc-600 hover:text-zinc-400 transition-colors">P2</button>
                            <button className="px-2 h-full flex items-center text-[10px] font-bold text-zinc-600 hover:text-zinc-400 transition-colors">P3</button>
                        </div>

                        {/* Settings */}
                        <button className="h-6 w-6 flex items-center justify-center hover:bg-zinc-800 rounded text-zinc-500 hover:text-zinc-300 transition-colors">
                            <SlidersHorizontal size={14} />
                        </button>
                    </div>
                </div>
            )}

            {/* Independent Scrollable List */}
            {/* min-h-0 is essential for nested flex scrolling to work correctly */}
            <div className="flex-1 min-h-0 w-full overflow-y-auto custom-scrollbar p-2 space-y-2 pb-24 md:pb-10 bg-black">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-[100px] w-full rounded-lg bg-zinc-900/30 border border-zinc-800/50 p-3 flex gap-3">
                            <Skeleton className="h-12 w-12 rounded bg-zinc-800" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-3 w-20 bg-zinc-800" />
                                <Skeleton className="h-2 w-12 bg-zinc-800" />
                            </div>
                        </div>
                    ))
                ) : (
                    tokens.map(token => (
                        <TokenCard key={token.id} token={token} />
                    ))
                )}
            </div>
        </div>
    );
};