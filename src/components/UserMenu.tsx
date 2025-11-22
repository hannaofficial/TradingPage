'use client';

import React, { useState, useRef, useEffect } from 'react';
import { User, Shield, Languages, Rocket, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/utils/utils';

interface UserMenuProps {
    className?: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({ className }) => {
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

    const menuItems = [
        { icon: Shield, label: 'Account and Security', href: '#' },
        { icon: Languages, label: 'Auto Translate', href: '#' },
        { icon: Rocket, label: 'Feature Updates', href: '#' },
    ];

    return (
        <div className={cn("relative", className)} ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "h-9 w-9 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors",
                    isOpen && "text-white bg-zinc-800"
                )}
            >
                <User size={18} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 top-full mt-2 w-64 bg-[#0c0c0e] border border-zinc-800 rounded-xl shadow-xl overflow-hidden z-50"
                    >
                        <div className="py-1.5">
                            {menuItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-200 hover:bg-zinc-800/50 transition-colors"
                                >
                                    <item.icon size={16} className="text-zinc-400" />
                                    <span>{item.label}</span>
                                </Link>
                            ))}

                            <div className="h-px bg-zinc-800 my-1.5 mx-4" />

                            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-500 hover:bg-rose-500/10 transition-colors text-left">
                                <LogOut size={16} />
                                <span>Log Out</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
