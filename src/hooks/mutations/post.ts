import {mutationOptions, type QueryClient} from "@tanstack/react-query";
import {likePost, unlikePost} from "../../services/post.service.ts";
import type {Post} from "../../models/post.model.ts";

export const postMutations = {
    postComment: () => mutationOptions({}),
    toggleLike: (queryClient: QueryClient) => mutationOptions({
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
        onSettled: (_data, _err, {postId}) =>
            queryClient.invalidateQueries({queryKey: ['post', postId]}),

    })
}