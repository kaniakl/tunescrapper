import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Search } from '@/view/Search/Search';
import { Results } from '@/view/Search/Results';

export function SearchView() {
    const [searchTerm, setSearchTerm] = useState('');
    const [entitySelected, setEntitySelected] = useState('');

    return (
        <>
            <Grid className='App-search' container xs={12}>
                <Search setSearchTerm={setSearchTerm} setEntitySelected={setEntitySelected} />
            </Grid>
            <Results entitySelected={entitySelected} searchTerm={searchTerm} />
        </>
    );
};
