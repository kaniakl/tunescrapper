import React, { useContext } from 'react';
import { BreakpointContext } from './BreakpointWrapper';

export function useBreakpoint() {
    const { currentBreakpointName, currentBreakpointValue } = useContext(BreakpointContext);

    return { currentBreakpointName, currentBreakpointValue };
};
