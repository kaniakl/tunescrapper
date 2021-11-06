import { createMuiTheme } from '@mui/material/styles';
import { defaultThemeConfigs } from './default';

const theme = {
    ...defaultThemeConfigs,
};

theme.palette.type = 'light';

export const lightTheme = createMuiTheme({ theme });
