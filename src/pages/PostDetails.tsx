import {Link, useParams} from "react-router";
import styles from "../styles/PostDetails.module.css";
import {MessageSquare, Heart} from "lucide-react";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import PostFeedCard from "../components/PostFeedCard.tsx";
import {faker} from "@faker-js/faker";
import {useQueryClient, useMutation, useQuery} from "@tanstack/react-query";
import {getPostById, getRepliesByPostId, likePost, unlikePost} from "../services/post.service.ts";
import HeaderTitle from "../components/HeaderTitle.tsx";
import type {Post} from "../models/post.model.ts";

function PostDetails() {
    const {id} = useParams();
    const queryClient = useQueryClient();

    const {data: post, isPending, isError} = useQuery({
        queryKey: ['post', id],
        queryFn: () => getPostById(id),
    })

    const {data: replies} = useQuery({
        queryKey: ['replies', id],
        queryFn: () => getRepliesByPostId(id),
        enabled: !!post?.id,
        retry: true,
    })

    const likeMutation = useMutation({
        mutationFn: async ({postId, wasLiked}: { postId: string, wasLiked: boolean }) => {
            if (wasLiked) {
                return unlikePost(postId);
            }
            return likePost(postId);
        },
        onMutate: async ({postId}) => {
            await queryClient.cancelQueries({queryKey: ['post', postId]});

            const previousPost = queryClient.getQueryData(['post', postId]);

            queryClient.setQueryData(['post', postId], (old: Post) => ({
                ...old,
                like: {
                    liked: !old.like.liked,
                    count: old.like.liked ? old.like.count - 1 : old.like.count + 1
                }
            }));

            return {previousPost};
        },
        onError: (_err, {postId}, context) => {
            queryClient.setQueryData(['post', postId], context?.previousPost);
        },
        onSettled: (_data, _err, {postId}) => {
            queryClient.invalidateQueries({queryKey: ['post', postId]});
        },
    });

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
                                <Link to={`/${post?.account.id}`}>
                                    <img src={faker.image.avatar()} className={styles.headerAvatar} alt="avatar"/>
                                </Link>
                                <p>
                                    <span>{post?.account.username} </span>
                                </p>
                            </div>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.content}>
                                <p>{post?.content}</p>
                            </div>
                            <div>
                                <p className={styles.time}> Posté
                                    le {post?.createdAt ? format(new Date(post?.createdAt), "dd MMMM yyyy, hh:mm", {locale: fr}) : null}
                                </p>
                            </div>
                        </div>
                        <div className={styles.footer}>
                            <button className={styles.commentBtn}>
                                <MessageSquare className={styles.commentIcon}/>
                            </button>
                            <span
                                style={{color: "grey"}}>{post?.commentsCount > 1 ? `${post?.commentsCount} commentaires` : `${post?.commentsCount}`}</span>
                            <button className={`${styles.likeBtn} ${post?.like.liked ? styles.active : ""}`}
                                    disabled={likeMutation.isPending}
                                    onClick={() => likeMutation.mutate({
                                        postId: id as string,
                                        wasLiked: post?.like.liked
                                    })
                                    }>
                                <Heart className={styles.likeIcon}
                                       fill={post?.like.liked ? '#FE7918' : 'none'}/>
                            </button>
                            <span
                                style={{color: "grey"}}> {post?.like.count > 0 && (
                                post.like.count > 1
                                    ? `${post.like.count} ont aimé`
                                    : `${post.like.count} a aimé`
                            )}</span>
                        </div>
                    </div>
                    <div className={styles.comments}>
                        <div className={styles.editor}>
                            <textarea name="comment editor" className={styles.textArea}
                                      placeholder="Qu'en pense tu ?"
                            />
                            <div>
                                <button className={styles.sendButton}>Envoyer</button>
                            </div>
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