import styles from '../styles/RootHeader.module.css';
import {Bookmark, House} from "lucide-react";
import {Link, NavLink} from "react-router";

function RootHeader() {
    return (
        <>
            <header className={styles.header}>
                <Link to="/" className={styles.start}>
                    <img
                        src="/ok.png"
                        alt="logo"
                        className={styles.logo}
                    />
                </Link>
                <nav className={styles.middle}>
                    <NavLink to="/" end={true}>
                        {({isActive}) => (
                            <House className={isActive ? styles.isActive : styles.link}/>
                        )}
                    </NavLink>
                    <NavLink to="/">
                        <Bookmark color="grey"/>
                    </NavLink>
                </nav>
                <div className={styles.end}>
                    <div>
                        <Link to="/">
                            <img src="https://picsum.photos/id/237/200/300" className={styles.avatar} alt="avatar"/>
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
}

export default RootHeader;