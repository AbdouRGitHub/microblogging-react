import "../styles/HomeFeed.css"
import FeedPostEditor from "../components/FeedPostEditor.tsx";
import PostFeedCard from "../components/PostFeedCard.tsx";
import {useInfiniteQuery} from "@tanstack/react-query";
import {getLatestPosts} from "../services/post.service.ts";
import type {PageResult} from "../utils/pagingAndSorting.ts";
import type {Post} from "../models/post.model.ts";
import {Fragment} from "react";
import {useInfiniteScroll} from "../hooks/useInfiniteScroll.ts";

function HomeFeed() {
    const {
        data, fetchNextPage, isPending, isFetching, isError, hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['posts', 'latest'],
        queryFn: getLatestPosts,
        initialPageParam: 1,
        getNextPageParam: (lastPage: PageResult<Post>): number | undefined => {
            const currentPage: number = lastPage.page.number + 1
            const totalPages: number = lastPage.page.totalPages

            return currentPage < totalPages
                ? currentPage + 1
                : undefined
        },
    });
    const setRef = useInfiniteScroll({
        onIntersect: () => fetchNextPage(),
        enabledFetching: hasNextPage && !isFetchingNextPage,
    });

    if (isPending) return <div
        style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Chargement...</div>;

    if (isError) return <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Erreur</div>;

    return (
        <>
            <main className="content">
                <div className="HomeFeed-wrap-content">
                    <FeedPostEditor/>
                    <div className="feed">
                        {
                            data?.pages.map((page) => (
                                <Fragment key={page.page.number}>
                                    {
                                        page.content.map((post) => (
                                            (
                                                <PostFeedCard
                                                    key={post.id}
                                                    id={post.id}
                                                    userId={post.account.id}
                                                    content={post.content}
                                                    username={post.account.username}
                                                    createdAt={post.createdAt}
                                                />
                                            )
                                        ))
                                    }
                                </Fragment>
                            ))
                        }
                    </div>
                    <div id="scroll-action" style={{height: 1, width: '100%'}}
                         ref={setRef}>{isFetching ? 'Chargement...' : null}</div>
                </div>
            </main>
        </>
    );
}

export default HomeFeed;