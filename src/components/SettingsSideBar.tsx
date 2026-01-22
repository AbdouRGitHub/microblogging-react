import styles from "../styles/SettingsSideBar.module.css"
import {NavLink} from "react-router";

function SettingsSideBar() {
    return (
        <>
            <aside className={styles.navSide}>
                <nav className={styles.nav}>
                    <ul className={styles.settingsList}>
                        <NavLink to="" end={true} className={({isActive}) => isActive ? styles.isActive : styles.navItem}>
                                <span>Compte</span>
                        </NavLink>
                        <NavLink to="apparence" end={true}
                                 className={({isActive}) => isActive ? styles.isActive : styles.navItem}>
                            <span>Apparence</span>
                        </NavLink>
                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default SettingsSideBar;