import styles from "./styles/Bookmark.module.css";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useInfiniteScroll} from "../../shared/hooks/useInfiniteScroll.ts";
import {Fragment} from "react";
import PostFeedCard from "../post/components/PostFeedCard.tsx";
import {bookmarkQueries} from "./hooks/queries/bookmark.ts";

function BookMark() {

    const {
        data, fetchNextPage, isPending, isFetching, isError, hasNextPage, isFetchingNextPage,
    } = useInfiniteQuery(bookmarkQueries.all());


    const setRef = useInfiniteScroll({
        onIntersect: () => fetchNextPage(),
        enabledFetching: hasNextPage && !isFetchingNextPage,
    });

    if (isPending) return <div
        style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Chargement...</div>;

    if (isError) return <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Erreur</div>;

    return (
        <>
            <main className={styles.main}>
                <div className={styles.wrap}>
                    <div className={styles.feed}>
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
                                                    likes={post.like.count}
                                                    comments={post.commentsCount}
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
    )
}

export default BookMark;