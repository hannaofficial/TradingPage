'use client';

import React, { useEffect } from 'react';
import {
    Menu, X, Eye, Gift, CircleDollarSign, Star, Globe, Shield, Bell, Languages, Rocket, Wallet, LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/utils/utils';
import Image from 'next/image';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
    // Prevent body scroll when menu is open
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

    const sections = [
        {
            title: 'NAVIGATION',
            items: [
                { icon: Eye, label: 'Vision', href: '#' },
                { icon: Gift, label: 'Rewards', href: '#' },
                { icon: CircleDollarSign, label: 'Yield', href: '#' },
                { icon: Star, label: 'Watchlist', href: '#' },
            ]
        },
        {
            title: 'SETTINGS',
            items: [
                { icon: Globe, label: 'Regions', href: '#' },
                { icon: Shield, label: 'Account and Security', href: '#' },
                { icon: Bell, label: 'Notifications', href: '#' },
                { icon: Languages, label: 'Auto Translate', href: '#' },
                { icon: Rocket, label: 'Feature Updates', href: '#' },
            ]
        },
        {
            title: 'ACCOUNT',
            items: [
                { icon: Wallet, label: 'Deposit', href: '#' },
                { icon: Wallet, label: 'Withdraw', href: '#' }
            ]
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100 md:hidden"
                    />

                    {/* Menu Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-[280px] bg-[#0c0c0e] border-l border-zinc-800 z-[100] md:hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                            <div className="flex items-center gap-2">
                                <Image src="/favicon.ico" alt="Logo" width={24} height={24} />
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                            {sections.map((section, idx) => (
                                <div key={idx} >
                                    <h3 className="text-xs font-semibold text-zinc-500 mb-3 uppercase tracking-wider">
                                        {section.title}
                                    </h3>
                                    <div className="space-y-1">
                                        {section.items.map((item, itemIdx) => (
                                            <Link
                                                key={itemIdx}
                                                href={item.href}
                                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium border border-zinc-900 text-zinc-200 hover:bg-zinc-800/50 transition-colors"
                                            >
                                                <item.icon size={16} className="text-zinc-400" />
                                                <span>{item.label}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {/* Footer with Log Out */}
                            <div className="p-4 ">
                                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-rose-500 hover:bg-rose-500/10 transition-colors text-left">
                                    <LogOut size={18} />
                                    <span>Log Out</span>
                                </button>
                            </div>

                        </div>


                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
