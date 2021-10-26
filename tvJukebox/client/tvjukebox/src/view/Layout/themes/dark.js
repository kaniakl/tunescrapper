import { createMuiTheme } from '@mui/material/styles';
import { defaultThemeConfigs } from './default';

const theme = {
    ...defaultThemeConfigs,
    pallete: {
        type: 'dark',
    },
};

export const darkTheme = createMuiTheme({ theme });
