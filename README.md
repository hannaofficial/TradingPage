# Axiom Pulse Replica

A high-performance, real-time token dashboard clone built with Next.js, Tailwind CSS, and Redux. This project replicates the aesthetic and functionality of a live trading monitor, featuring simulated real-time data updates, complex animations, and optimized rendering.

## 🧠 Complex Logic Documentation

### 1. Simulated Real-Time Token Generation ("New Pairs")
- **Logic**: The `PulseColumn` component simulates the arrival of new tokens using a randomized interval (5-20 seconds).
- **Implementation**: 
  - A `useEffect` hook manages the interval.
  - To prevent memory leaks and stale closures, we use a `useRef` to access the latest token list without triggering re-renders.
  - **Duplicate Prevention**: A Set-based check ensures that tokens with the same ID or name don't appear twice in the "New Pairs" column.
  - **Recycling**: When the list of "new" tokens is exhausted, the system intelligently recycles older tokens to maintain the illusion of infinite flow.

### 2. Ephemeral State & Animations
- **Conversion Effect**: The "Final Stretch" column features a "conversion" animation where a token simulates graduating to a new status.
  - **State**: This is managed locally within `PulseColumn` using a `convertingIds` set.
  - **Animation**: `TokenCard` listens for this state and renders a special overlay (shimmer effect + animated arrows) instead of the standard buy button.
  - **Sorting**: Tokens undergoing conversion are prioritized and moved to the top of the list using a custom sort function in `PulseColumn`.

### 3. Centralized Data Simulation
- **Problem**: Updating `holders` and `top10Holders` for 100+ tokens individually caused massive CPU overhead due to hundreds of active `setInterval` timers.
- **Solution**: Moved the simulation logic to the Redux store (`src/store/index.ts`).
  - A single global interval updates the state of all tokens in batches.
  - Components subscribe to these updates, significantly reducing the main thread load.

## 🎨 Design Choices

### 1. "Pulse" Aesthetic
- **Theme**: A deep dark mode (`bg-black`, `bg-zinc-900`) with high-contrast neon accents (Emerald for new/safe, Blue for migrated, Rose/Amber for alerts).
- **Visual Hierarchy**: 
  - Important data (Market Cap, Volume) is highlighted with brighter colors and larger fonts.
  - Secondary data (Time ago, transaction count) is muted (`text-zinc-500`).
- **Animations**: Subtle micro-interactions (hover states, shimmers, pulses) make the interface feel "alive" without overwhelming the user.

### 2. Compact Layout
- **Footer**: Designed to be unobtrusive. It is hidden on mobile devices (`hidden md:block`) to maximize screen real estate for the token feed. On desktop, it uses a compact `h-7` height with scaled-down icons (12px) and text (10px).
- **Token Card**: Densely packed information (Image, ID, Name, Symbol, Badges, Metrics, Graph) fits within a 100px height, using flexbox for precise alignment.

## ⚡ Performance Optimizations

### 1. Aggressive Memoization
- **`React.memo`**: The `TokenCard` component is wrapped in `React.memo` with a custom comparator function. It only re-renders if specific props change (e.g., `marketCap`, `holders`, `conversionActive`). This prevents wasted renders when unrelated parent state updates.
- **`useMemo`**: Expensive array operations (filtering tokens by status, sorting by market cap) in `PulseBoard` and `PulseColumn` are memoized. This ensures these calculations only run when the raw data actually changes.

### 2. Dynamic Intervals
- **TimeAgo Optimization**: The "Time Ago" counter (e.g., "5m ago") normally updates every second.
- **Optimization**: We implemented a dynamic interval:
  - **< 1 minute old**: Updates every **1 second**.
  - **> 1 minute old**: Updates every **60 seconds**.
- **Impact**: This reduces the number of active timers for older tokens by 98%, a massive win for long-running sessions.

### 3. Asset Optimization
- **Next.js Image**: Used `next/image` for automatic optimization of token avatars.
- **SVG Icons**: Replaced heavy image assets with lightweight SVG icons (`lucide-react`) where possible.
- **Error Handling**: Implemented robust `onError` handlers for images. If a token image or the Solana logo fails to load, the UI gracefully falls back to a vector icon, preventing layout shifts or broken image icons.

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
