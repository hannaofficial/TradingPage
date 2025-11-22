'use client';

import React from 'react';
import { Star, Settings, ChartLine } from 'lucide-react';

export default function HeaderStrip() {
    return (
        <div className="hidden md:flex w-full border-b border-zinc-900">

            <div className="w-full md:px-7">
                <div className="flex items-center divide-x divide-zinc-800">

                    {/* Left group */}
                    <div className="flex items-center gap-2 pr-2">

                        <button className="p-1 rounded-md hover:bg-zinc-800/60 text-zinc-400 transition">
                            <Settings size={12} />
                        </button>
                    </div>

                    {/* Right group */}
                    <div className="flex items-center pl-2">
                        <button className="p-1 rounded-md hover:bg-zinc-800/60 text-zinc-400 transition">
                            <Star size={12} />
                        </button>
                        <button className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-zinc-800 text-zinc-400 transition">
                            <ChartLine size={12} />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
