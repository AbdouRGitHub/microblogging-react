import styles from '../styles/RootHeader.module.css';
import {Bookmark, House} from "lucide-react";
import {NavLink} from "react-router";
import {userQueries} from "../hooks/queries/user.ts";
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
                            <NavLink to={user.id} end={true}>
                                <div className={styles.avatarContainer}>
                                    <img src={faker.image.avatar()} alt="avatar" className={styles.avatarImg}/>
                                </div>
                            </NavLink>
                        )
                    }
                    <NavLink to="/home">
                        <Bookmark color="grey"/>
                    </NavLink>
                </nav>
            </header>
        </>
    );
}

export default RootHeader;