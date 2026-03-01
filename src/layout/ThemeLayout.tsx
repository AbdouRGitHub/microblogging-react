import {Outlet} from "react-router";
import {useThemeStore} from "../features/theme/stores/themeStore.ts";
import {useEffect} from "react";

function ThemeLayout() {
    const {theme} = useThemeStore();

    useEffect(() => {
        document.documentElement.dataset.theme = theme
    }, [theme])
    
    return (
        <>
            <Outlet/>
        </>
    )
}

export default ThemeLayout;