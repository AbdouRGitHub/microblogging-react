import "../styles/Profile.css";
import {useParams} from "react-router";
import type {User} from "../models/user.model.ts";
import {usersMock} from "../mocks/user.mock.ts";
import ProfileHeader from "../components/ProfileHeader.tsx";
import PostFeedCard from "../components/PostFeedCard.tsx";
import {postsMock} from "../mocks/post.mock.ts";
import type {Post} from "../models/post.model.ts";

function Profile() {
    const {id} = useParams<string>();
    console.log("id: ", id);
    const user: User | undefined = usersMock.find((u: User) => u.id === id);
    const posts: Post[] = postsMock.filter((p: Post) => p.account.id === id)
    console.log(user);
    return (
        <>
            <main className="content">
                <div className="Profile-wrap-content">
                    <ProfileHeader username={user?.username} avatarUrl={user?.avatarUrl}/>
                    <div className="posts-list">
                        {
                            posts.map((post) => {
                                return (
                                    <PostFeedCard key={post.id} id={post.id} userId={id || ""} content={post.content}
                                                  username={user?.username || ""} avatarSrc={user?.avatarUrl || ""}
                                                  createdAt={post.createdAt} width={"100%"}/>
                                )
                            })
                        }
                    </div>
                </div>
            </main>
        </>
    )
}

export default Profile;