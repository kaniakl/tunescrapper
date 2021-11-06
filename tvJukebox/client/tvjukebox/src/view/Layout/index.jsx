import React, { useState } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { darkTheme, lightTheme } from './themes';
import { ThemeProvider } from '@mui/material/styles';

import '@/static/css/App.css';
import '@/static/css/index.css';

export function Layout({ children }) {
    const [isDark, setIsDark] = useState(false);
    console.log('\n#############lightTheme: ', lightTheme.palette.primary);

    return (
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            <Header/>
            {children}
            <Footer/>
        </ThemeProvider>
    );
};
