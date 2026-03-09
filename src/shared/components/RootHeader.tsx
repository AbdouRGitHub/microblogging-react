import styles from '../styles/RootHeader.module.css';
import {Settings, House, Bookmark, LogOut} from "lucide-react";
import {NavLink, useNavigate} from "react-router";
import {userQueries} from "../../features/user/hooks/queries/user.ts";
import {useQuery} from "@tanstack/react-query";
import {faker} from "@faker-js/faker";
import {signOut} from "../../features/auth/services/auth.service.ts";

function RootHeader() {
    const {data: user} = useQuery(userQueries.me());
    const navigate = useNavigate();
    const logOut = async () => {
        await signOut();
        navigate("/");
    }

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
                                <NavLink to={`bookmarks`} end={true}>
                                    {({isActive}) => (
                                        <Bookmark className={isActive ? styles.isActive : styles.link}/>
                                    )}
                                </NavLink>
                                <LogOut className={styles.link} onClick={logOut}/>
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