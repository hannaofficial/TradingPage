'use client';

import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Search, Check, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { cn } from '@/utils/utils';

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    columnTitle?: string;
}

type Tab = 'New Pairs' | 'Final Stretch' | 'Migrated';

const PROTOCOLS = [
    { id: 'pump', label: 'Pump', color: 'text-green-500', borderColor: 'border-green-500/20 bg-green-500/10' },
    { id: 'mayhem', label: 'Mayhem', color: 'text-rose-500', borderColor: 'border-rose-500/20 bg-rose-500/10' },
    { id: 'bonk', label: 'Bonk', color: 'text-orange-500', borderColor: 'border-orange-500/20 bg-orange-500/10' },
    { id: 'bags', label: 'Bags', color: 'text-green-500', borderColor: 'border-green-500/20 bg-green-500/10' },
    { id: 'moonshot', label: 'Moonshot', color: 'text-purple-500', borderColor: 'border-purple-500/20 bg-purple-500/10' },
    { id: 'heaven', label: 'Heaven', color: 'text-zinc-400', borderColor: 'border-zinc-500/20 bg-zinc-500/10' },
    { id: 'daos', label: 'Daos.fun', color: 'text-blue-500', borderColor: 'border-blue-500/20 bg-blue-500/10' },
    { id: 'candle', label: 'Candle', color: 'text-orange-600', borderColor: 'border-orange-600/20 bg-orange-600/10' },
    { id: 'sugar', label: 'Sugar', color: 'text-pink-500', borderColor: 'border-pink-500/20 bg-pink-500/10' },
    { id: 'believe', label: 'Believe', color: 'text-green-600', borderColor: 'border-green-600/20 bg-green-600/10' },
    { id: 'jupiter', label: 'Jupiter Studio', color: 'text-orange-400', borderColor: 'border-orange-400/20 bg-orange-400/10' },
    { id: 'moonit', label: 'Moonit', color: 'text-yellow-500', borderColor: 'border-yellow-500/20 bg-yellow-500/10' },
    { id: 'boop', label: 'Boop', color: 'text-blue-400', borderColor: 'border-blue-400/20 bg-blue-400/10' },
    { id: 'launchlab', label: 'LaunchLab', color: 'text-cyan-500', borderColor: 'border-cyan-500/20 bg-cyan-500/10' },
    { id: 'dynamic', label: 'Dynamic BC', color: 'text-red-500', borderColor: 'border-red-500/20 bg-red-500/10' },
    { id: 'raydium', label: 'Raydium', color: 'text-purple-400', borderColor: 'border-purple-400/20 bg-purple-400/10' },
    { id: 'meteora', label: 'Meteora AMM', color: 'text-zinc-500', borderColor: 'border-zinc-500/20 bg-zinc-500/10' },
    { id: 'meteora_v2', label: 'Meteora AMM V2', color: 'text-zinc-500', borderColor: 'border-zinc-500/20 bg-zinc-500/10' },
    { id: 'pump_amm', label: 'Pump AMM', color: 'text-zinc-500', borderColor: 'border-zinc-500/20 bg-zinc-500/10' },
    { id: 'orca', label: 'Orca', color: 'text-yellow-600', borderColor: 'border-yellow-600/20 bg-yellow-600/10' },
];

const QUOTE_TOKENS = [
    { id: 'sol', label: 'SOL', icon: '≡', color: 'text-cyan-400', borderColor: 'border-cyan-500/20 bg-cyan-500/10' },
    { id: 'usdc', label: 'USDC', icon: '$', color: 'text-blue-400', borderColor: 'border-blue-500/20 bg-blue-500/10' },
    { id: 'usd1', label: 'USD1', icon: '1', color: 'text-yellow-400', borderColor: 'border-yellow-500/20 bg-yellow-500/10' },
];

