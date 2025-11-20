// Global Types

export type CardVariant = 'new' | 'final' | 'migrated';

export interface TokenData {
    id: string;
    name: string;
    symbol: string;
    imageUrl: string;
    createdAt: number; // timestamp

    // Market Data
    marketCap: number;
    volume: number;
    fdv: number;
    transactions: number;

    // Bonding Curve / Status
    status: CardVariant;
    bondingProgress?: number; // 0-100

    // Social/Security
    holders: number;
    top10Holders?: number; // Percentage
    hasAudit: boolean;
    isSafe: boolean;

    // Metrics for pills
    badges: {
        label: string;
        value?: string;
        type: 'success' | 'danger' | 'neutral' | 'warning' | 'info';
        icon?: 'shield' | 'lock' | 'user' | 'rocket';
    }[];

    priceChange5m: number;
    txCount: number;
}

export interface PulseState {
    items: TokenData[];
    isLive: boolean;
}
