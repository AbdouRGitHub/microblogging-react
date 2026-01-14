import {Link, useParams} from "react-router";
import styles from "../styles/PostDetails.module.css";
import {MessageSquare, Heart} from "lucide-react";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import PostFeedCard from "../components/PostFeedCard.tsx";
import {faker} from "@faker-js/faker";
import {useQuery} from "@tanstack/react-query";
import {getPostById, getRepliesByPostId} from "../services/post.service.ts";
import HeaderTitle from "../components/HeaderTitle.tsx";

function PostDetails() {
    const {id} = useParams();
    const {data: post, isPending, isError} = useQuery({
        queryKey: ['post', id],
        queryFn: () => getPostById(id),
    })

    const {data: replies} = useQuery({
        queryKey: ['replies', id],
        queryFn: () => getRepliesByPostId(id),
        enabled: !!post?.id
    })
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
                                <MessageSquare size={22} className={styles.commentIcon}/>
                            </button>
                            <span
                                style={{color: "grey"}}>{post?.commentsCount > 1 ? `${post?.commentsCount} commentaires` : `${post?.commentsCount}`}</span>
                            <button className={styles.likeBtn}>
                                <Heart size={22} className={styles.likeIcon}  fill={post?.like.liked ? '#FE7918' : 'none'}/>
                            </button>
                            <span
                                style={{color: "grey"}}>{post?.like.count > 1 ? `${post?.like.count} ont aimé` : `${post?.like.count}`}</span>
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