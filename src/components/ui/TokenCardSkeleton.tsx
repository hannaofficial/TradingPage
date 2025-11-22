// components/TokenCardSkeleton.tsx
"use client";

import React from "react";

export default function TokenCardSkeleton() {
    return (
        <div className="group relative flex items-center gap-3 px-3 py-3 w-full h-[100px] bg-transparent transition-colors">

            {/* Left image skeleton */}
            <div className="flex-shrink-0">
                <div className="h-[56px] w-[56px] rounded-md bg-zinc-800 animate-pulse" />
                <div className="mt-2 h-[10px] w-[56px] rounded bg-zinc-800 animate-pulse" />
            </div>

            {/* Center block */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">

                {/* Title line group */}
                <div className="flex items-center gap-2 min-w-0">
                    <div className="h-4 w-52 rounded bg-zinc-800 animate-pulse" />
                    <div className="h-3 w-24 rounded bg-zinc-800/90 animate-pulse ml-2" />
                </div>

                {/* Small dots row */}
                <div className="flex items-center gap-2 text-zinc-500 min-w-0 mt-1">
                    <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-zinc-800 animate-pulse" />
                        <div className="h-2.5 w-2.5 rounded-full bg-zinc-800 animate-pulse" />
                        <div className="h-2.5 w-2.5 rounded-full bg-zinc-800 animate-pulse" />
                        <div className="h-2.5 w-2.5 rounded-full bg-zinc-800 animate-pulse" />
                    </div>

                    <div className="ml-2 h-3 w-12 rounded bg-zinc-800 animate-pulse" />
                </div>

                {/* Pills / badges row */}
                <div className="flex items-center gap-2 mt-2">
                    <div className="h-6 w-14 rounded-full bg-zinc-800 animate-pulse" />
                    <div className="h-6 w-10 rounded-full bg-zinc-800 animate-pulse" />
                    <div className="h-6 w-16 rounded-full bg-zinc-800 animate-pulse" />
                    <div className="h-6 w-12 rounded-full bg-zinc-800 animate-pulse" />
                </div>
            </div>

            {/* Right metrics block */}
            <div className="flex flex-col items-end justify-between gap-1 w-[92px] flex-shrink-0 ml-1 py-0.5">

                <div className="w-full text-right">
                    <div className="flex items-baseline justify-end gap-2">
                        <div className="h-4 w-20 rounded bg-zinc-800 animate-pulse" />
                    </div>
                </div>

                <div className="w-full text-right">
                    <div className="flex items-baseline justify-end gap-2">
                        <div className="h-4 w-20 rounded bg-zinc-800 animate-pulse" />
                    </div>
                </div>

            </div>
        </div>
    );
}
