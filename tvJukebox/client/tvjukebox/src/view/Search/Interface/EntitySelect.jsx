import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { Autocomplete, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useLocale } from '@/components/hooks';
import { EnumEntityOptions } from '@/model';

const useStyles = makeStyles({
    option: {
        'fontSize': 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
});

export function EntitySelect({ setEntitySelected }) {
    const [value, setValue] = useState(null);
    const classes = useStyles();
    const { locale } = useLocale();
    const searchLocale = locale?.app?.search;
    const entitiesSearchLocale = searchLocale?.entities;

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setEntitySelected(newValue);
    };

    const options = [
        { value: EnumEntityOptions.Show, code: '📺', label: entitiesSearchLocale.tvShows },
        { value: EnumEntityOptions.Movie, code: '🎞', label: entitiesSearchLocale.movies },
        { value: EnumEntityOptions.Game, code: '🎮', label: entitiesSearchLocale.games },
    ];

    return (
        <Autocomplete
            id="country-select-demo"
            value={value}
            onChange={handleChange}
            options={options}
            classes={{
                option: classes.option,
            }}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <span>{option.code}</span>
                    {option.label}
                </Box>
            )}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={searchLocale.chooseOne}
                    variant="outlined"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',
                    }}
                />
            )}
        />
    );
};
