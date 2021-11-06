import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import { Loading } from '@/components';
import { List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Avatar, Checkbox, Box } from '@mui/material';
import { autoPlay } from 'react-swipeable-views-utils';
import { seasonsMock } from './mockSeries';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function CarouselSeasonImages({ imgs }) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    if (!imgs) {
        return null;
    }

    return (
        <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            style={{ width: 180, height: 255 }}
            enableMouseEvents
        >
            {imgs?.map((img, indexImg) => (
                <div key={indexImg}>
                    {Math.abs(activeStep - indexImg) <= 2 ? (
                        <Box
                            component="img"
                            sx={{
                                height: 255,
                                display: 'block',
                                overflow: 'hidden',
                                width: '100%',
                            }}
                            src={img}
                        />
                    ) : null}
                </div>
            ))}
        </AutoPlaySwipeableViews>
    );
}

export function StepOneSeasons({ searchTerm, isLoading, toggleLoading, toggleNext }) {
    const [seasons, setSeasons] = useState(seasonsMock);
    const [checked, setChecked] = useState([]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (checked.length === 0) {
        toggleNext(false, checked);
    } else {
        toggleNext(true, checked);
    }

    return (
        <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {seasons.map((season, index) => {
                const labelId = `checkbox-list-secondary-label-${season.number}`;
                return (
                    <ListItem
                        key={season.number}
                        secondaryAction={
                            <Checkbox
                                edge="end"
                                onChange={handleToggle(index)}
                                checked={checked.indexOf(index) !== -1}
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        }
                    >
                        <ListItemButton>
                            <ListItemAvatar>
                                <CarouselSeasonImages imgs={season.imgUrls} />
                            </ListItemAvatar>
                            <ListItemText
                                id={labelId}
                                primary={`Season ${season.number} - Número de episódios: ${season.episodeNumber}`}
                                secondary={season.sinopsis}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
};
