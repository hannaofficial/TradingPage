'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
    Search, X, Clock, TrendingUp, BarChart3, Droplet, Zap, Globe, ShieldCheck, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn, formatCurrency } from '@/utils/utils';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type SortOption = 'time' | 'mc' | 'volume' | 'liquidity';

interface TokenResult {
    id: string;
    name: string;
    ticker: string;
    imageUrl: string;
    timeAgo: string;
    marketCap: number;
    volume: number;
    liquidity: number;
    badges: string[];
    ca: string;
}

const MOCK_RESULTS: TokenResult[] = [
    {
        id: '1',
        name: 'Muh...',
        ticker: 'MBF',
        imageUrl: '/favicon.ico', // Placeholder
        timeAgo: '10m',
        marketCap: 4000,
        volume: 8,
        liquidity: 8000,
        badges: ['verified', 'link'],
        ca: 'AxgC...FJ6n'
    },
    {
        id: '2',
        name: 'BIGF...',
        ticker: 'BOOF',
        imageUrl: '/favicon.ico',
        timeAgo: '37m',
        marketCap: 4000,
        volume: 424,
        liquidity: 8000,
        badges: ['global', 'link'],
        ca: 'B7...9x'
    },
    {
        id: '3',
        name: 'BIG ...',
        ticker: 'BBBC',
        imageUrl: '/favicon.ico',
        timeAgo: '23h',
        marketCap: 4000,
        volume: 20,
        liquidity: 8000,
        badges: ['users', 'link'],
        ca: 'C2...1z'
    },
    {
        id: '4',
        name: 'BIG ...',
        ticker: 'PANTS',
        imageUrl: '/favicon.ico',
        timeAgo: '4d',
        marketCap: 52000,
        volume: 283,
        liquidity: 22000,
        badges: ['users', 'global', 'verified'],
        ca: 'D5...3y'
    },
    {
        id: '5',
        name: 'Big C...',
        ticker: 'Chungus',
        imageUrl: '/favicon.ico',
        timeAgo: '10d',
        marketCap: 76000,
        volume: 1000,
        liquidity: 31000,
        badges: ['user', 'global', 'verified'],
        ca: 'E8...4w'
    }
];

