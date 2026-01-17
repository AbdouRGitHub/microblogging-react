import styles from "../styles/Profile.module.css";
import {useParams} from "react-router";
import ProfileHeader from "../components/ProfileHeader.tsx";
import PostFeedCard from "../components/PostFeedCard.tsx";
import {faker} from "@faker-js/faker";
import {Fragment} from "react";
import {HTTPError} from "ky";
import AccountNotFound from "./AccountNotFound.tsx";
import HeaderTitle from "../components/HeaderTitle.tsx";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {userQueries} from "../hooks/queries/user.ts";
import {postQueries} from "../hooks/queries/post.ts";

function Profile() {
    const {id} = useParams();
    const {data: user, error, isError} = useQuery(userQueries.details(id));
    const {data} = useInfiniteQuery(postQueries.userReplies(id));

    if (isError) {
        if (error instanceof HTTPError && (error.response.status === 404 || error.response.status === 400)) {
            return <AccountNotFound/>;
        }
        return <div>Une erreur est survenue</div>;
    }
    return (
        <>
            <main className={styles.content}>
                <div className={styles.wrap}>
                    <div className={styles.headerContainer}>
                        <div className={styles.titleContainer}>
                            <HeaderTitle title="Profile"/>
                        </div>
                        <ProfileHeader username={user?.username} createdAt={user?.createdAt}
                                       avatarUrl={faker.image.avatar()}/>
                    </div>
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

export default Profile;