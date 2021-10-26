import React, { useState, createContext } from 'react';
import { enUs, ptBr } from '@/util/locale';

const locales = { us: enUs, br: ptBr };
const LocaleContext = createContext();
const LocaleConsumer = LocaleContext.Consumer;

export { LocaleContext, LocaleConsumer };
export function LocaleWrapper({ children }) {
    const [localeCode, setLocaleCode] = useState('br');

    const getLocale = (locale) => locales[locale] ?? locales['br'];

    const contextValue = { setLocaleCode, localeCode, locale: getLocale(localeCode) };

    return (
        <LocaleContext.Provider value={contextValue} > {children} </LocaleContext.Provider>
    );
};
