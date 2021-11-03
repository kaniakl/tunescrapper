import React, { useState } from 'react';
import { SearchBar } from './SearchBar';
import { EntitySelect } from './EntitySelect';
import { Grid } from '@mui/material';

export function Interface({ setSearchTerm, setEntitySelected }) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <EntitySelect setEntitySelected={setEntitySelected} />
            </Grid>
            <Grid item xs={10}>
                <SearchBar setSearchTerm={setSearchTerm} />
            </Grid>
        </Grid>
    );
};
