'use client';

import React, { useState, useEffect } from 'react';
import { X, Settings, Copy, Rocket, Wallet } from 'lucide-react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { cn } from '@/utils/utils';
import Image from 'next/image';

interface WalletModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
    const dragControls = useDragControls();
    const [selected, setSelected] = useState(false);

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
                <div className="fixed inset-0 z-100 flex items-center justify-center md:items-start md:pt-20 px-0 md:px-4">
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
                        className="relative w-full md:max-w-[500px] h-[50dvh] md:h-auto bg-[#0c0c0e] border-t md:border border-zinc-800 rounded-t-2xl md:rounded-xl shadow-2xl flex flex-col overflow-hidden mt-auto md:mt-0"
                    >
                        {/* Drag Handle */}
                        <div
                            className="w-full flex items-center justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing touch-none md:hidden"
                            onPointerDown={(e) => dragControls.start(e)}
                        >
                            <div className="w-10 h-1 bg-zinc-700 rounded-full hover:bg-zinc-600 transition-colors" />
                        </div>

                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 shrink-0">
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors">
                                    Select All
                                </button>
                                <button className="px-3 py-1.5 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-500 hover:text-zinc-300 text-xs font-medium transition-colors">
                                    Select All with Balance
                                </button>
                            </div>
                            <button className="text-zinc-500 hover:text-zinc-300">
                                <Settings size={16} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                            {/* Wallet Item */}
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/20 border border-zinc-800/50 hover:border-zinc-700 transition-colors group">
                                {/* Checkbox */}
                                <div
                                    onClick={() => setSelected(!selected)}
                                    className={cn(
                                        "w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors",
                                        selected ? "bg-blue-600 border-blue-600" : "border-zinc-700 hover:border-zinc-600"
                                    )}
                                >
                                    {selected && <X size={12} className="text-white" />}
                                    {/* Using X as checkmark placeholder or actual check icon if available */}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium text-orange-400">Axiom Main</span>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-zinc-900 border border-zinc-800">
                                                <Image src="/solana-logo.svg" alt="SOL" width={12} height={12} />
                                                <span className="text-xs font-mono text-zinc-300">0</span>
                                            </div>
                                            <div className="w-8 h-4 rounded-full bg-zinc-800 relative">
                                                <div className="absolute left-0.5 top-0.5 w-3 h-3 rounded-full bg-zinc-600"></div>
                                            </div>
                                            <span className="text-xs font-mono text-zinc-500">0</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 text-zinc-500">
                                            <Rocket size={12} />
                                            <span className="text-xs">Off</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-zinc-500 hover:text-zinc-300 cursor-pointer">
                                            <span className="text-xs font-mono">AxgCB</span>
                                            <Copy size={12} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
