import React from 'react';
import { cn } from '@/utils/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'outline' | 'success' | 'danger' | 'warning';
    size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    className,
    variant = 'default',
    size = 'sm',
    ...props
}) => {
    const variants = {
        default: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        outline: 'bg-transparent border-zinc-700 text-zinc-400',
        success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        danger: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    };

    const sizes = {
        sm: 'px-1.5 py-0.5 text-[10px]',
        md: 'px-2.5 py-0.5 text-xs',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
};
