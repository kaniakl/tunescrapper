/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Loading } from '@/components';
import { useBreakpoint } from '@/components/hooks';
import { Section } from '@/view/Layout/Section';
import { styled, useTheme } from '@mui/material/styles';
import { isEmpty } from 'util/ObjectUtil';
import { ImageList, ImageListItem, Typography, ImageListItemBar, IconButton, Box, Collapse } from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { EnumLayoutBreakpoint } from 'model';
import { ThreeMp } from '@mui/icons-material';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    'border': `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    'backgroundColor':
    theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    'flexDirection': 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const CustomImageListItemBar = styled(ImageListItemBar)({
    'flexDirection': 'column-reverse',
    'background': 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    'alignItems': 'flex-start',
    '& .MuiImageListItemBar-titleWrap': {
        alignSelf: 'center',
    },
});

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const CustomCollapse = styled(Collapse, {
    shouldForwardProp: (prop) => prop !== 'maxHeightContent',
})(({ maxHeightContent, theme }) => {
    console.log('\n#############theme.pallete.primary NO COMP: ', theme.palette.primary);
    return ({
        'height': '0px !important',
        '& .MuiCollapse-wrapper': {
            'overflowX': 'auto',
            'height': maxHeightContent ?? '100%',
            '::-webkit-scrollbar': {
                width: '7px',
            },
            '::-webkit-scrollbar-track': {
                backgroundColor: theme.palette.primary.light,
                borderRadius: '100px',
            },
            '::-webkit-scrollbar-thumb': {
                border: '2px solid transparent',
                borderRadius: '100px',
                backgroundColor: theme.palette.primary.main,
                backgroundClip: 'content-box',
            },
            '::-webkit-scrollbar-thumb:hover': {
                background: theme.palette.primary.dark,
            },
        },
    });
});


function InfoCard({ show, rowHeight }) {
    return (
        <CustomCollapse maxHeightContent={rowHeight} in={show} timeout="auto" unmountOnExit>
            <Box sx={{ backgroundColor: 'red' }} >
                <Typography paragraph>
                Phasellus in velit dignissim, tristique purus id, tristique metus. Morbi non turpis euismod, vehicula orci ut, placerat ex. Cras ex metus, gravida sit amet tortor vitae, faucibus efficitur dui. Aliquam ac enim elementum, tristique ligula eu, viverra ex. Aenean aliquam ex nec sapien scelerisque posuere. Mauris id dolor lorem. Aliquam vestibulum neque vitae urna consectetur venenatis. Sed tortor nisl, gravida non tempor in, consectetur quis velit. Praesent pellentesque purus ac lectus tempor, finibus hendrerit leo sodales. Suspendisse a cursus dui, fringilla accumsan nulla. Duis scelerisque id nunc in posuere. Integer elementum rutrum est efficitur fringilla.
                </Typography>
            </Box>
        </CustomCollapse>
    );
}

function EpisodeCards({ episodes }) {
    const { currentBreakpointValue } = useBreakpoint();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const colsBySize = currentBreakpointValue <= EnumLayoutBreakpoint.Medium
        ? 4
        : currentBreakpointValue <= EnumLayoutBreakpoint.Desktop
            ? 6
            : 9;

    const rowHeight = 164;

    return (
        <ImageList sx={{ width: '100%', height: 450 }} cols={colsBySize} rowHeight={rowHeight}>
            {episodes.map((epi) => {
                // return <ImageListItem key={epi.img}>
                //     <img
                //         src={`${epi.img}?w=164&h=164&fit=crop&auto=format`}
                //         srcSet={`${epi.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                //         alt={epi.title}
                //         loading="lazy"
                //     />
                // </ImageListItem>;
                return (
                    <ImageListItem key={epi}>
                        <InfoCard show={open} rowHeight={rowHeight} />
                        <img
                            src="https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=164&h=164&fit=crop&auto=format"
                            alt='teste'
                            loading="lazy"
                        />
                        <CustomImageListItemBar
                            position='top'
                            actionIcon={
                                <div className='confirmationImageToolbar'>
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label='info about blabla'
                                        onClick={handleClickOpen}
                                    >
                                        <InfoIcon color='info' />
                                    </IconButton>
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label='remove epi'
                                    >
                                        <HighlightOffIcon color='error' />
                                    </IconButton>

                                </div>
                            }
                            title='Episode 0'
                        >
                        </CustomImageListItemBar>
                    </ImageListItem>
                );
            })}
        </ImageList>
    );
}

export function StepThreeConfirmation({ seasonsAndEpisSelected, isLoading, toggleLoading, toggleNext }) {
    const [isOver, setIsOver] = useState(false);
    const { currentBreakpointValue } = useBreakpoint();
    const [expanded, setExpanded] = React.useState('panel1');

    const selection = {};
    Object.keys(seasonsAndEpisSelected).forEach((season) => {
        if (seasonsAndEpisSelected[season]?.length !== 0) {
            selection[season] = seasonsAndEpisSelected[season];
        }
    });

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    if (isOver) {
        toggleNext();
    }

    if (isLoading) {
        return <Loading />;
    }

    if (isEmpty(selection)) {
        return <> Choose Something Component </>;
    }

    const padding = currentBreakpointValue >= EnumLayoutBreakpoint.MediumLarge ? 4 : 1;

    return (
        <Section multiplyHorizontal={padding}>
            {Object.keys(selection).map((season) => {
                const ariaControls = `panel${season}d-content`;
                const id = `panel${season}d-header`;
                return (
                    <Accordion
                        key={`accordeon-${season}`}
                        expanded={expanded === `panel${season}`}
                        onChange={handleChange(`panel${season}`)}>
                        <AccordionSummary aria-controls={ariaControls} id={id}>
                            <Typography>Season #{season}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <EpisodeCards episodes={selection[season]} />
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </Section>
    );
};
