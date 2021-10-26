import React from 'react';
import { EnumEntityOptions } from '@/model';
import { GamesEntity, MoviesEntity, SeriesEntity } from './Steps';

export function Results({ entitySelected, searchTerm }) {
    if (!entitySelected || !searchTerm) {
        return null;
    }

    const entityType = entitySelected.value;

    switch (entityType) {
    case EnumEntityOptions.Show:

        return <SeriesEntity />;
    case EnumEntityOptions.Movie:

        return <MoviesEntity />;
    case EnumEntityOptions.Game:

        return <GamesEntity />;

    default:
        return null;
    }
};
