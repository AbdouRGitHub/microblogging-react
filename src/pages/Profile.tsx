import "../styles/Profile.css";
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
    const {data: user, isPending: userIsPending, isError: userIsError} = useQuery({
        queryKey: ['account', id],
        queryFn: () => getUserById(id)
    })

    const {data, isPending, isError} = useInfiniteQuery({
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
    if (isPending || userIsPending) return <div
        style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Chargement...</div>;

    if (isError || userIsError) return <div
        style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Erreur</div>;

    console.log(data);
    return (
        <>
            <main className="content">
                <div className="Profile-wrap-content">
                    <ProfileHeader username={user?.username} createdAt={user?.createdAt}
                                   avatarUrl={faker.image.avatar()}/>
                    <div className="posts-list">
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