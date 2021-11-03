import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { MobileStepper, Button, Grid } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import SwipeableViews from 'react-swipeable-views';
import { StepOneSeasons } from './StepOneSeasons';
import { StepTwoEpisodes } from './StepTwoEpisodes';
import { StepThreeConfirmation } from './StepThreeConfirmation';
import { StepFourPlaylist } from './StepFourPlaylist';

export function SeriesEntity({ searchTerm }) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [enableNext, setEnableNext] = useState(false);
    const [seasonsSelected, setSeasonsSelected] = useState([]);
    const [seasonsAndEpisSelected, setSeasonsAndEpisSelected] = useState([]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setEnableNext(false);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    const toggleLoading = () => {
        setLoading(!loading);
    };

    const toggleNextSeasons = (isOver, values) => {
        setEnableNext(isOver);
        if (isOver) {
            setSeasonsSelected(values);
        }
    };

    const toggleNextEpisodes = (isOver, values) => {
        setEnableNext(isOver);
        if (isOver) {
            setSeasonsAndEpisSelected(values);
        }
    };

    const toggleNextConfirmation = (isOver) => {
        setEnableNext(isOver);
    };

    return (
        <Grid container xs={12}>
            <Grid item xs={12}>
                <MobileStepper
                    variant="progress"
                    steps={4}
                    position="static"
                    activeStep={activeStep}
                    sx={{ maxWidth: '100%', flexGrow: 1 }}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={!enableNext}>
                            {activeStep === 2 ? 'Finish' : activeStep === 3 ? null : 'Next'}
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                    Back
                        </Button>
                    }
                />
            </Grid>
            <Grid item xs={12}>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    <StepOneSeasons
                        isLoading={loading}
                        toggleLoading={toggleLoading}
                        toggleNext={toggleNextSeasons}
                        searchTerm={searchTerm}
                    />
                    <StepTwoEpisodes
                        isLoading={loading}
                        toggleLoading={toggleLoading}
                        toggleNext={toggleNextEpisodes}
                        seasonsSelected={seasonsSelected}
                    />
                    <StepThreeConfirmation
                        isLoading={loading}
                        toggleLoading={toggleLoading}
                        toggleNext={toggleNextConfirmation}
                        seasonsAndEpisSelected={seasonsAndEpisSelected}
                    />
                    <StepFourPlaylist
                        seasonsAndEpisSelected={seasonsAndEpisSelected}
                        isLoading={loading}
                        toggleLoading={toggleLoading}
                    />
                </SwipeableViews>
            </Grid>
        </Grid>
    );
};
