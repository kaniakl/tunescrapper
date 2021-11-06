import { EnumLayoutBreakpoint } from '@/model';
import { green, lightBlue } from '@mui/material/colors';

export const defaultThemeConfigs = {
    breakpoints: {
        xs: EnumLayoutBreakpoint.Xs,
        sm: EnumLayoutBreakpoint.Sm,
        md: EnumLayoutBreakpoint.Md,
        lg: EnumLayoutBreakpoint.Lg,
        xl: EnumLayoutBreakpoint.Xl,
        tablet: EnumLayoutBreakpoint.Tablet,
        laptop: EnumLayoutBreakpoint.Laptop,
        desktop: EnumLayoutBreakpoint.Desktop,
    },
    palette: {
        primary: {
            main: green[700],
        },
        secondary: {
            main: lightBlue[500],
        },
    },
};
