import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenData, CardVariant } from '@/types';
import { getRandomInt } from '@/utils/utils';

interface PulseState {
    items: TokenData[];
    isLive: boolean;
}

const NAMES = ['BARRON', 'JailLawrence', 'VictimA', 'MOON2', 'Pumpdrop', 'MTXMAX', 'chimp', 'Tesla AI', 'MetaMask', 'Jem', 'T2GAI', 'NICHE', 'NVIDIA', 'LIFE'];
const SYMBOLS = ['Fed Chair', 'Reed', 'Vic', 'BOOTS', 'Pump', 'Multi-Tx', 'chimp', 'AI', 'MASK', 'Jem', 'GameAI', 'Memes', 'NVIDIA', 'Feels'];

const generateMockData = (count: number, variant: CardVariant): TokenData[] => {
    return Array.from({ length: count }).map((_, i) => {
        const isPositive = Math.random() > 0.4;
        const nameIndex = getRandomInt(0, NAMES.length - 1);

        // Generate variant specific badges
        const badges = [];
        if (variant === 'new') {
            badges.push({ label: 'DS 3mo', type: 'info' });
            badges.push({ label: '1%', type: 'success', value: '1%' });
            badges.push({ label: '0%', type: 'success', value: '0%' });
            badges.push({ label: '0%', type: 'success', value: '0%' });
        } else if (variant === 'final') {
            badges.push({ label: '44%', type: 'danger', value: '44%' }); // Bonding curve
            badges.push({ label: '0% 6mo', type: 'success', value: '0%' });
            badges.push({ label: '69%', type: 'danger', value: '69%' });
        } else {
            badges.push({ label: '10%', type: 'success' });
            badges.push({ label: 'DS 2mo', type: 'info' });
            badges.push({ label: '50%', type: 'danger' });
            badges.push({ label: '50%', type: 'danger' });
        }

        return {
            id: `${variant}-${i}-${Date.now()}`,
            name: NAMES[nameIndex] + (i > 0 ? ` ${i}` : ''),
            symbol: SYMBOLS[nameIndex],
            imageUrl: `https://picsum.photos/seed/${variant}${i}${Date.now()}/100/100`,
            createdAt: Date.now() - getRandomInt(5000, 86400000),
            marketCap: variant === 'migrated' ? getRandomInt(10000, 100000) : getRandomInt(1000, 5000),
            volume: getRandomInt(100, 5000),
            fdv: getRandomInt(10000, 500000),
            transactions: getRandomInt(10, 200),
            status: variant,
            bondingProgress: getRandomInt(0, 100),
            holders: getRandomInt(5, 500),
            hasAudit: Math.random() > 0.5,
            isSafe: Math.random() > 0.2,
            badges: badges as any,
            priceChange5m: (Math.random() - 0.5) * 10,
            txCount: getRandomInt(1, 50),
        };
    });
};

const initialState: PulseState = {
    items: [
        ...generateMockData(20, 'new'),
        ...generateMockData(20, 'final'),
        ...generateMockData(20, 'migrated'),
    ],
    isLive: true,
};

const pulseSlice = createSlice({
    name: 'pulse',
    initialState,
    reducers: {
        updatePrices: (state) => {
            state.items.forEach(token => {
                // Random walk
                const change = (Math.random() - 0.49) * (token.marketCap * 0.02);
                token.marketCap = Math.max(500, token.marketCap + change);
                token.volume += Math.random() > 0.7 ? getRandomInt(10, 100) : 0;
                token.txCount = Math.min(50, Math.max(1, token.txCount + getRandomInt(-1, 2)));

                // Occasionally add a new transaction badge or update time
            });
        },
        addToken: (state, action: PayloadAction<TokenData>) => {
            state.items.unshift(action.payload);
            if (state.items.length > 150) state.items.pop();
        },
    },
});

export const { updatePrices, addToken } = pulseSlice.actions;

// --- Store ---
export const store = configureStore({
    reducer: {
        pulse: pulseSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;