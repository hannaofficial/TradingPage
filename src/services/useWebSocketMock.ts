'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePrices } from '../store';
import { RootState } from '../store';

export const useWebSocketMock = () => {
    const dispatch = useDispatch();
    const isLive = useSelector((state: RootState) => state.pulse.isLive);

    useEffect(() => {
        if (!isLive) return;

        const interval = setInterval(() => {
            dispatch(updatePrices());
        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, [dispatch, isLive]);
};
