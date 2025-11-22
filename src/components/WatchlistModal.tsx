'use client';

import React, { useEffect } from 'react';
import { X, Trash2, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { formatCurrency } from '@/utils/utils';

interface WatchlistItem {
    id: string;
    name: string;
    symbol: string;
    imageUrl: string;
    marketCap: number;
    volume1h: number;
    liquidity: number;
}

interface WatchlistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Mock data - in future this would come from a store/context
const MOCK_WATCHLIST: WatchlistItem[] = [
    {
        id: '1',
        name: 'Muhammed',
        symbol: 'Justice...',
        imageUrl: '/favicon.ico',
        marketCap: 0,
        volume1h: 0,
        liquidity: 0
    }
];

export const WatchlistModal: React.FC<WatchlistModalProps> = ({ isOpen, onClose }) => {
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

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-3xl bg-[#0c0c0e] border border-zinc-800 rounded-md shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <h2 className="text-sm font-bold text-white">Watchlist</h2>
                            <button
                                onClick={onClose}
                                className="text-zinc-400 hover:text-white transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Table */}
                        <div className="p-6 min-h-[300px]">
                            <div className="w-full">
                                {/* Table Header */}
                                <div className="grid grid-cols-12 gap-4 text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-4 px-2">
                                    <div className="col-span-4">Token</div>
                                    <div className="col-span-2">Market Cap</div>
                                    <div className="col-span-2 flex items-center gap-1 cursor-pointer hover:text-zinc-300">
                                        1h Volume <ArrowDown size={10} />
                                    </div>
                                    <div className="col-span-2">Liquidity</div>
                                    <div className="col-span-2 text-right">Actions</div>
                                </div>

                                {/* Table Body */}
                                <div className="space-y-1">
                                    {MOCK_WATCHLIST.map((item) => (
                                        <div
                                            key={item.id}
                                            className="grid grid-cols-12 gap-4 items-center p-2 hover:bg-zinc-800/30 rounded-lg transition-colors group"
                                        >
                                            {/* Token */}
                                            <div className="col-span-4 flex items-center gap-3">
                                                <div className="relative h-8 w-8 rounded overflow-hidden bg-zinc-800">
                                                    <Image
                                                        src={item.imageUrl}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-white">{item.name}</span>
                                                    <span className="text-[10px] text-zinc-500">{item.symbol}</span>
                                                </div>
                                            </div>

                                            {/* Market Cap */}
                                            <div className="col-span-2 text-xs text-zinc-300 font-mono">
                                                {formatCurrency(item.marketCap)}
                                            </div>

                                            {/* Volume */}
                                            <div className="col-span-2 text-xs text-zinc-300 font-mono">
                                                {formatCurrency(item.volume1h)}
                                            </div>

                                            {/* Liquidity */}
                                            <div className="col-span-2 text-xs text-zinc-300 font-mono">
                                                {formatCurrency(item.liquidity)}
                                            </div>

                                            {/* Actions */}
                                            <div className="col-span-2 flex justify-end">
                                                <button className="p-1.5 text-zinc-500 hover:text-rose-500 hover:bg-rose-500/10 rounded transition-colors opacity-0 group-hover:opacity-100">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    {MOCK_WATCHLIST.length === 0 && (
                                        <div className="text-center py-12 text-zinc-500 text-sm">
                                            Your watchlist is empty
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
