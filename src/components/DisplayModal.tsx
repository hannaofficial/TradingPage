'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { cn } from '@/utils/utils';
import { Circle, CheckCircle2, Square, CheckSquare, Search, SunIcon } from 'lucide-react';

interface DisplayModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type TabType = 'Layout' | 'Metrics' | 'Row' | 'Extras';

export const DisplayModal: React.FC<DisplayModalProps> = ({ isOpen, onClose }) => {
    const dragControls = useDragControls();
    const [activeTab, setActiveTab] = useState<TabType>('Layout');
    const [selectedMetric, setSelectedMetric] = useState<'small' | 'large'>('small');
    const [selectedQuickBuy, setSelectedQuickBuy] = useState<'small' | 'large' | 'mega' | 'ultra'>('small');
    const [showSearchBar, setShowSearchBar] = useState(true);
    const [noDecimals, setNoDecimals] = useState(false);
    const [showHiddenTokens, setShowHiddenTokens] = useState(false);
    const [unhideOnMigrated, setUnhideOnMigrated] = useState(false);
    const [circleImages, setCircleImages] = useState(false);
    const [progressBar, setProgressBar] = useState(false);

    const [selectedTags, setSelectedTags] = useState<string[]>(['Image Reuse', 'Market Cap', 'Volume', 'Fees']);

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

    const tabs: TabType[] = ['Layout', 'Metrics', 'Row', 'Extras'];

    const customizeTags = [
        'Image Reuse', 'Market Cap', 'Volume', 'Fees',
        'TX', 'Socials', 'Holders', 'Pro Traders', 'KOLs',
        'Dev Migrations', 'Dev Creations', 'Top 10 Holders'
    ];

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

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
                        className="relative w-full md:max-w-[500px] h-[85dvh] md:h-auto md:max-h-[85vh] bg-[#0c0c0e] border-t md:border border-zinc-800 rounded-t-2xl md:rounded-xl shadow-2xl flex flex-col overflow-hidden mt-auto md:mt-0"
                    >
                        {/* Drag Handle */}
                        <div
                            className="w-full flex items-center justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing touch-none md:hidden"
                            onPointerDown={(e) => dragControls.start(e)}
                        >
                            <div className="w-10 h-1 bg-zinc-700 rounded-full hover:bg-zinc-600 transition-colors" />
                        </div>




                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
                            {/* Metrics Section */}
                            <div className="space-y-3">
                                <span className="text-sm text-zinc-400 ">Metrics</span>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    <button
                                        onClick={() => setSelectedMetric('small')}
                                        className={cn(
                                            "p-4 rounded-xl border transition-all text-center",
                                            selectedMetric === 'small'
                                                ? "bg-zinc-800 border-zinc-700 text-white"
                                                : "bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700"
                                        )}
                                    >
                                        <div className="text-xs font-medium">MC 77K</div>
                                        <div className="text-xs text-zinc-500">Small</div>
                                    </button>
                                    <button
                                        onClick={() => setSelectedMetric('large')}
                                        className={cn(
                                            "p-4 rounded-xl border transition-all text-center",
                                            selectedMetric === 'large'
                                                ? "bg-zinc-800 border-zinc-700 text-white"
                                                : "bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700"
                                        )}
                                    >
                                        <div className="text-xs font-medium">MC 77K</div>
                                        <div className="text-xs text-zinc-500">Large</div>
                                    </button>
                                </div>
                            </div>

                            {/* Quick Buy */}
                            <div className="space-y-3 ">
                                <span className="text-sm text-zinc-400">Quick Buy</span>
                                <div className="grid grid-cols-4 gap-2 mt-2">
                                    {(['small', 'large', 'mega', 'ultra'] as const).map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedQuickBuy(size)}
                                            className={cn(
                                                "p-3 rounded-xl border transition-all text-center",
                                                selectedQuickBuy === size
                                                    ? "bg-blue-600 border-blue-500 text-white"
                                                    : "bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700"
                                            )}
                                        >
                                            <div className="text-xs font-medium capitalize">{size}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color Selector */}
                            <div className="flex items-center gap-2 py-2 px-2 hover:bg-zinc-800/50 cursor-pointer rounded-xl">
                                <SunIcon size={16} className="text-zinc-400" />
                                <span className="text-sm text-zinc-300">Grey</span>
                            </div>

                            {/* Toggles */}
                            {/* <div className="space-y-4">
                                <ToggleOption
                                    icon={<Search size={16} />}
                                    label="Show Search Bar"
                                    checked={showSearchBar}
                                    onChange={setShowSearchBar}
                                />
                                <ToggleOption
                                    icon={<span className="text-sm">#</span>}
                                    label="No Decimals"
                                    checked={noDecimals}
                                    onChange={setNoDecimals}
                                />
                                <ToggleOption
                                    icon={<Circle size={16} />}
                                    label="Show Hidden Tokens"
                                    checked={showHiddenTokens}
                                    onChange={setShowHiddenTokens}
                                />
                                <ToggleOption
                                    icon={<Circle size={16} />}
                                    label="Unhide on Migrated"
                                    checked={unhideOnMigrated}
                                    onChange={setUnhideOnMigrated}
                                />
                                <ToggleOption
                                    icon={<Circle size={16} />}
                                    label="Circle Images"
                                    checked={circleImages}
                                    onChange={setCircleImages}
                                />
                                <ToggleOption
                                    icon={<Circle size={16} />}
                                    label="Progress Bar"
                                    checked={progressBar}
                                    onChange={setProgressBar}
                                />
                            </div> */}

                            {/* Customize Rows */}
                            <div className="space-y-3">
                                <span className="text-sm text-zinc-400 ">Customize rows</span>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {customizeTags.map((tag) => (
                                        <button
                                            key={tag}
                                            onClick={() => toggleTag(tag)}
                                            className={cn(
                                                "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                                                selectedTags.includes(tag)
                                                    ? "bg-zinc-800 border-zinc-700 text-white"
                                                    : "bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700"
                                            )}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const ToggleOption: React.FC<{
    icon: React.ReactNode;
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}> = ({ icon, label, checked, onChange }) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="text-zinc-400">{icon}</div>
                <span className="text-sm text-zinc-300">{label}</span>
            </div>
            <button
                onClick={() => onChange(!checked)}
                className={cn(
                    "w-10 h-5 rounded-full relative transition-colors",
                    checked ? "bg-blue-600" : "bg-zinc-800"
                )}
            >
                <div
                    className={cn(
                        "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all",
                        checked ? "right-0.5" : "left-0.5"
                    )}
                />
            </button>
        </div>
    );
};
