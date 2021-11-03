import React from 'react';
import { Loading } from '@/components';

export function StepFourPlaylist({ isLoading, toggleLoading }) {
    if (isLoading) {
        return <Loading />;
    }

    return <> Step 4 </>;
};
