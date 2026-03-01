import styles from "./styles/ThemeSettings.module.css";
import {Moon, Sun} from "lucide-react";
import {type Theme, useThemeStore} from "../theme/stores/themeStore.ts";
import {type SubmitHandler, useForm} from "react-hook-form";

interface ThemeSettingsInputs {
    themeMode: Theme;
}

function ThemeSettings() {
    const {theme, setTheme} = useThemeStore();

    const {
        register,
        handleSubmit,
    } = useForm<ThemeSettingsInputs>({
        mode: "onSubmit",
        defaultValues: {
            themeMode: theme === "light" ? "light" : "dark",
        }
    });

    const onSubmit: SubmitHandler<ThemeSettingsInputs> = ((data: ThemeSettingsInputs) => {
        setTheme(data.themeMode)
    })

    return (
        <>
            <div className={styles.content}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.radioGroup}>
                        <input {...register("themeMode")} type="radio" id="lightMode" value="light"/>
                        <Sun className={styles.icon}/>
                        <label htmlFor="lightMode">Mode clair</label>
                    </div>
                    <div className={styles.radioGroup}>
                        <input {...register("themeMode")} type="radio" id="darkMode" value="dark"/>
                        <Moon className={styles.icon}/>
                        <label htmlFor="darkMode">Mode sombre</label>
                    </div>
                    <div>
                        <input type="submit" value="Sauvegarder" className={styles.submitBtn}/>
                    </div>
                </form>
            </div>
        </>
    )
}


export default ThemeSettings;