const FILTERS = [
    { id: 'pump', label: 'Pump', icon: '💊' },
    { id: 'bonk', label: 'Bonk', icon: '🐕' },
    { id: 'bags', label: 'Bags', icon: '💰' },
    { id: 'usd1', label: 'USD1', icon: '🪙' },
    { id: 'og', label: 'OG Mode', icon: '🔥' },
    { id: 'graduated', label: 'Graduated', icon: '🎓' },
];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('time');
    const [activeFilters, setActiveFilters] = useState<string[]>([]);

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

    // Focus input on open
    useEffect(() => {
        if (isOpen) {
            const input = document.getElementById('search-input');
            if (input) input.focus();
        }
    }, [isOpen]);

    // Handle Esc key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const toggleFilter = (id: string) => {
        setActiveFilters(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    const filteredResults = useMemo(() => {
        let results = [...MOCK_RESULTS];

        // Filter by query
        if (query) {
            const lowerQuery = query.toLowerCase();
            results = results.filter(item =>
                item.name.toLowerCase().includes(lowerQuery) ||
                item.ticker.toLowerCase().includes(lowerQuery) ||
                item.ca.toLowerCase().includes(lowerQuery)
            );
        }

        // Sort
        results.sort((a, b) => {
            switch (sortBy) {
                case 'mc': return b.marketCap - a.marketCap;
                case 'volume': return b.volume - a.volume;
                case 'liquidity': return b.liquidity - a.liquidity;
                case 'time':
                default:
                    // Mock time sort (just reverse for now as mock data is ordered by time)
                    return 0;
            }
        });

        return results;
    }, [query, sortBy]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-0 md:pt-20 px-0 md:px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full md:max-w-2xl h-[85dvh] md:h-auto md:max-h-[80vh] bg-[#0c0c0e] border-b md:border border-zinc-800 rounded-b-2xl md:rounded-xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-zinc-800 space-y-4 shrink-0">
                            {/* Filters & Sort */}
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mask-linear-fade flex-1">
                                    {FILTERS.map(filter => (
                                        <button
                                            key={filter.id}
                                            onClick={() => toggleFilter(filter.id)}
                                            className={cn(
                                                "flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium border transition-colors whitespace-nowrap shrink-0",
                                                activeFilters.includes(filter.id)
                                                    ? "bg-zinc-800 border-zinc-600 text-white"
                                                    : "bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-700"
                                            )}
                                        >
                                            <span>{filter.icon}</span>
                                            <span>{filter.label}</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="flex items-center gap-1 pl-2 border-l border-zinc-800 shrink-0">
                                    <span className="hidden sm:inline text-[10px] text-zinc-500 mr-1">Sort by</span>
                                    <button
                                        onClick={() => setSortBy('time')}
                                        className={cn("p-1.5 rounded hover:bg-zinc-800 transition-colors", sortBy === 'time' ? "text-blue-500 bg-blue-500/10" : "text-zinc-500")}
                                        title="Time"
                                    >
                                        <Clock size={14} />
                                    </button>
                                    <button
                                        onClick={() => setSortBy('mc')}
                                        className={cn("p-1.5 rounded hover:bg-zinc-800 transition-colors", sortBy === 'mc' ? "text-blue-500 bg-blue-500/10" : "text-zinc-500")}
                                        title="Market Cap"
                                    >
                                        <TrendingUp size={14} />
                                    </button>
                                    <button
                                        onClick={() => setSortBy('volume')}
                                        className={cn("p-1.5 rounded hover:bg-zinc-800 transition-colors", sortBy === 'volume' ? "text-blue-500 bg-blue-500/10" : "text-zinc-500")}
                                        title="Volume"
                                    >
                                        <BarChart3 size={14} />
                                    </button>
                                    <button
                                        onClick={() => setSortBy('liquidity')}
                                        className={cn("p-1.5 rounded hover:bg-zinc-800 transition-colors", sortBy === 'liquidity' ? "text-blue-500 bg-blue-500/10" : "text-zinc-500")}
                                        title="Liquidity"
                                    >
                                        <Droplet size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Search Input */}
                            <div className="relative">
                                <input
                                    id="search-input"
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search by name, ticker, or CA..."
                                    className="w-full bg-transparent text-lg text-white placeholder:text-zinc-600 outline-none border-none p-0 pr-8"
                                    autoComplete="off"
                                />
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    <button
                                        onClick={onClose}
                                        className="md:hidden p-1 text-zinc-400 hover:text-white"
                                    >
                                        <X size={18} />
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="hidden md:block text-[10px] text-zinc-600 border border-zinc-800 px-1.5 rounded hover:text-zinc-400"
                                    >
                                        Esc
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                            <div className="text-[10px] text-zinc-500 px-2 mb-2">Results</div>
                            <div className="space-y-1">
                                {filteredResults.map((item) => (
                                    <div
                                        key={item.id}
                                        className="group flex items-center justify-between p-2 hover:bg-zinc-900/50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-zinc-800"
                                    >
                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                            <div className="relative h-10 w-10 shrink-0 rounded-lg overflow-hidden bg-zinc-800 border border-zinc-700">
                                                <Image src={item.imageUrl} alt={item.ticker} fill className="object-cover" />
                                                <div className="absolute bottom-0 right-0 bg-black/60 p-0.5 rounded-tl">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                                </div>
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-bold text-white truncate">{item.ticker}</span>
                                                    <span className="text-sm text-zinc-500 truncate hidden sm:block max-w-[100px]">{item.name}</span>
                                                    <button className="text-zinc-600 hover:text-zinc-400 shrink-0"><div className="h-3 w-3 border border-current rounded-sm" /></button>
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                                                    <span className="text-green-400">{item.timeAgo}</span>
                                                    <div className="flex items-center gap-1">
                                                        {item.badges.includes('global') && <Globe size={10} />}
                                                        {item.badges.includes('users') && <Users size={10} />}
                                                        {item.badges.includes('verified') && <ShieldCheck size={10} className="text-green-500" />}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 sm:gap-6 shrink-0">
                                            <div className="flex flex-col items-end w-[50px] sm:w-[60px]">
                                                <span className="text-[10px] text-zinc-500">MC</span>
                                                <span className="text-xs sm:text-sm font-medium text-white">${formatCurrency(item.marketCap)}</span>
                                            </div>
                                            <div className="flex flex-col items-end w-[50px] sm:w-[60px]">
                                                <span className="text-[10px] text-zinc-500">V</span>
                                                <span className="text-xs sm:text-sm font-medium text-white">${formatCurrency(item.volume)}</span>
                                            </div>
                                            <div className="hidden sm:flex flex-col items-end w-[60px]">
                                                <span className="text-[10px] text-zinc-500">L</span>
                                                <span className="text-sm font-medium text-white">${formatCurrency(item.liquidity)}</span>
                                            </div>
                                            <button className="h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-black transition-colors shrink-0">
                                                <Zap size={16} fill="currentColor" />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {filteredResults.length === 0 && (
                                    <div className="text-center py-12 text-zinc-500">
                                        No results found
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
