import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Search } from '@/view/Search/Search';
import { Results } from '@/view/Search/Results';
import { Section } from '@/view/Layout/Section';

export function SearchView() {
    const [searchTerm, setSearchTerm] = useState('');
    const [entitySelected, setEntitySelected] = useState('');

    return (
        <>
            <Section>
                <Grid container xs={12}>
                    <Search setSearchTerm={setSearchTerm} setEntitySelected={setEntitySelected} />
                </Grid>
            </Section>
            <Section>
                <Results entitySelected={entitySelected} searchTerm={searchTerm} />
            </Section>
        </>
    );
};
