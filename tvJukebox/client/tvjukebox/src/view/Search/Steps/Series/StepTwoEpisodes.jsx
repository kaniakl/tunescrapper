import React, { useState, useEffect } from 'react';
import { Loading } from '@/components';
import { List, ListItem, ListItemText, ListSubheader, Checkbox } from '@mui/material';
import { mockEpisodes } from './mockEpisodes';

function EpisodesContent({ seasonNumber, episodes, setEpis }) {
    const [checked, setChecked] = useState([]);
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setEpis(seasonNumber, newChecked.map((s) => s + 1));
        setChecked(newChecked);
    };
    return (
        <>
            <ListSubheader>{`Season ${seasonNumber}`}</ListSubheader>
            {(episodes ?? []).map((item, index) => {
                const epiNumber = index + 1;
                const labelId = `checkbox-list-secondary-label-${seasonNumber}-${epiNumber}`;
                return (
                    <ListItem
                        key={`item-${seasonNumber}-${epiNumber}-${item}`}
                        secondaryAction={
                            <Checkbox
                                edge="end"
                                onChange={handleToggle(index)}
                                checked={checked.indexOf(index) !== -1}
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        }
                    >
                        <ListItemText
                            primary={`Episode ${epiNumber} - ${item.name}`}
                            secondary={item.sinopsis}
                        />
                    </ListItem>
                );
            })}
        </>
    );
}

export function StepTwoEpisodes({ seasonsSelected, isLoading, toggleLoading, toggleNext }) {
    const seasonsArray = seasonsSelected.map((s) => s + 1).sort((a, b) => a - b);
    const seasonsAndEpisStructure = { ...seasonsArray.map((s) =>{
        return {
            [s]: [],
        };
    }) };
    const [seasonsAndEpisSelected, setSeasonsAndEpisSelected] = useState(seasonsAndEpisStructure);
    const [isOver, setIsOver] = useState(false);

    const setEpis = (seasonNumber, values) => {
        const modified = seasonsAndEpisSelected;
        modified[seasonNumber] = values.sort((a, b) => a - b);
        setSeasonsAndEpisSelected(modified);
    };

    toggleNext(true, seasonsAndEpisSelected);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <List
            sx={{
                'width': '100%',
                'bgcolor': 'background.paper',
                'position': 'relative',
                'overflow': 'auto',
                'maxHeight': 300,
                '& ul': { padding: 0 },
            }}
            subheader={<li />}
        >
            {seasonsArray.map((seasonNumber) => (
                <li key={`section-${seasonNumber}`}>
                    <ul>
                        <EpisodesContent
                            seasonNumber={seasonNumber}
                            episodes={mockEpisodes[seasonNumber]}
                            setEpis={setEpis}
                        />
                    </ul>
                </li>
            ))}
        </List>
    );
};
