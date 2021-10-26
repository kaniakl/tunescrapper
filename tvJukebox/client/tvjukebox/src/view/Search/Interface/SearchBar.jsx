import React, { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import { useLocale } from '@/components/hooks';
import SearchIcon from '@mui/icons-material/Search';

export function SearchBar({ setSearchTerm }) {
    const [value, setValue] = useState('');
    const { locale } = useLocale();
    const searchLocale = locale?.app?.search;

    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        setSearchTerm(newValue);
    };

    return (
        <TextField
            id="content-search"
            label={searchLocale.typeToSearch}
            type="search"
            value={value}
            onChange={handleChange}
            fullWidth
            InputProps={{
                startAdornment: (
                    <IconButton aria-label="search">
                        <SearchIcon />
                    </IconButton>
                ),
            }}
        />
    );
};
