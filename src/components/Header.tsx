// components/Header.tsx
import React from 'react';
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
} from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b border-zinc-800 bg-black px-4">
            {/* LEFT: Logo + Nav */}
            <div className="flex items-center gap-8 min-w-0">
                <Link href="#" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
                    <Image src="/favicon.ico" alt="Logo" width={32} height={32} />
                    <span className="hidden md:inline">
                        AXIOM<span className="text-zinc-500 font-normal ml-1 text-sm">Pro</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium text-zinc-400 min-w-0">
                    <Link href="#" className="text-white hover:text-blue-400 hover:bg-blue-600/20 px-2 py-1 rounded transition-colors">
                        Discover
                    </Link>
                    <Link href="#" className="text-blue-400">
                        Pulse
                    </Link>
                    <Link href="#" className="text-white hover:text-blue-400 hover:bg-blue-600/20 px-2 py-1 rounded transition-colors">
                        Trackers
                    </Link>
                    <Link href="#" className="text-white hover:text-blue-400 hover:bg-blue-600/20 px-2 py-1 rounded transition-colors">
                        Perpetuals
                    </Link>
                    <Link href="#" className="text-white hover:text-blue-400 hover:bg-blue-600/20 px-2 py-1 rounded transition-colors">
                        Yield
                    </Link>
                    <Link href="#" className="text-white hover:text-blue-400 hover:bg-blue-600/20 px-2 py-1 rounded transition-colors">
                        Vision
                    </Link>
                    <Link href="#" className="text-white hover:text-blue-400 hover:bg-blue-600/20 px-2 py-1 rounded transition-colors">
                        Portfolio
                    </Link>
                    <Link href="#" className="text-white hover:text-blue-400 hover:bg-blue-600/20 px-2 py-1 rounded transition-colors">
                        Rewards
                    </Link>
                </nav>
            </div>

            {/* CENTER + RIGHT: Search + Controls */}
            <div className="flex items-center gap-3 min-w-0">
                {/* Responsive Search: participates in flex shrink and will compress when needed */}
                <div className="relative hidden md:flex group flex-shrink min-w-0">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by token or CA..."
                        className="h-9 w-full max-w-[18rem] rounded-full border border-zinc-800 bg-[#0c0c0e] pl-10 pr-10 text-sm text-zinc-200 outline-none focus:border-zinc-700 transition-colors placeholder:text-zinc-600 min-w-0"
                    />
                    <span className="absolute right-3 top-2.5 text-[10px] text-zinc-500 border border-zinc-800 px-1.5 rounded bg-zinc-900/50">
                        /
                    </span>
                </div>

                {/* Mobile search icon */}
                <button className="md:hidden p-2 text-zinc-400">
                    <Search size={20} />
                </button>

                {/* SOL Dropdown */}
                <button className="hidden md:flex items-center gap-2 rounded-2xl border border-zinc-800 bg-[#0c0c0e] px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-900 transition-colors flex-shrink-0">
                    <Image src="/solana-logo.svg" alt="SOL" className="h-4 w-4" width={16} height={16} />
                    <span>SOL</span>
                    <ChevronDown size={16} />
                </button>

                <button className="hidden md:flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-1.5 text-sm font-bold text-black hover:bg-blue-500 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)] flex-shrink-0">
                    Deposit
                </button>

                {/* Mobile Paste CA Button */}
                <button className="md:hidden flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1.5 text-xs font-medium text-zinc-300">
                    <Copy size={12} />
                    <span>Paste CA</span>
                </button>

                {/* RIGHT ICONS GROUP - keep mostly non-shrinking so search compresses first */}
                <div className="flex items-center gap-1 flex-shrink-0">
                    <button className="hidden md:block p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
                        <Star size={18} />
                    </button>

                    <button className="hidden md:block p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors relative">
                        <Bell size={18} />
                        <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-blue-500 rounded-full" />
                    </button>

                    <button className="hidden md:block p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
                        <Settings size={18} />
                    </button>

                    <button className="hidden md:flex items-center items-stretch gap-1 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-full text-xs text-white flex-shrink-0">
                        <Wallet size={16} />

                        <Image src="/solana-logo.svg" alt="SOL" width={12} height={12} className="ml-2 object-contain" />
                        <span>0</span>

                        {/* Vertical Divider */}
                        <span className="w-px bg-zinc-600 mx-1" />

                        <CircleDollarSign size={16} />
                        <ChevronDown size={16} />
                    </button>

                    <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
                        <Menu size={20} className="md:hidden" />
                        <User size={18} className="hidden md:block" />
                    </button>
                </div>
            </div>
        </header>
    );
};

