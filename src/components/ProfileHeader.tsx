import {NavLink, useParams} from "react-router";
import styles from "../styles/ProfileHeader.module.css";
import {format} from "date-fns";
import {fr} from "date-fns/locale";

function ProfileHeader({username, createdAt, avatarUrl}: {
    username: string | undefined,
    createdAt: string | undefined,
    avatarUrl: string | undefined
}) {
    const {id} = useParams();
    return (
        <>
            <div className={styles.header}>
                <div className={styles.banner}>
                    <img src="/bluesky.jpg" className={styles.bannerImg} alt="bluesky"/>
                </div>
                <div className={styles.avatar}>
                    <img src={avatarUrl} className={styles.avatarImg} alt="avatar"/>
                </div>
                <div className={styles.info}>
                    <h2>{username}</h2>
                    <span>Membre depuis {createdAt ? format(new Date(createdAt), "dd MMMM yyyy", {locale: fr}) : null}</span>
                </div>
            </div>
            <div className={styles.hub}>
                <nav className={styles.nav}>
                    <div className={styles.navItem}>
                        <NavLink to={`/${id}`} end={true} className={({isActive}) => (
                            isActive ? styles.isActive :
                                styles.link
                        )}>
                            Publications
                        </NavLink>
                    </div>
                    <div className={styles.navItem}>
                        <NavLink to={`/${id}/replies`} end={true} className={({isActive}) => (
                            isActive ? styles.isActive :
                                styles.link
                        )}>
                            Mes réponses
                        </NavLink>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default ProfileHeader;