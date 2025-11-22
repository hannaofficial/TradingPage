'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
    Wallet, ChevronDown, CircleDollarSign, Copy, Settings, Plus, Download, ArrowRightLeft, Check,
    ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/utils/utils';

interface WalletDropdownProps {
    isCompact: boolean;
}

export const WalletDropdown: React.FC<WalletDropdownProps> = ({ isCompact }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center transition-colors",
                    !isCompact
                        ? "hidden md:flex items-stretch gap-1 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-full text-xs text-white flex-shrink-0 h-9 hover:bg-zinc-700"
                        : "flex items-center items-stretch gap-1 px-2 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-white text-[11px] shrink-0 h-8 sm:h-9 sm:text-xs sm:px-3 md:h-9 md:px-3 md:gap-2 hover:bg-zinc-700"
                )}
            >
                {!isCompact ? (
                    <>
                        <div className="flex items-center justify-center h-6 w-6">
                            <Wallet size={16} />
                        </div>
                        <Image src="/solana-logo.svg" alt="SOL" width={12} height={12} className="ml-1 object-contain" />
                        <span className='flex items-center justify-center h-6 w-6'>0</span>
                        <span className="w-px bg-zinc-600 mx-1" />
                        <div className="flex items-center justify-center gap-1">
                            <CircleDollarSign size={16} />
                            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center justify-center">
                            <Wallet size={16} />
                        </div>
                        <div className="flex items-center justify-center">
                            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                    </>
                )}
            </button>

            {/* Dropdown Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className={cn(
                            "absolute right-0 top-full mt-2 bg-[#0c0c0e] border border-zinc-800 rounded-xl shadow-xl overflow-hidden z-50",
                            isCompact ? "w-[320px]" : "w-[280px]"
                        )}
                    >
                        {!isCompact ? (
                            // Desktop View (Simple)
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-2 text-xs text-zinc-400">
                                    <span>Total Value</span>
                                    <div className="flex gap-2">
                                        <div className="flex items-center gap-1"><Image src="/solana-logo.svg" alt="SOL" width={10} height={10} /> Solana</div>
                                        <div className="flex items-center gap-1"><CircleDollarSign size={10} /> Perps</div>
                                    </div>
                                </div>
                                <div className="text-lg font-normal text-white mb-4">$0</div>

                                <div className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-lg border border-zinc-800 mb-4">
                                    <div className="flex items-center gap-2">
                                        <Image src="/solana-logo.svg" alt="SOL" width={14} height={14} />
                                        <span className="text-xs font-normal text-white">0</span>
                                    </div>
                                    <ArrowRightLeft size={14} className="text-zinc-500" />
                                    <div className="flex items-center gap-2">
                                        <CircleDollarSign size={14} className="text-blue-400" />
                                        <span className="text-xs font-normal text-white">0</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <button className="bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-1 rounded-2xl text-xs transition-colors">
                                        Deposit
                                    </button>
                                    <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold py-2 px-1 rounded-2xl text-xs transition-colors">
                                        Withdraw
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Mobile View (Detailed)
                            <div className="flex flex-col">
                                <div className="p-4 border-b border-zinc-800">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2 text-white ">
                                            <Wallet size={16} />
                                            <span>Trading Wallets</span>
                                        </div>
                                        <div className="flex gap-3 text-[10px] text-zinc-500">
                                            <div className="flex items-center gap-1"><Image src="/solana-logo.svg" alt="SOL" width={10} height={10} /> Solana</div>
                                            <div className="flex items-center gap-1"><CircleDollarSign size={10} /> Perps</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                                        <span>Total value</span>
                                        <span className="text-white">$0</span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-lg border border-zinc-800 mb-4">
                                        <div className="flex items-center gap-2">
                                            <Image src="/solana-logo.svg" alt="SOL" width={14} height={14} />
                                            <span className="text-sm font-medium text-white">0</span>
                                        </div>
                                        <ArrowRightLeft size={14} className="text-zinc-500" />
                                        <div className="flex items-center gap-2">
                                            <CircleDollarSign size={14} className="text-blue-400" />
                                            <span className="text-sm font-medium text-white">0</span>
                                        </div>
                                    </div>

                                    {/* Wallet Item */}
                                    <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-3 flex items-center justify-between group hover:border-zinc-700 transition-colors cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="h-4 w-4 rounded bg-blue-600 flex items-center justify-center">
                                                <Check size={10} className="text-white" />
                                            </div>
                                            <div>
                                                <div className="text-sm  text-white">Axiom Main</div>
                                                <div className="flex items-center gap-1 text-[10px] text-zinc-500">
                                                    <span>AxgC...FJ6n</span>
                                                    <Copy size={8} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1 px-2 py-1 bg-zinc-800 rounded text-[10px] text-zinc-300">
                                                <Image src="/solana-logo.svg" alt="SOL" width={10} height={10} />
                                                <span>0</span>
                                            </div>
                                            <div className="w-8 h-4 bg-zinc-700 rounded-full relative">
                                                <div className="absolute left-0.5 top-0.5 h-3 w-3 bg-zinc-500 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-3 bg-zinc-900/50 text-center text-[10px] text-zinc-500 border-b border-zinc-800">
                                    1 of 1 wallets selected
                                </div>

                                <div className="p-4 grid grid-cols-4 gap-2">
                                    <button className="flex flex-col items-center justify-center gap-1 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl py-2 transition-colors">
                                        <span className="text-xs font-normal">Deposit</span>
                                    </button>
                                    <button className="flex flex-col items-center justify-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-2xl py-2 transition-colors">
                                        <span className="text-xs font-normal">Withdraw</span>
                                    </button>
                                    <button className="flex flex-col items-center justify-center gap-1 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 rounded-2xl py-2 transition-colors">
                                        <span className="text-xs font-normal">Create</span>
                                    </button>
                                    <button className="flex flex-col items-center justify-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-2xl py-2 transition-colors">
                                        <span className="text-xs font-normal">Import</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
