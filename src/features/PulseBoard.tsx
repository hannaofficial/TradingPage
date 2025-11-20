'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { PulseColumn } from '@/components/PulseColumn';
import { useWebSocketMock } from '@/services/useWebSocketMock';
import { SlidersHorizontal, LayoutGrid, ChevronDown, HelpCircle, Bookmark, Volume2, Monitor } from 'lucide-react';
import { cn } from '@/utils/utils';
import { CardVariant } from '@/types';

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
            <div className="hidden md:flex items-center justify-between px-4 h-12 border-b border-zinc-800 bg-black">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <h1 className="text-lg font-bold text-white">Pulse</h1>
                        <button className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors">
                            <LayoutGrid size={16} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-500 transition-colors">
                            <HelpCircle size={16} />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 transition-colors text-sm font-medium">
                        <Monitor size={14} />
                        <span>Display</span>
                        <ChevronDown size={14} className="text-zinc-500" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-500 transition-colors">
                        <Bookmark size={18} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-500 transition-colors">
                        <LayoutGrid size={18} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-500 transition-colors">
                        <Volume2 size={18} />
                    </button>
                    <div className="flex items-center gap-1 bg-zinc-900 rounded-lg p-1 border border-zinc-800">
                        <button className="p-1.5 rounded bg-zinc-800 text-zinc-300">
                            <LayoutGrid size={14} />
                        </button>
                        <button className="p-1.5 rounded hover:bg-zinc-800 text-zinc-500">
                            <div className="flex flex-col gap-0.5">
                                <div className="w-3 h-0.5 bg-current rounded-full"></div>
                                <div className="w-3 h-0.5 bg-current rounded-full"></div>
                                <div className="w-3 h-0.5 bg-current rounded-full"></div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Tab Header - Only visible on small screens */}
            <div className="md:hidden flex-shrink-0 flex items-center justify-between px-3 py-2 border-b border-zinc-800 bg-background/95 z-20">
                <div className="flex items-center gap-1 bg-zinc-900/50 p-1 rounded-lg border border-zinc-800/50">
                    {/* Solana Logo Icon (Left) */}
                    <div className="h-7 w-7 flex items-center justify-center bg-zinc-950 rounded border border-zinc-800">
                        <img src="/solana-logo.svg" alt="SOL" className="h-4 w-4" />
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

                {/* Desktop View: Horizontal scroll wrapper + Grid */}
                <div className="hidden md:block w-full h-full overflow-x-auto overflow-y-hidden">
                    {/* Fixed width container to ensure columns don't squash */}
                    <div className="min-w-[1024px] h-full grid grid-cols-3 divide-x divide-zinc-800/50">
                        <PulseColumn title="New Pairs" variant="new" tokens={newPairs} />
                        <PulseColumn title="Final Stretch" variant="final" tokens={finalStretch} />
                        <PulseColumn title="Migrated" variant="migrated" tokens={migrated} />
                    </div>
                </div>

                {/* Mobile View: Single Column based on activeTab */}
                <div className="md:hidden w-full h-full">
                    {activeTab === 'new' && <PulseColumn title="New Pairs" variant="new" tokens={newPairs} hideHeader={true} />}
                    {activeTab === 'final' && <PulseColumn title="Final Stretch" variant="final" tokens={finalStretch} hideHeader={true} />}
                    {activeTab === 'migrated' && <PulseColumn title="Migrated" variant="migrated" tokens={migrated} hideHeader={true} />}
                </div>
            </div>
        </div>
    );
};