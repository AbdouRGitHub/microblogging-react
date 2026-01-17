import styles from "../styles/HomeFeed.module.css"
import FeedPostEditor, {type FeedEditorInputs} from "../components/FeedPostEditor.tsx";
import PostFeedCard from "../components/PostFeedCard.tsx";
import {sendPost} from "../services/post.service.ts";
import {Fragment} from "react";
import {useInfiniteScroll} from "../hooks/useInfiniteScroll.ts";
import {type SubmitHandler, useForm} from "react-hook-form";
import {useInfiniteQuery} from "@tanstack/react-query";
import {postQueries} from "../hooks/queries/post.ts";

function HomeFeed() {
    const {
        register,
        handleSubmit,
    } = useForm<FeedEditorInputs>({
        shouldFocusError: false,
    });

    const {
        data, fetchNextPage, isPending, isFetching, isError, hasNextPage, refetch,
        isFetchingNextPage,
    } = useInfiniteQuery(postQueries.latest());

    const handleFeedEditorSubmit: SubmitHandler<FeedEditorInputs> = async (data: FeedEditorInputs) => {
        const response = await sendPost(data.content);
        if (response) {
            await refetch();
        }
    }

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
                    <FeedPostEditor register={register}
                                    onSubmit={handleSubmit(handleFeedEditorSubmit)}/>
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
    );
}

export default HomeFeed;