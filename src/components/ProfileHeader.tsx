import {Link} from "react-router";
import "../styles/ProfileHeader.css";

function ProfileHeader({username, avatarUrl}: { username: string | undefined, avatarUrl: string | undefined }) {
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
                    <span>Membre depuis le 1er juillet 2021</span>
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