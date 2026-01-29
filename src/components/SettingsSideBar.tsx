import styles from "../styles/SettingsSideBar.module.css"
import {NavLink} from "react-router";
import {Palette, SquareUserRound} from "lucide-react";

function SettingsSideBar() {
    return (
        <>
            <aside className={styles.navSide}>
                <nav className={styles.nav}>
                    <ul className={styles.settingsList}>
                        <NavLink to="" end={true}
                                 className={({isActive}) => isActive ? `${styles.isActive} ${styles.navItem}` : styles.navItem}>
                            <SquareUserRound className={styles.settingsIcon}/>
                            Compte
                        </NavLink>
                        <NavLink to="apparence" end={true}
                                 className={({isActive}) => isActive ? `${styles.isActive} ${styles.navItem}` : styles.navItem}>
                            <Palette className={styles.settingsIcon}/>
                            Apparence
                        </NavLink>
                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default SettingsSideBar;