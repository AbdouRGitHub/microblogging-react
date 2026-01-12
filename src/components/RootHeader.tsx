import styles from '../styles/RootHeader.module.css';
import {Bookmark, House} from "lucide-react";
import {NavLink} from "react-router";

function RootHeader() {
    return (
        <>
            <header className={styles.header}>
                <nav className={styles.middle}>
                    <NavLink to="/home" end={true}>
                        {({isActive}) => (
                            <House className={isActive ? styles.isActive : styles.link}/>
                        )}
                    </NavLink>
                    <NavLink to="/home">
                        <Bookmark color="grey"/>
                    </NavLink>
                </nav>
            </header>
        </>
    );
}

export default RootHeader;