import styles from "../styles/SettingsLayout.module.css";
import {Outlet} from "react-router";
import SettingsSideBar from "../components/SettingsSideBar.tsx";

function SettingsLayout() {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.wrap}>
                    <SettingsSideBar/>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default SettingsLayout;