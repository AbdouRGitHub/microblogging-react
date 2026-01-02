import styles from "../styles/Profile.module.css";
import {useParams} from "react-router";
import ProfileHeader from "../components/ProfileHeader.tsx";
import PostFeedCard from "../components/PostFeedCard.tsx";
import {faker} from "@faker-js/faker";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {getUserById} from "../services/user.service.ts";
import {getPostsByUserId} from "../services/post.service.ts";
import type {PageResult} from "../utils/pagingAndSorting.ts";
import type {Post} from "../models/post.model.ts";
import {Fragment} from "react";

function Profile() {
    const {id} = useParams();
    const {data: user} = useQuery({
        queryKey: ['account', id],
        queryFn: () => getUserById(id),
        staleTime: 30 * 1000
    })

    const {data} = useInfiniteQuery({
        queryKey: ['posts', id],
        queryFn: ({pageParam, queryKey}) => getPostsByUserId(pageParam, queryKey[1]),
        initialPageParam: 1,
        getNextPageParam: (lastPage: PageResult<Post>): number | undefined => {
            const currentPage: number = lastPage.page.number + 1
            const totalPages: number = lastPage.page.totalPages

            return currentPage < totalPages
                ? currentPage + 1
                : undefined
        }
    });

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
                                                liked={post.like.liked}
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