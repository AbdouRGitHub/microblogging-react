import {Link} from "react-router";
import "../styles/ProfileHeader.css";
import {format} from "date-fns";
import {fr} from "date-fns/locale";

function ProfileHeader({username, createdAt, avatarUrl}: {
    username: string | undefined,
    createdAt: string | undefined,
    avatarUrl: string | undefined
}) {
    return (
        <>
            <div className="profile-header">
                <div className="profile-banner">
                    <img src="/bluesky.jpg" alt="bluesky"/>
                </div>
                <div className="profile-avatar">
                    <img src={avatarUrl} alt="avatar"/>
                </div>
                <div className="profile-info">
                    <h2>{username}</h2>
                    <span>Membre depuis {createdAt ? format(new Date(createdAt), "dd MMMM yyyy", {locale: fr}) : null}</span>
                </div>
            </div>
            <div className="profile-hub">
                <nav className="profile-nav">
                    <div className="profile-nav-item">
                        <Link to="#">
                            Publications
                        </Link>
                    </div>
                    <div className="profile-nav-item">
                        <Link to="#">
                            Mes réponses
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default ProfileHeader;