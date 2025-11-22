'use client';

import React, { useState, useEffect } from 'react';
import { X, Copy, ChevronDown, ArrowUpDown, QrCode, ArrowRightLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/utils/utils';

interface DepositModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type Tab = 'convert' | 'deposit' | 'buy';

export const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<Tab>('deposit');

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
                        className="relative w-full max-w-md bg-[#0c0c0e] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
                            <h2 className="text-sm font-medium text-zinc-200">Exchange</h2>
                            <button
                                onClick={onClose}
                                className="text-zinc-400 hover:text-white transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="p-4 pb-0">
                            <div className="flex p-1 bg-zinc-900 rounded-lg border border-zinc-800">
                                {(['convert', 'deposit', 'buy'] as Tab[]).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={cn(
                                            "flex-1 py-1.5 text-xs font-medium rounded-md transition-all capitalize",
                                            activeTab === tab
                                                ? "bg-zinc-800 text-white shadow-sm"
                                                : "text-zinc-500 hover:text-zinc-300"
                                        )}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-4">
                            {activeTab === 'deposit' && (
                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <button className="flex-1 flex items-center justify-between px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white hover:border-zinc-700 transition-colors">
                                            <div className="flex items-center gap-2">
                                                <Image src="/solana-logo.svg" alt="SOL" width={16} height={16} />
                                                <span>Solana</span>
                                            </div>
                                            <ChevronDown size={14} className="text-zinc-500" />
                                        </button>
                                        <div className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-400 flex items-center">
                                            Balance: 0 SOL
                                        </div>
                                    </div>

                                    <div className="text-[10px] text-zinc-500">
                                        Only deposit Solana through the Solana network for this address.
                                    </div>

                                    <div className="flex justify-center py-4">
                                        <div className="bg-white p-2 rounded-lg">
                                            {/* Placeholder QR Code */}
                                            <div className="w-32 h-32 bg-black flex items-center justify-center relative">
                                                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-0.5 opacity-80">
                                                    {Array.from({ length: 36 }).map((_, i) => (
                                                        <div key={i} className={cn("bg-current", Math.random() > 0.5 ? "text-black" : "text-white")} />
                                                    ))}
                                                </div>
                                                <div className="z-10 bg-black p-1 rounded-full">
                                                    <Image src="/solana-logo.svg" alt="SOL" width={24} height={24} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 flex items-center justify-between">
                                        <div className="text-xs text-zinc-400 font-mono truncate mr-2">
                                            AxgCBJVERTDCc2o7NPSWnh5q28zf5VVKxMGGhebrFJ6n
                                        </div>
                                        <button className="text-zinc-500 hover:text-white transition-colors">
                                            <Copy size={14} />
                                        </button>
                                    </div>

                                    <div className="text-[10px] text-zinc-500 text-center">
                                        Don't have any Solana? <span className="text-blue-400 cursor-pointer hover:underline">Buy through Onramper.</span>
                                    </div>

                                    <button className="w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-2.5 rounded-3xl text-sm transition-colors">
                                        Copy Address
                                    </button>
                                </div>
                            )}

                            {activeTab === 'convert' && (
                                <div className="space-y-1">
                                    <div className="text-[10px] text-zinc-500 mb-2">Swap SOL for BNB</div>

                                    {/* Converting Input */}
                                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 space-y-2">
                                        <div className="flex justify-between text-[10px] text-zinc-500">
                                            <span>Converting</span>
                                            <span>Balance: 0</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <input
                                                type="text"
                                                placeholder="0.0"
                                                className="bg-transparent text-xl font-medium text-white outline-none w-full placeholder:text-zinc-600"
                                            />
                                            <button className="flex items-center gap-1 px-2 py-1 bg-zinc-800 rounded-full text-xs text-white hover:bg-zinc-700 transition-colors shrink-0">
                                                <Image src="/solana-logo.svg" alt="SOL" width={14} height={14} />
                                                <span>SOL</span>
                                                <ChevronDown size={12} className="text-zinc-500" />
                                            </button>
                                        </div>
                                        <div className="text-[10px] text-zinc-600 text-right">($0.00)</div>
                                    </div>

                                    {/* Swap Icon */}
                                    <div className="flex justify-center -my-2 relative z-10">
                                        <div className="bg-zinc-800 p-1.5 rounded-full border border-zinc-700 text-zinc-400">
                                            <ArrowUpDown size={14} />
                                        </div>
                                    </div>

                                    {/* Gaining Input */}
                                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 space-y-2">
                                        <div className="flex justify-between text-[10px] text-zinc-500">
                                            <span>Gaining</span>
                                            <span>Balance: 0</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <input
                                                type="text"
                                                placeholder="0.0"
                                                className="bg-transparent text-xl font-medium text-white outline-none w-full placeholder:text-zinc-600"
                                            />
                                            <button className="flex items-center gap-1 px-2 py-1 bg-zinc-800 rounded-full text-xs text-white hover:bg-zinc-700 transition-colors shrink-0">
                                                <div className="w-3.5 h-3.5 bg-yellow-500 rounded-full flex items-center justify-center text-[8px] text-black font-bold">B</div>
                                                <span>BNB</span>
                                                <ChevronDown size={12} className="text-zinc-500" />
                                            </button>
                                        </div>
                                        <div className="text-[10px] text-zinc-500 text-right">1 SOL ≈ 0.631 BNB</div>
                                    </div>

                                    <div className="pt-4">
                                        <button className="w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-2.5 rounded-3xl text-sm transition-colors">
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'buy' && (
                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <button className="flex-1 flex items-center justify-between px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white hover:border-zinc-700 transition-colors">
                                            <div className="flex items-center gap-2">
                                                <Image src="/solana-logo.svg" alt="SOL" width={16} height={16} />
                                                <span>Solana</span>
                                            </div>
                                            <ChevronDown size={14} className="text-zinc-500" />
                                        </button>
                                        <div className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-400 flex items-center">
                                            Balance: 0 SOL
                                        </div>
                                    </div>

                                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 space-y-2">
                                        <div className="flex justify-between text-[10px] text-zinc-500">
                                            <span>Buying</span>
                                            <span>SOL Price: 125.55</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <input
                                                type="text"
                                                placeholder="0.0"
                                                className="bg-transparent text-xl font-medium text-white outline-none w-full placeholder:text-zinc-600"
                                            />
                                            <div className="flex items-center gap-1 text-sm font-bold text-white">
                                                <Image src="/solana-logo.svg" alt="SOL" width={16} height={16} />
                                                <span>SOL</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between text-[10px]">
                                            <span className="text-rose-500">Minimum: 20 USD</span>
                                            <span className="text-zinc-500">≈ 0 USD</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-end text-[10px] text-zinc-500 items-center gap-1">
                                        powered by <span className="font-bold text-white">onramper</span>
                                    </div>

                                    <button className="w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-2.5 rounded-3xl text-sm transition-colors">
                                        Buy
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
