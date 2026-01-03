import styles from '../styles/RootHeader.module.css';
import {Bookmark, House} from "lucide-react";
import {Link, NavLink} from "react-router";

function RootHeader() {
    return (
        <>
            <header className={styles.header}>
                <Link to="/home" className={styles.start}>
                    <img
                        src="/ok.png"
                        alt="logo"
                        className={styles.logo}
                    />
                </Link>
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
                <div className={styles.end}>
                    <div>
                        <Link to="/home">
                            <img src="https://picsum.photos/id/237/200/300" className={styles.avatar} alt="avatar"/>
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
}

export default RootHeader;