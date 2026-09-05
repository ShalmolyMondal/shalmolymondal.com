'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // Dark is the default. The inline script in app/layout.tsx applies a saved
    // 'light' choice before paint; here we just sync React state to the DOM.
    const [theme, setTheme] = useState<Theme>('dark');

    useEffect(() => {
        setTheme(document.documentElement.classList.contains('light') ? 'light' : 'dark');
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(prev => {
            const next: Theme = prev === 'dark' ? 'light' : 'dark';
            document.documentElement.classList.toggle('dark', next === 'dark');
            document.documentElement.classList.toggle('light', next === 'light');
            try { localStorage.setItem('theme', next); } catch {}
            return next;
        });
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
