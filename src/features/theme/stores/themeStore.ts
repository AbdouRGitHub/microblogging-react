import {create} from "zustand";
import {persist} from "zustand/middleware";

export type Theme = 'light' | 'dark';

export interface ThemeStore {
    theme: Theme
    setTheme: (theme: Theme) => void
    toggleTheme: () => void
}

export const useThemeStore = create<ThemeStore>()(
    persist((set, get) => ({
            theme: "light",
            setTheme: (t: Theme) => set({theme: t}),
            toggleTheme: () => set({theme: get().theme === "dark" ? "light" : "dark"}),
        }),
        {name: "theme"}
    )
);