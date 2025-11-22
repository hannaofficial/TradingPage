import React from 'react';
import { TokenData, CardVariant } from '../types';
import { TokenCard } from './TokenCard';
import { Zap, SlidersHorizontal } from 'lucide-react';
import TokenCardSkeleton from './ui/TokenCardSkeleton';
import Image from 'next/image';

interface PulseColumnProps {
    title: string;
    variant: CardVariant;
    tokens: TokenData[];
    loading?: boolean;
    hideHeader?: boolean;
}

export const PulseColumn: React.FC<PulseColumnProps> = ({ title, variant, tokens, loading, hideHeader = false }) => {

    return (
        <div className="flex flex-col h-full w-full bg-black overflow-hidden relative border-r border-zinc-800 last:border-r-0">

            {!hideHeader && (
                <div className="flex-shrink-0 flex items-center justify-between bg-black px-3 border-b border-zinc-800 h-12 z-10">


                    <h2 className="text-[14px] font-bold text-zinc-100 tracking-tight">{title}</h2>


                    <div className="flex items-center gap-2">
                        <div className="flex items-center bg-zinc-900/60 border border-zinc-800 rounded-xl h-7 px-2 gap-2 hover:bg-zinc-800/60 transition-colors">

                            <div className='flex items-center gap-4'>
                                <div className="flex items-center gap-1.5">
                                    <Zap size={12} className="text-zinc-500" />
                                    <span className="text-[12px] font-mono text-zinc-400">0</span>
                                </div>




                                <div className="flex items-center">
                                    <Image
                                        src="/solana-logo.svg"
                                        alt="Solana"
                                        width={8}
                                        height={8}
                                        className="opacity-90"
                                    />
                                </div>
                            </div>


                            <div className="h-4 w-px bg-zinc-800" />

                            <div className="flex items-center ">
                                <button className="px-1.5 text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition">
                                    P1
                                </button>
                                <button className="px-1.5 text-[11px] font-semibold text-zinc-500 hover:text-zinc-300 transition">
                                    P2
                                </button>
                                <button className="px-1.5 text-[11px] font-semibold text-zinc-500 hover:text-zinc-300 transition">
                                    P3
                                </button>
                            </div>


                        </div>
                        <button className="h-5 w-5 flex items-center justify-center rounded hover:bg-zinc-800/80 text-zinc-500 hover:text-zinc-300 transition">
                            <SlidersHorizontal size={13} />
                        </button>
                    </div>

                </div>
            )}

            {/* Independent Scrollable List */}
            <div className="flex-1 min-h-0 w-full overflow-y-auto custom-scrollbar px-0  pb-24 md:pb-10 bg-black divide-y divide-zinc-800/40">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => <TokenCardSkeleton key={i} />)

                ) : (
                    tokens.map(token => (
                        <TokenCard key={token.id} token={token} />
                    ))
                )}

            </div>
        </div>
    );
};