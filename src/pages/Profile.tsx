import "../styles/Profile.css"
import {Link, useParams} from "react-router";
import type {User} from "../models/user.model.ts";
import {usersMock} from "../mocks/user.mock.ts";
import '../styles/Profile.css';

function Profile() {
    const {id} = useParams();
    console.log("id: ", id);
    const user = usersMock.find((u: User) => u.id === id);
    console.log(user);
    return (
        <>
            <main className="content">
                <div className="Profile-wrap-content">
                    <div className="profile-header">
                        <div className="profile-banner">
                            <img src="/bluesky.jpg" alt="bluesky"/>
                        </div>
                        <div className="profile-avatar">
                            <img src={user?.avatarUrl} alt="avatar"/>
                        </div>
                        <div className="profile-info">
                            <h2>{user?.username}</h2>
                            <span>Membre depuis le 1er juillet 2021</span>
                        </div>
                    </div>
                    <div className="profile-hub">
                        <div className="profile-nav">
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
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Profile;