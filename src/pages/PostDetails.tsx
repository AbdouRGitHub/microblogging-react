import {Link, useParams} from "react-router";
import styles from "../styles/PostDetails.module.css";
import {MessageSquare, Heart} from "lucide-react";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import PostFeedCard from "../components/PostFeedCard.tsx";
import {faker} from "@faker-js/faker";
import {useQueryClient, type QueryClient, useQuery, useMutation} from "@tanstack/react-query";
import HeaderTitle from "../components/HeaderTitle.tsx";
import {postQueries} from "../hooks/queries/post.ts";
import PostEditor, {type FeedEditorInputs} from "../components/PostEditor.tsx";
import {postMutations} from "../hooks/mutations/post.ts";
import {type SubmitHandler} from "react-hook-form";
import {HTTPError} from "ky";
import {useAuthModalStore} from "../stores/authModalStore.ts";

function PostDetails() {
    const {id} = useParams();
    const open = useAuthModalStore((state) => state.open);
    const queryClient: QueryClient = useQueryClient();

    const {data: post, isPending, isError} = useQuery(postQueries.details(id));

    const {data: replies} = useQuery(postQueries.replies(post?.id));

    const likeMutation = useMutation(postMutations.toggleLike(queryClient));

    const submitCommentMutation = useMutation({
        ...postMutations.postComment(id as string),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries(postQueries.replies(id)),
                queryClient.invalidateQueries(postQueries.details(id))
            ]);
        },
        onError: (error) => {
            if (error instanceof HTTPError && error.response.status === 403) {
                open();
            }
        }
    });

    const handleFeedEditorSubmit: SubmitHandler<FeedEditorInputs> = async (data: FeedEditorInputs) => {
        submitCommentMutation.mutate(data.content);
    }

    if (isPending) return <div
        style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Chargement...</div>;

    if (isError) return <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Erreur</div>;

    return (
        <>
            <main className={styles.content}>
                <div className={styles.wrap}>
                    <HeaderTitle title="Post"/>
                    <div className={styles.post}>
                        <div className={styles.postHeader}>
                            <div className={styles.headerTitle}>
                                <Link to={`/${post.account.id}`}>
                                    <img src={faker.image.avatar()} className={styles.headerAvatar} alt="avatar"/>
                                </Link>
                                <p>
                                    <span>{post.account.username} </span>
                                </p>
                            </div>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.content}>
                                <p>{post.content}</p>
                            </div>
                            <div>
                                <p className={styles.time}> Posté
                                    le {post.createdAt ? format(new Date(post.createdAt), "dd MMMM yyyy, hh:mm", {locale: fr}) : null}
                                </p>
                            </div>
                        </div>
                        <div className={styles.footer}>
                            <button className={styles.commentBtn}>
                                <MessageSquare className={styles.commentIcon}/>
                            </button>
                            <span
                                style={{color: "grey"}}>{post.commentsCount > 1 ? `${post.commentsCount} commentaires` : `${post?.commentsCount}`}</span>
                            <button className={`${styles.likeBtn} ${post.like.liked ? styles.active : ""}`}
                                    disabled={likeMutation.isPending}
                                    onClick={() => likeMutation.mutate({
                                        postId: id as string,
                                        wasLiked: post.like.liked
                                    })
                                    }>
                                <Heart className={styles.likeIcon}
                                       fill={post.like.liked ? '#FE7918' : 'none'}/>
                            </button>
                            <span
                                style={{color: "grey"}}> {post.like.count > 0 && (
                                post.like.count > 1
                                    ? `${post.like.count} ont aimé`
                                    : `${post.like.count} a aimé`
                            )}</span>
                        </div>
                    </div>
                    <div className={styles.comments}>
                        <div className={styles.editor}>
                            <PostEditor onSubmit={handleFeedEditorSubmit}/>
                        </div>
                        <div className={styles.commentList}>
                            {replies?.content?.map(reply => (
                                <PostFeedCard id={reply.id} userId={reply.account.id} key={reply.id}
                                              content={reply.content}
                                              likes={post.like.count}
                                              comments={post.commentsCount}
                                              username={reply.account.username}
                                              createdAt={reply.createdAt} width={"100%"}/>

                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default PostDetails;