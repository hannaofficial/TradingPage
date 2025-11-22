'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { PulseColumn } from '@/components/PulseColumn';
import { FilterModal } from '@/components/FilterModal';
import { WalletModal } from '@/components/WalletModal';
import { DisplayModal } from '@/components/DisplayModal';
import { useWebSocketMock } from '@/services/useWebSocketMock';
import { ChevronDown, ChevronUp, HelpCircle, Bookmark, Volume2, Monitor, Keyboard, Wallet, Settings, List, Target, Zap, Filter } from 'lucide-react';
import { cn } from '@/utils/utils';
import { CardVariant } from '@/types';
import Image from 'next/image';

export const PulseBoard: React.FC = () => {
    const { items } = useSelector((state: RootState) => state.pulse);
    const [activeTab, setActiveTab] = useState<CardVariant>('new');
    const [isMobileHeaderExpanded, setIsMobileHeaderExpanded] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
    const [isDisplayModalOpen, setIsDisplayModalOpen] = useState(false);

    // Start the mock socket
    useWebSocketMock();

    // Filter logic - Memoized to prevent re-calculation on every render
    const newPairs = React.useMemo(() => items.filter(i => i.status === 'new'), [items]);
    const finalStretch = React.useMemo(() => items.filter(i => i.status === 'final'), [items]);
    const migrated = React.useMemo(() => items.filter(i => i.status === 'migrated'), [items]);

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
            <div className="md:hidden flex-shrink-0 flex flex-col px-4 py-3 border-b border-zinc-900 bg-black z-20 transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                        {/* Icons */}
                        <div className="flex items-center gap-3">
                            <div className="h-6 w-6 flex items-center justify-center bg-zinc-900 rounded-full">
                                <Image src="/solana-logo.svg" alt="SOL" width={14} height={14} />
                            </div>
                            <Image src="/BinanceIcon.svg" alt="Binance" width={24} height={24} className="opacity-80" />
                        </div>

                        {/* Tab Pills */}
                        <div className="flex items-center gap-1">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "text-[13px] font-medium transition-all whitespace-nowrap px-3 py-1 rounded-full",
                                        activeTab === tab.id
                                            ? "bg-zinc-800 text-white"
                                            : "text-zinc-500 hover:text-zinc-400"
                                    )}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Side Controls - Toggle Button */}
                    <button
                        onClick={() => setIsMobileHeaderExpanded(!isMobileHeaderExpanded)}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-black border border-zinc-800 hover:bg-zinc-900 transition-colors"
                    >
                        {isMobileHeaderExpanded ? (
                            <ChevronUp size={16} className="text-white" />
                        ) : (
                            <div className="absolute right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black border border-zinc-800 hover:bg-zinc-900 transition-colors ">

                                <Settings size={14} className="text-white" />
                            </div>
                        )}

                    </button>
                    {/* Fix for the button content replacement logic above - simpler approach below */}
                </div>




                {/* Expanded Content */}
                {isMobileHeaderExpanded && (
                    <div className="flex flex-col gap-4 mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
                        {/* Middle Row */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setIsDisplayModalOpen(true)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 text-white text-xs font-medium border border-zinc-800"
                                >
                                    <List size={14} />
                                    <span>Display</span>
                                    <ChevronDown size={12} />
                                </button>
                                <button className="text-zinc-400 hover:text-white transition-colors">
                                    <Bookmark size={16} />
                                </button>
                                <button className="text-zinc-400 hover:text-white transition-colors">
                                    <Target size={16} />
                                </button>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="text-zinc-400 hover:text-white transition-colors">
                                    <HelpCircle size={16} />
                                </button>
                                <button
                                    onClick={() => setIsFilterOpen(true)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 text-white text-xs font-medium border border-zinc-800"
                                >
                                    <Filter size={14} />
                                    <span>Filter</span>
                                    <ChevronDown size={12} />
                                </button>
                            </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div
                                    onClick={() => setIsWalletModalOpen(true)}
                                    className="flex items-center gap-2 px-2 py-1 rounded-lg bg-zinc-900/50 border border-zinc-800 cursor-pointer hover:bg-zinc-800/50 transition-colors"
                                >
                                    <Wallet size={14} className="text-zinc-400" />
                                    <span className="text-xs text-white font-mono">1</span>
                                    <div className="w-px h-3 bg-zinc-800"></div>
                                    <Image src="/solana-logo.svg" alt="SOL" width={12} height={12} />
                                    <span className="text-xs text-white font-mono">0</span>
                                    <ChevronDown size={12} className="text-zinc-500" />
                                </div>

                            </div>

                            <div className="flex items-center gap-0 bg-black rounded-lg border border-zinc-800 p-0.5">
                                <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-zinc-900/50 ">
                                    <Zap size={14} className="text-zinc-400" />
                                    <span className="text-xs text-white font-mono">0</span>
                                </div>
                                <div className="px-2 py-0.5 border-r border-zinc-800">
                                    <Image src="/solana-logo.svg" alt="SOL" width={12} height={12} />
                                </div>
                                <div className="flex items-center">
                                    <button className="px-2 py-0.5 text-[10px] font-medium text-blue-400">P1</button>
                                    <button className="px-2 py-0.5 text-[10px] font-medium text-zinc-500 hover:text-zinc-300">P2</button>
                                    <button className="px-2 py-0.5 text-[10px] font-medium text-zinc-500 hover:text-zinc-300">P3</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
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

            <FilterModal
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
            />

            <WalletModal
                isOpen={isWalletModalOpen}
                onClose={() => setIsWalletModalOpen(false)}
            />

            <DisplayModal
                isOpen={isDisplayModalOpen}
                onClose={() => setIsDisplayModalOpen(false)}
            />

        </div>
    );
};