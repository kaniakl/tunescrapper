import React, { useContext } from 'react';
import { LocaleContext } from './LocaleWrapper';

export function useLocale() {
    const { locale, setLocaleCode } = useContext(LocaleContext);

    const changeLocale = (localeCode) => {
        setLocaleCode(localeCode);
    };

    return { locale, changeLocale };
};
