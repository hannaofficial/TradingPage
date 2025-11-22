// components/Header.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Search,
    Wallet,
    Settings,
    Bell,
    Menu,
    Copy,
    User,
    ChevronDown,
    Star,
    CircleDollarSign,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

export const Header: React.FC = () => {
    // nav scroll refs & state
    const navScroller = useRef<HTMLDivElement | null>(null);
    const [navOverflow, setNavOverflow] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const [isWideEnoughForFullSearch, setIsWideEnoughForFullSearch] = useState<boolean>(() =>
        typeof window !== 'undefined' ? window.innerWidth >= 1600 : true
    );
    const [isCompactWallet, setIsCompactWallet] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth <= 1200 : false
    );
    useEffect(() => {
        function onResize() {
            setIsCompactWallet(window.innerWidth <= 1200);
        }
        window.addEventListener('resize', onResize);
        onResize();
        return () => window.removeEventListener('resize', onResize);
    }, []);


    useEffect(() => {
        const update = () => {
            const el = navScroller.current;
            if (el) {
                setNavOverflow(el.scrollWidth > el.clientWidth + 1);
                setCanScrollLeft(el.scrollLeft > 2);
                setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
            }
            setIsWideEnoughForFullSearch(window.innerWidth >= 1600);
        };

        update();
        window.addEventListener('resize', update);
        const ro = new ResizeObserver(update);
        if (navScroller.current) ro.observe(navScroller.current);
        return () => {
            window.removeEventListener('resize', update);
            ro.disconnect();
        };
    }, []);

    const scrollNavBy = (distance: number) => {
        if (!navScroller.current) return;
        navScroller.current.scrollBy({ left: distance, behavior: 'smooth' });
    };

    const [searchOpen, setSearchOpen] = useState(false);

    const NAV_ITEMS = [
        { key: 'discover', label: 'Discover', href: '#' },
        { key: 'pulse', label: 'Pulse', href: '#' },
        { key: 'trackers', label: 'Trackers', href: '#' },
        { key: 'perp', label: 'Perpetuals', href: '#' },
        { key: 'yield', label: 'Yield', href: '#' },
        { key: 'vision', label: 'Vision', href: '#' },
        { key: 'portfolio', label: 'Portfolio', href: '#' },
        { key: 'rewards', label: 'Rewards', href: '#' },
    ];


    return (
        <>
            <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b border-zinc-800 bg-black px-4">
                {/* LEFT: Logo + Nav */}
                <div className="flex items-center gap-6 min-w-0 flex-1">
                    <Link href="#" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white shrink-0">
                        <Image src="/favicon.ico" alt="Logo" width={32} height={32} />
                        <span className="hidden md:inline">
                            AXIOM<span className="text-zinc-500 font-normal ml-1 text-sm">Pro</span>
                        </span>
                    </Link>

                    {/* Scrollable nav with overlay arrows */}
                    <div className="hidden md:block min-w-0">
                        <div className="relative">
                            {/* Arrow (absolute) - left */}
                            {/* Left arrow — hidden & non-interactive until navOverflow is true */}
                            <button
                                type="button"
                                onClick={() => scrollNavBy(-140)}
                                aria-hidden={!navOverflow}
                                title="Scroll left"
                                className={`
                                                absolute left-0 top-1/2 -translate-y-1/2 z-30
                                                h-9 w-9 flex items-center justify-center rounded-md
                                                transition-all duration-150
                                                ${navOverflow
                                        ? `opacity-100 pointer-events-auto text-zinc-400`   // visible state
                                        : `opacity-0 pointer-events-none text-zinc-400`}   // hidden state
                                                ${navOverflow && !canScrollLeft ? 'opacity-40' : ''}
                                            `}
                            >
                                <ChevronLeft size={18} />
                            </button>

                            {/* Scrollable nav area (padding keeps items visible behind arrows) */}
                            <div
                                ref={navScroller}
                                onScroll={() => {
                                    const el = navScroller.current;
                                    if (!el) return;
                                    setNavOverflow(el.scrollWidth > el.clientWidth + 1);
                                    setCanScrollLeft(el.scrollLeft > 2);
                                    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
                                }}
                                className="flex gap-6 text-[13px] font-medium overflow-x-auto no-scrollbar px-10 min-w-0"
                                style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}
                            >
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.key}
                                        href={item.href}
                                        className={`whitespace-nowrap rounded px-2 py-1 transition-colors ${item.key === 'pulse'
                                            ? 'text-blue-400'
                                            : 'text-white hover:text-blue-400 hover:bg-blue-600/20'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() => scrollNavBy(140)}
                                aria-hidden={!navOverflow}
                                title="Scroll right"
                                className={`
                                    absolute right-0 top-1/2 -translate-y-1/2 z-30
                                    h-9 w-9 flex items-center justify-center rounded-md
                                    transition-all duration-150
                                    ${navOverflow
                                        ? `opacity-100 pointer-events-auto text-zinc-400`   // visible state
                                        : `opacity-0 pointer-events-none text-zinc-400`}   // hidden state
                                    ${navOverflow && !canScrollRight ? 'opacity-40' : ''}
                                `}
                            >
                                <ChevronRight size={18} />
                            </button>

                            <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-black/80 to-transparent"></div>
                            <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-black/80 to-transparent"></div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 min-w-0 shrink-0">
                    <div className="relative flex items-center min-w-0">
                        {isWideEnoughForFullSearch ? (
                            <button
                                type="button"
                                onClick={() => setSearchOpen(true)}
                                className="hidden md:flex items-center gap-2 h-9 px-3 rounded-full border border-zinc-800 bg-[#0c0c0e] text-sm text-zinc-200 hover:border-zinc-700 transition-colors min-w-0"
                                aria-label="Open search"
                                style={{ maxWidth: 'min(32rem, 50vw)' }}
                            >
                                <Search className="h-4 w-4 text-zinc-500" />
                                <span className="truncate text-zinc-500">Search by token or CA...</span>
                                <span className="ml-auto text-[10px] text-zinc-500 border border-zinc-800 px-1.5 rounded bg-zinc-900/50">/</span>
                            </button>
                        ) : (
                            // compact icon-only 
                            <button
                                type="button"
                                onClick={() => setSearchOpen(true)}
                                className="hidden md:inline-flex  items-center justify-center h-9 w-9  rounded-full border border-zinc-800 bg-[#0c0c0e] text-zinc-400 hover:bg-zinc-900 transition-colors"
                                aria-label="Open search"
                            >
                                <Search className="h-4 w-4" />
                            </button>
                        )}

                        {/* Mobile: always icon */}
                        <button
                            type="button"
                            onClick={() => setSearchOpen(true)}
                            className="md:hidden p-2 text-zinc-400"
                            aria-label="Open search"
                        >
                            <Search size={20} />
                        </button>
                    </div>

                    <button className="hidden md:flex items-center gap-2 rounded-2xl border border-zinc-800 bg-[#0c0c0e] px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-900 transition-colors shrink-0">
                        <Image src="/solana-logo.svg" alt="SOL" width={16} height={16} className="h-4 w-4" />
                        <span>SOL</span>
                        <ChevronDown size={16} />
                    </button>

                    <button className="hidden md:flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-1.5 text-sm font-bold text-black hover:bg-blue-500 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)] shrink-0">
                        Deposit
                    </button>

                    <button className="md:hidden flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1.5 text-xs font-medium text-zinc-300">
                        <Copy size={12} />
                        <span>Paste CA</span>
                    </button>


                    <div className="flex items-center gap-1 shrink-0">
                        <button className="hidden md:block h-9 w-9 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            <Star size={18} />
                        </button>

                        <button className="hidden md:block h-9 w-9 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors relative">
                            <Bell size={18} />
                            <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-blue-500 rounded-full" />
                        </button>

                        <button className="hidden md:block h-9 w-9 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            <Settings size={18} />
                        </button>

                        {!isCompactWallet ? (
                            <button className="hidden md:flex items-center items-stretch gap-1 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-full text-xs text-white flex-shrink-0 h-9">
                                <div className="flex items-center justify-center h-6 w-6">
                                    <Wallet size={16} />
                                </div>
                                <Image src="/solana-logo.svg" alt="SOL" width={12} height={12} className="ml-1 object-contain" /> <span className=' flex items-center justify-center h-6 w-6'>0</span>
                                <span className="w-px bg-zinc-600 mx-1" />
                                <div className="flex items-center justify-center gap-1 ">
                                    <CircleDollarSign size={16} />
                                    <ChevronDown size={16} />
                                </div>
                            </button>
                        ) : (
                            <button
                                className="
                        flex items-center items-stretch  gap-1              
                        px-2 py-1                                            
                        bg-zinc-800 border border-zinc-700 rounded-full
                        text-white text-[11px]                               
                        shrink-0 h-8                                    
                        
                        sm:h-9 sm:text-xs sm:px-3
                        md:h-9 md:px-3 md:gap-2                              
                    "
                            >
                                <div className="flex items-center justify-center ">
                                    <Wallet size={16} />
                                </div>

                                <div className="flex items-center justify-center ">
                                    <ChevronDown size={16} />
                                </div>
                            </button>

                        )}


                        <button className="h-9 w-9 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            <Menu size={20} className="md:hidden" />
                            <User size={18} className="hidden md:block" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Search overlay (simple, same as before) */}
            {searchOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setSearchOpen(false)}
                >
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                    <div className="relative z-50 w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-3 bg-[#0c0c0e] border border-zinc-800 rounded-full px-4 py-2">
                            <Search className="h-5 w-5 text-zinc-400" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search by token or contract address..."
                                className="w-full bg-transparent outline-none text-zinc-200 placeholder:text-zinc-500"
                            />
                            <button className="ml-3 text-zinc-400 hover:text-zinc-200" onClick={() => setSearchOpen(false)} aria-label="Close search">
                                ✕
                            </button>
                        </div>

                        <div className="mt-3 bg-[#080808] border border-zinc-800 rounded-lg p-3 text-zinc-400">
                            <div className="text-sm">Type to search tokens, addresses or contract addresses.</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
