import { createMuiTheme } from '@mui/material/styles';
import { defaultThemeConfigs } from './default';

const theme = {
    ...defaultThemeConfigs,
};

theme.palette.type = 'dark';

export const darkTheme = createMuiTheme({ theme });
