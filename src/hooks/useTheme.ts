import {useThemeStore} from "../stores/themeStore.ts";
import {useEffect} from "react";

export function useTheme() {
    const {theme} = useThemeStore();

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme])
}