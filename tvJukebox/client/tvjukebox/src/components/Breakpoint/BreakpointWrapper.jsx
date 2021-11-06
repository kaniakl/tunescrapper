import React, { useState, createContext, useEffect } from 'react';
import { EnumLayoutBreakpoint } from '@/model';

const BreakpointContext = createContext();
const BreakpointConsumer = BreakpointContext.Consumer;

export { BreakpointContext, BreakpointConsumer };
export function BreakpointWrapper({ children }) {
    const findBreakpoint = (width) => {
        if (!width) {
            return EnumLayoutBreakpoint.Desktop;
        }
        const breakpoint = Object.keys(EnumLayoutBreakpoint).find((b) => EnumLayoutBreakpoint[b] >= width);
        if (!breakpoint) {
            return EnumLayoutBreakpoint.Desktop;
        }
        return breakpoint;
    };
    const [currentBreakpointName, setCurrentBreakpointName] = useState(findBreakpoint(window.innerWidth));

    useEffect(() => {
        const newBreakpoint = findBreakpoint(window.innerWidth);
        if (currentBreakpointName !== newBreakpoint) {
            setCurrentBreakpointName(newBreakpoint);
        }
    }, [window.innerWidth]);

    const contextValue = { currentBreakpointName, currentBreakpointValue: EnumLayoutBreakpoint[currentBreakpointName] };

    return (
        <BreakpointContext.Provider value={contextValue} > {children} </BreakpointContext.Provider>
    );
};