export const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, columnTitle }) => {
    const [activeTab, setActiveTab] = useState<Tab>('New Pairs');
    const [selectedProtocols, setSelectedProtocols] = useState<string[]>(['pump']);
    const [selectedQuotes, setSelectedQuotes] = useState<string[]>(['sol']);
    const [searchKeywords, setSearchKeywords] = useState('');
    const [excludeKeywords, setExcludeKeywords] = useState('');
    const [dexPaid, setDexPaid] = useState(false);
    const [caEndsPump, setCaEndsPump] = useState(false);
    const dragControls = useDragControls();

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const toggleProtocol = (id: string) => {
        setSelectedProtocols(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    const toggleQuote = (id: string) => {
        setSelectedQuotes(prev =>
            prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
        );
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center md:items-start md:pt-20 px-0 md:px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        drag="y"
                        dragControls={dragControls}
                        dragListener={false}
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={{ top: 0, bottom: 1 }}
                        onDragEnd={(event, info) => {
                            if (info.offset.y > 100 || info.velocity.y > 500) {
                                onClose();
                            }
                        }}
                        className="relative w-full md:max-w-[500px] h-[90dvh] md:h-auto md:max-h-[85vh] bg-[#0c0c0e] border-t md:border border-zinc-800 rounded-t-2xl md:rounded-xl shadow-2xl flex flex-col overflow-hidden mt-auto md:mt-0"
                    >
                        {/* Drag Handle */}
                        <div
                            className="w-full flex items-center justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing touch-none md:hidden"
                            onPointerDown={(e) => dragControls.start(e)}
                        >
                            <div className="w-10 h-1 bg-zinc-700 rounded-full hover:bg-zinc-600 transition-colors" />
                        </div>
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-zinc-800 shrink-0">
                            <h2 className="text-lg font-normal text-white">Filters</h2>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors">
                                    Import
                                </button>
                                <button className="px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors">
                                    Export
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex items-center px-4 border-b border-zinc-800 shrink-0">
                            {(['New Pairs', 'Final Stretch', 'Migrated'] as Tab[]).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={cn(
                                        "flex-1 py-3 text-sm font-medium border-b-2 transition-colors relative",
                                        activeTab === tab
                                            ? "text-white border-white"
                                            : "text-zinc-500 border-transparent hover:text-zinc-300"
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                            <button className="ml-2 p-2 text-zinc-500 hover:text-white">
                                <RotateCcw size={16} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
                            {/* Protocols */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-zinc-400">Protocols</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setSelectedProtocols(PROTOCOLS.map(p => p.id))}
                                            className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-1 rounded transition-colors"
                                        >
                                            Select All
                                        </button>
                                        <button
                                            onClick={() => setSelectedProtocols([])}
                                            className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-1 rounded transition-colors"
                                        >
                                            Unselect All
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {PROTOCOLS.map(protocol => (
                                        <button
                                            key={protocol.id}
                                            onClick={() => toggleProtocol(protocol.id)}
                                            className={cn(
                                                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border transition-all",
                                                selectedProtocols.includes(protocol.id)
                                                    ? protocol.borderColor + " " + protocol.color
                                                    : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700"
                                            )}
                                        >
                                            {/* Mock icons based on name */}
                                            <span>{protocol.label === 'Pump' ? '💊' : protocol.label === 'Bonk' ? '🐕' : protocol.label === 'Moonshot' ? '🌑' : '⚡'}</span>
                                            <span>{protocol.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quote Tokens */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-zinc-400">Quote Tokens</span>
                                    <button
                                        onClick={() => setSelectedQuotes([])}
                                        className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-1 rounded transition-colors"
                                    >
                                        Unselect All
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {QUOTE_TOKENS.map(token => (
                                        <button
                                            key={token.id}
                                            onClick={() => toggleQuote(token.id)}
                                            className={cn(
                                                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                                                selectedQuotes.includes(token.id)
                                                    ? token.borderColor + " " + token.color
                                                    : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700"
                                            )}
                                        >
                                            <span>{token.icon}</span>
                                            <span>{token.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Keywords */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <span className="text-sm text-zinc-400">Search Keywords</span>
                                    <input
                                        type="text"
                                        value={searchKeywords}
                                        onChange={(e) => setSearchKeywords(e.target.value)}
                                        placeholder="keyword1, keyword2..."
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <span className="text-sm text-zinc-400">Exclude Keywords</span>
                                    <input
                                        type="text"
                                        value={excludeKeywords}
                                        onChange={(e) => setExcludeKeywords(e.target.value)}
                                        placeholder="keyword1, keyword2..."
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
                                    />
                                </div>
                            </div>

                            {/* Sub Tabs */}
                            <div className="flex items-center gap-4 border-b border-zinc-800 pb-1">
                                <button className="text-sm font-medium text-white pb-2 border-b-2 border-zinc-600">Audit</button>
                                <button className="text-sm font-medium text-zinc-500 pb-2 hover:text-zinc-300">$ Metrics</button>
                                <button className="text-sm font-medium text-zinc-500 pb-2 hover:text-zinc-300">Socials</button>
                            </div>

                            {/* Toggles */}
                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className={cn(
                                        "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                                        dexPaid ? "bg-blue-600 border-blue-600" : "border-zinc-700 group-hover:border-zinc-600"
                                    )}>
                                        {dexPaid && <Check size={14} className="text-white" />}
                                    </div>
                                    <input type="checkbox" className="hidden" checked={dexPaid} onChange={() => setDexPaid(!dexPaid)} />
                                    <span className="text-sm text-zinc-300">Dex Paid</span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className={cn(
                                        "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                                        caEndsPump ? "bg-blue-600 border-blue-600" : "border-zinc-700 group-hover:border-zinc-600"
                                    )}>
                                        {caEndsPump && <Check size={14} className="text-white" />}
                                    </div>
                                    <input type="checkbox" className="hidden" checked={caEndsPump} onChange={() => setCaEndsPump(!caEndsPump)} />
                                    <span className="text-sm text-zinc-300">CA ends in 'pump'</span>
                                </label>
                            </div>

                            {/* Age Range */}
                            <div className="space-y-2">
                                <span className="text-sm text-zinc-400">Age</span>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 flex items-center bg-zinc-900/50 border border-zinc-800 rounded-lg px-3">
                                        <input type="text" placeholder="Min" className="w-full bg-transparent py-2 text-sm text-white placeholder:text-zinc-600 outline-none" />
                                        <span className="text-zinc-500 text-xs border-l border-zinc-800 pl-2 ml-2">m</span>
                                    </div>
                                    <div className="flex-1 flex items-center bg-zinc-900/50 border border-zinc-800 rounded-lg px-3">
                                        <input type="text" placeholder="Max" className="w-full bg-transparent py-2 text-sm text-white placeholder:text-zinc-600 outline-none" />
                                        <span className="text-zinc-500 text-xs border-l border-zinc-800 pl-2 ml-2">m</span>
                                    </div>
                                </div>
                            </div>

                            {/* Top 10 Holders */}
                            <div className="space-y-2">
                                <span className="text-sm text-zinc-400">Top 10 Holders %</span>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-lg px-3">
                                        <input type="text" placeholder="Min" className="w-full bg-transparent py-2 text-sm text-white placeholder:text-zinc-600 outline-none" />
                                    </div>
                                    <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-lg px-3">
                                        <input type="text" placeholder="Max" className="w-full bg-transparent py-2 text-sm text-white placeholder:text-zinc-600 outline-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 px-16 border-t border-zinc-800 flex items-center justify-between shrink-0 bg-[#0c0c0e]">
                            <button
                                onClick={() => {
                                    setSelectedProtocols([]);
                                    setSelectedQuotes(['sol']);
                                    setSearchKeywords('');
                                    setExcludeKeywords('');
                                    setDexPaid(false);
                                    setCaEndsPump(false);
                                }}
                                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                            >
                                <RotateCcw size={16} />
                                <span className="text-xs font-medium">Reset New Pairs</span>
                            </button>
                            <button
                                onClick={onClose}
                                className="px-8 py-2.5 rounded-full bg-blue-900 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-lg shadow-blue-900/20"
                            >
                                Apply All
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
