import styles from '../styles/RootHeader.module.css';
import {Settings, House} from "lucide-react";
import {NavLink} from "react-router";
import {userQueries} from "../../features/user/hooks/queries/user.ts";
import {useQuery} from "@tanstack/react-query";
import {faker} from "@faker-js/faker";

function RootHeader() {
    const {data: user} = useQuery(userQueries.me());

    return (
        <>
            <header className={styles.header}>
                <nav className={styles.middle}>
                    <NavLink to="/home" end={true}>
                        {({isActive}) => (
                            <House className={isActive ? styles.isActive : styles.link}/>
                        )}
                    </NavLink>
                    {
                        user && (
                            <>

                                <NavLink to={user.id} end={true}>
                                    <div className={styles.avatarContainer}>
                                        <img src={faker.image.avatar()} alt="avatar" className={styles.avatarImg}/>
                                    </div>
                                </NavLink>
                                <NavLink to="/settings" end={true}>
                                    {({isActive}) => (
                                        <Settings className={isActive ? styles.isActive : styles.link}/>
                                    )}
                                </NavLink>
                            </>
                        )
                    }

                </nav>
            </header>
        </>
    );
}

export default RootHeader;