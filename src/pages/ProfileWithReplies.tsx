import styles from "../styles/Profile.module.css";
import {useParams} from "react-router";
import ProfileHeader from "../components/ProfileHeader.tsx";
import {faker} from "@faker-js/faker";
import {Fragment} from "react";
import PostFeedCard from "../components/PostFeedCard.tsx";
import {useUserDetails} from "../hooks/useUserDetails.ts";
import {useUserReplies} from "../hooks/useUserReplies.ts";

function ProfileWithReplies() {
    const {id} = useParams();

    const {data: user} = useUserDetails(id);

    const {data} = useUserReplies(id);

    return (
        <>
            <main className={styles.content}>
                <div className={styles.wrap}>
                    <ProfileHeader username={user?.username} createdAt={user?.createdAt}
                                   avatarUrl={faker.image.avatar()}/>
                    <div className={styles.list}>
                        {
                            data?.pages.map((page) => (
                                <Fragment key={page.page.number}>
                                    {
                                        page.content.map((post) => (
                                            <PostFeedCard
                                                key={post.id}
                                                id={post.id}
                                                userId={post.account.id}
                                                content={post.content}
                                                likes={post.like.count}
                                                comments={post.commentsCount}
                                                username={post.account.username}
                                                createdAt={post.createdAt}
                                                width={"100%"}
                                            />))
                                    }
                                </Fragment>
                            ))
                        }
                    </div>
                </div>
            </main>
        </>
    )
}

export default ProfileWithReplies;