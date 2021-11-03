import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import { Loading } from '@/components';
import { List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Avatar, Checkbox, Box } from '@mui/material';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const seasonsMock = [
    {
        imgUrls: [
            'https://upload.wikimedia.org/wikipedia/pt/5/5a/Breaking_Bad_Temp1.jpg',
        ],
        number: 1,
        sinopsis: `Após ser diagnosticado com câncer de pulmão enquanto sua esposa Skyler (Anna Gunn) está grávida,
        o professor de química Walter White (Bryan Cranston) bola um plano arriscado para pagar seu tratamento e
        garantir o sustento da família. Com a ajuda de seu ex-aluno Jesse (Aaron Paul), ele passa a fabricar e
        vender metanfetamina, tornando-se um dos grandes traficantes da região.`,
        episodeNumber: 7,
    },
    {
        imgUrls: [
            'https://upload.wikimedia.org/wikipedia/pt/e/e9/Breaking_bad_2_temporada_poster.jpg',
        ],
        number: 2,
        sinopsis: `Quando os revendedores de Jesse se tornam não confiáveis, Walter contrata Saul para conectá-los
        a Gus como novo comprador. Jesse começa a namorar Jane e, por causa do problema com drogas,
        é internado em uma clínica de reabilitação. `,
        episodeNumber: 13,
    },
    {
        imgUrls: [
            'https://upload.wikimedia.org/wikipedia/pt/9/98/Breaking_bad_3_temporada_poster.jpg',
        ],
        number: 3,
        sinopsis: `Gus convida Walter a fabricar metanfetamina em um laboratório clandestino. Enquanto Skyler pede
        o divórcio, as investigações de Hank o levam até Jesse. Walter fica com medo de Gus e orienta Jesse a matá-lo.`,
        episodeNumber: 13,
    },
    {
        imgUrls: [
            'https://upload.wikimedia.org/wikipedia/pt/1/15/Breaking_bad_4_temporada_poster.jpg',
        ],
        number: 4,
        sinopsis: `Gus reforça a segurança no laboratório após a morte de Gale, ao mesmo tempo em que tenta afastar
        Walter de Jesse, com a ajuda de Mike. Skyler aceita a metanfetamina de Walter e começa a trabalhar com
        Saul. Enquanto isso, Walter engana Jesse e convence Hector a detonar uma bomba na mesma sala que Gus. `,
        episodeNumber: 13,
    },
    {
        imgUrls: [
            // eslint-disable-next-line max-len
            'https://static.wikia.nocookie.net/breakingbad/images/d/d3/BB_S5A_poster.jpg',
            // eslint-disable-next-line max-len
            'https://static.wikia.nocookie.net/breakingbad/images/8/88/BB_S5B_poster.jpg',
        ],
        number: 5,
        sinopsis: `Walter, Jesse e Mike iniciam um novo negócio de drogas. Hank tenta provar que Walter é o
        traficante Heisenberg. Walter pretende se render, mas muda de ideia depois que Elliott e Gretchen
        minimizam seu envolvimento na criação de Gray Matter. `,
        episodeNumber: 16,
    },
];

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
                        disablePadding
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
