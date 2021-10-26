import { createMuiTheme } from '@mui/material/styles';
import { defaultThemeConfigs } from './default';

const theme = {
    ...defaultThemeConfigs,
    pallete: {
        type: 'light',
    },
};

export const lightTheme = createMuiTheme({ theme });
