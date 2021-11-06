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
    const [enableNextP1, setEnableNextP1] = useState(false);
    const [enableNextP2, setEnableNextP2] = useState(false);
    const [enableNextP3, setEnableNextP3] = useState(false);
    const [seasonsSelected, setSeasonsSelected] = useState([]);
    const [seasonsAndEpisSelected, setSeasonsAndEpisSelected] = useState([]);

    const phaseSetters = {
        0: (state) => {
            setEnableNextP1(state);
        },
        1: (state) => {
            setEnableNextP2(state);
        },
        2: (state) => {
            setEnableNextP3(state);
        },
    };

    const handleNext = () => {
        const next = activeStep + 1;
        setActiveStep(next);
        if (phaseSetters[next]) {
            phaseSetters[next](false);
        }
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
        if (isOver !== enableNextP1) {
            setEnableNextP1(isOver);
        }
        if (isOver) {
            setSeasonsSelected(values);
        }
    };

    const toggleNextEpisodes = (isOver, values) => {
        if (isOver !== enableNextP2) {
            setEnableNextP2(isOver);
        }
        if (isOver) {
            setSeasonsAndEpisSelected(values);
        }
    };

    const toggleNextConfirmation = (isOver) => {
        if (isOver !== enableNextP3) {
            setEnableNextP3(isOver);
        }
    };

    const isDisabled = () => {
        if (activeStep === 0) {
            return !enableNextP1;
        }
        if (activeStep === 1) {
            return !enableNextP2;
        }
        if (activeStep === 2) {
            return !enableNextP3;
        }
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
                        <Button size="small" onClick={handleNext} disabled={isDisabled()}>
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
