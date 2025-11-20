import React from 'react';
import { Flame, Activity, ArrowRightLeft, User, Radar } from 'lucide-react';
import { cn } from '@/utils/utils';

export const MobileNav: React.FC = () => {
    const navItems = [
        { icon: Flame, label: 'Trending', active: false },
        { icon: Radar, label: 'Track', active: false },
        { icon: Activity, label: 'Pulse', active: true }, // Pulse is active by default for this page
        { icon: ArrowRightLeft, label: 'Perpetuals', active: false },
        { icon: User, label: 'Account', active: false },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 w-full h-[60px] bg-[#050505] border-t border-zinc-900 flex items-center justify-around z-[100] pb-1">
            {navItems.map((item) => (
                <button
                    key={item.label}
                    className={cn(
                        "flex flex-col items-center justify-center gap-1.5 w-full h-full transition-all active:scale-95 pt-1",
                        item.active ? "text-axiom" : "text-zinc-600 hover:text-zinc-400"
                    )}
                >
                    <item.icon size={20} strokeWidth={item.active ? 2.5 : 2} />
                    <span className={cn("text-[10px] font-medium tracking-tight", item.active ? "text-zinc-200" : "text-zinc-600")}>{item.label}</span>
                </button>
            ))}
        </div>
    );
};