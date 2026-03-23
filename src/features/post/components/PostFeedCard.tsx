import styles from "../styles/PostFeedCard.module.css";
import {formatShortDate} from "../../../shared/utils/formatShortDate.ts";
import {Link} from "react-router";
import {faker} from "@faker-js/faker";
import {BookmarkMinus, BookmarkCheck, Ellipsis, Trash} from "lucide-react";
import {useState} from "react";
import {type InfiniteData, useMutation} from "@tanstack/react-query";
import {bookmarkMutations} from "../../bookmark/hooks/mutations/bookmark.ts";
import type {Post} from "../models/post.model.ts";
import {HTTPError} from "ky";
import type {PageResult} from "../../../shared/utils/pagingAndSorting.ts";
import {useAuthModalStore} from "../../auth/stores/authModalStore.ts";

function PostFeedCard({id, userId, content, likes, bookmarked, comments, username, createdAt, width = "80%"}: {
    id: string,
    userId: string,
    content: string,
    likes: number,
    bookmarked: boolean,
    comments: number,
    username: string,
    createdAt: string,
    width?: string
}) {
    const [ellipsisCtxMenu, setEllipsisCtxMenu] = useState<boolean>(false);
    const open = useAuthModalStore((state) => state.open);
    const addBookmarkMutation = useMutation({
        ...bookmarkMutations.add(),
        onMutate: async (postId, context) => {
            // Annuler les requêtes en cours
            await context.client.cancelQueries({queryKey: ['post', postId]});
            await context.client.cancelQueries({queryKey: ['posts', 'latest']});
            await context.client.cancelQueries({queryKey: ['posts', userId]});

            // Sauvegarder l'état précédent du post individuel (si existant)
            const previousPost = context.client.getQueryData(['post', postId]);

            // Mettre à jour le post individuel (si existant)
            if (previousPost) {
                context.client.setQueryData(['post', postId], (old: Post): Post => ({
                    ...old,
                    bookmark: {
                        bookmarked: true,
                        count: old.bookmark.count + 1
                    }
                }));
            }

            // Mettre à jour les listes de posts
            context.client.setQueriesData({queryKey: ['posts', 'latest']}, (oldData:  InfiniteData<PageResult<Post>, unknown>) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    pages: oldData.pages.map((page: PageResult<Post>) => ({
                        ...page,
                        content: page.content.map((post: Post) =>
                            post.id === postId
                                ? {
                                    ...post,
                                    bookmark: {
                                        bookmarked: true,
                                        count: post.bookmark.count + 1
                                    }
                                }
                                : post
                        )
                    }))
                };
            });

            context.client.setQueriesData({queryKey: ['posts', userId]}, (oldData: InfiniteData<PageResult<Post>, unknown>) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    pages: oldData.pages.map((page: PageResult<Post>) => ({
                        ...page,
                        content: page.content.map((post: Post) =>
                            post.id === postId
                                ? {
                                    ...post,
                                    bookmark: {
                                        bookmarked: true,
                                        count: post.bookmark.count + 1
                                    }
                                }
                                : post
                        )
                    }))
                };
            });

            return {previousPost}
        },
        onError: async (error, postId, onMutateResult, context) => {
            if (onMutateResult?.previousPost) {
                context.client.setQueryData(['post', postId], onMutateResult.previousPost);
            }
            await context.client.invalidateQueries({queryKey: ['posts', 'latest']});
            await context.client.invalidateQueries({queryKey: ['posts', userId]});
            if (error instanceof HTTPError && error.response.status === 403) {
                open();
            }
        },
        onSettled: async (_data, _err, postId, _onMutateResult, context) => {
            await context.client.invalidateQueries({queryKey: ['post', postId]});
        },
        onSuccess: async (_data, _variables, _onMutateResult, context) => {
            setEllipsisCtxMenu(false);
            await context.client.invalidateQueries({queryKey: ['posts', 'latest']});
            await context.client.invalidateQueries({queryKey:  ['posts', userId]});
            await context.client.invalidateQueries({queryKey: ['bookmarks']});

        },
    })

    const removeBookmarkMutation = useMutation({
        ...bookmarkMutations.remove(),
        onMutate: async (postId, context) => {
            // Annuler les requêtes en cours
            await context.client.cancelQueries({queryKey: ['post', postId]});
            await context.client.cancelQueries({queryKey: ['posts', 'latest']});
            await context.client.cancelQueries({queryKey: ['posts', userId]});

            // Sauvegarder l'état précédent du post individuel (si existant)
            const previousPost = context.client.getQueryData(['post', postId]);

            // Mettre à jour le post individuel (si existant)
            if (previousPost) {
                context.client.setQueryData(['post', postId], (old: Post): Post => ({
                    ...old,
                    bookmark: {
                        bookmarked: false,
                        count: old.bookmark.count - 1
                    }
                }));
            }

            // Mettre à jour les listes de posts
            context.client.setQueriesData({queryKey: ['posts', 'latest']}, (oldData: InfiniteData<PageResult<Post>, unknown>) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    pages: oldData.pages.map((page: PageResult<Post>) => ({
                        ...page,
                        content: page.content.map((post: Post) =>
                            post.id === postId
                                ? {
                                    ...post,
                                    bookmark: {
                                        bookmarked: false,
                                        count: post.bookmark.count - 1
                                    }
                                }
                                : post
                        )
                    }))
                };
            });

            context.client.setQueriesData({queryKey: ['posts', userId]}, (oldData: InfiniteData<PageResult<Post>, unknown>) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    pages: oldData.pages.map((page: PageResult<Post>) => ({
                        ...page,
                        content: page.content.map((post: Post) =>
                            post.id === postId
                                ? {
                                    ...post,
                                    bookmark: {
                                        bookmarked: false,
                                        count: post.bookmark.count - 1
                                    }
                                }
                                : post
                        )
                    }))
                };
            });

            return {previousPost}
        },
        onError: async (error, postId, onMutateResult, context) => {
            if (onMutateResult?.previousPost) {
                context.client.setQueryData(['post', postId], onMutateResult.previousPost);
            }
            await context.client.invalidateQueries({queryKey: ['posts', 'latest']});
            await context.client.invalidateQueries({queryKey: ['posts', userId]});
            if (error instanceof HTTPError && error.response.status === 403) {
                open();
            }
        },
        onSettled: async (_data, _err, postId, _onMutateResult, context) => {
            await context.client.invalidateQueries({queryKey: ['post', postId]});
        },
        onSuccess: async (_data, _variables, _onMutateResult, context) => {
            setEllipsisCtxMenu(false);
            await context.client.invalidateQueries({queryKey: ['posts', 'latest']});
            await context.client.invalidateQueries({queryKey:  ['posts', userId]});
            await context.client.invalidateQueries({queryKey: ['bookmarks']});

        },
    })

    return (
        <article className={styles.card} style={{width: `${width}`}}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <Link to={`/${userId}`} className={styles.avatarLink}>
                        <img src={faker.image.avatar()} className={styles.avatarImage} alt="avatar"/>
                    </Link>
                    <p> {username} <span
                        style={{color: 'grey', fontSize: 'small'}}> . {formatShortDate(new Date(createdAt))}</span></p>
                </div>
                <div className={styles.ellipsisContainer}>
                    <Ellipsis className={styles.ellipsis}
                              onClick={(e) => {
                                  e.stopPropagation();
                                  setEllipsisCtxMenu(!ellipsisCtxMenu);
                              }}/>
                    {
                        ellipsisCtxMenu && (
                            <div className={styles.ellipsisCtxMenu}>
                                <div className={styles.ellipsisCtxItem}
                                     onClick={bookmarked ? () => removeBookmarkMutation.mutate(id) : () => addBookmarkMutation.mutate(id)}>
                                    {bookmarked ? (
                                        <>
                                            <BookmarkMinus className={styles.ellipsisCtxIcon}/>
                                            <span>Retirer des signets</span>
                                        </>
                                    ) : (
                                        <>
                                            <BookmarkCheck className={styles.ellipsisCtxIcon}/>
                                            <span>Ajouter aux signets</span>
                                        </>
                                    )}
                                </div>
                                <div className={styles.ellipsisCtxItem} style={{color: "red"}}>
                                    <Trash className={styles.ellipsisCtxIcon}/>
                                    <span>Supprimer le post</span>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <Link to={`/post/${id}`}
                  className={styles.link}>
                <p className={styles.content}>
                    {content}
                </p>
            </Link>
            <div className={styles.footer}>
                <p style={{color: 'grey', fontSize: 'smaller'}}>
                    <span
                        style={{color: 'grey', fontSize: 'small', fontWeight: 'bolder'}}>{comments} </span> commentaires
                </p>
                <p style={{color: 'grey', fontSize: 'smaller'}}>
                    <span style={{color: 'grey', fontSize: 'small', fontWeight: 'bolder'}}>{likes} </span> likes </p>
            </div>
        </article>
    )
}

export default PostFeedCard;