'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { PulseColumn } from '@/components/PulseColumn';
import { useWebSocketMock } from '@/services/useWebSocketMock';
import { SlidersHorizontal, ChevronDown, HelpCircle, Bookmark, Volume2, Monitor, Keyboard, Wallet } from 'lucide-react';
import { cn } from '@/utils/utils';
import { CardVariant } from '@/types';
import Image from 'next/image';

export const PulseBoard: React.FC = () => {
    const { items } = useSelector((state: RootState) => state.pulse);
    const [activeTab, setActiveTab] = useState<CardVariant>('new');

    // Start the mock socket
    useWebSocketMock();

    // Filter logic
    const newPairs = items.filter(i => i.status === 'new');
    const finalStretch = items.filter(i => i.status === 'final');
    const migrated = items.filter(i => i.status === 'migrated');

    const tabs: { id: CardVariant; label: string }[] = [
        { id: 'new', label: 'New Pairs' },
        { id: 'final', label: 'Final Stretch' },
        { id: 'migrated', label: 'Migrated' },
    ];

    return (
        <div className="flex flex-col h-full w-full bg-black">

            {/* Sub-Header (Desktop) */}
            <div className="hidden md:flex mx-6 mt-2 items-center justify-between  h-10  bg-black">
                <div className="flex items-center">
                    <div className="flex items-center gap-3">
                        <h1 className="text-lg font-semibold text-white ">Pulse</h1>
                        <div className="flex items-center gap-1">
                            <button className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors">
                                <Image src="/solana-logo.svg" alt="SOL" width={16} height={16} />
                            </button>
                            <button className=" rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors">
                                <Image src="/BinanceIcon.svg" alt="SOL" width={32} height={32} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-500 bg-zinc-900 transition-colors">
                        <HelpCircle size={16} />
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-zinc-800 border border-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors text-sm font-medium">
                        <Monitor size={14} />
                        <span className='text-white'>Display</span>
                        <ChevronDown size={14} className="text-white" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-500 transition-colors">
                        <Bookmark size={16} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-500 transition-colors">
                        <Keyboard size={16} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-500 transition-colors">
                        <Volume2 size={16} />
                    </button>
                    <button className="hidden md:flex items-center items-stretch gap-1 px-3 py-1.5  border border-zinc-700 rounded-full text-xs text-white">
                        {/* Placeholder wallet icon */}
                        <Wallet size={16} />
                        <span>1</span>





                        {/* Placeholder token icon */}
                        <Image
                            src="/solana-logo.svg"
                            alt="SOL"
                            width={12}
                            height={12}
                            className="ml-2 object-contain"
                        />
                        <span>0</span>
                        {/* Arrow */}
                        <ChevronDown size={16} />
                    </button>
                </div>
            </div>

            {/* Mobile Tab Header - Only visible on small screens */}
            <div className="md:hidden flex-shrink-0 flex items-center justify-between px-3 py-2 border-b border-zinc-800 bg-background/95 z-20">
                <div className="flex items-center gap-1 bg-zinc-900/50 p-1 rounded-lg border border-zinc-800/50">
                    {/* Solana Logo Icon (Left) */}
                    <div className="h-7 w-7 flex items-center justify-center bg-zinc-950 rounded border border-zinc-800">
                        <Image src="/solana-logo.svg" alt="SOL" width={16} height={16} />
                    </div>
                    <div className="w-[1px] h-5 bg-zinc-800 mx-1"></div>

                    {/* Tab Pills */}
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "px-3 py-1 text-[11px] font-semibold rounded transition-all whitespace-nowrap",
                                activeTab === tab.id
                                    ? "bg-zinc-800 text-white shadow-sm ring-1 ring-zinc-700"
                                    : "text-zinc-500 hover:text-zinc-400"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Right Side Controls */}
                <div className="flex items-center gap-2 pl-2">
                    <div className="flex items-center bg-black rounded-full border border-zinc-800 px-2 py-1">
                        <span className="text-[10px] text-zinc-400 font-mono mr-1">P1</span>
                        <div className="w-1 h-1 rounded-full bg-axiom"></div>
                    </div>
                    <button className="p-1.5 text-zinc-500 hover:text-zinc-300">
                        <SlidersHorizontal size={14} />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            {/* flex-1 min-h-0 is critical here to stop flex items from overflowing their parent */}
            <div className="flex-1 min-h-0 w-full relative bg-black">
                {/* OUTER SCROLLER: contains padding + border so the scroll includes the frame */}
                <div className="w-full h-full px-6 py-3 overflow-x-auto overflow-y-hidden box-border">
                    {/* Frame: border + rounded inside the scroller (so border won't push layout outside viewport) */}
                    <div className="min-w-full h-full border border-zinc-800 rounded-lg bg-black box-border">
                        <div
                            className="hidden md:block h-full overflow-y-hidden"
                        >
                            <div
                                className="h-full grid grid-cols-3 divide-x divide-zinc-800/50"
                                style={{ gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr) minmax(300px, 1fr)' }}
                            >
                                <PulseColumn title="New Pairs" variant="new" tokens={newPairs} />
                                <PulseColumn title="Final Stretch" variant="final" tokens={finalStretch} />
                                <PulseColumn title="Migrated" variant="migrated" tokens={migrated} />
                            </div>
                        </div>

                        <div className="md:hidden w-full h-full">
                            {activeTab === 'new' && <PulseColumn title="New Pairs" variant="new" tokens={newPairs} hideHeader={true} />}
                            {activeTab === 'final' && <PulseColumn title="Final Stretch" variant="final" tokens={finalStretch} hideHeader={true} />}
                            {activeTab === 'migrated' && <PulseColumn title="Migrated" variant="migrated" tokens={migrated} hideHeader={true} />}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};