import React, { useState, useEffect } from 'react';
import { Loading } from '@/components';

export function StepTwoEpisodes({ isLoading, toggleLoading, toggleNext }) {
    const [isOver, setIsOver] = useState(false);

    if (isOver) {
        toggleNext();
    }

    if (isLoading) {
        return <Loading />;
    }

    return <> Step 2 </>;
};
