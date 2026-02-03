import {mutationOptions} from "@tanstack/react-query";
import {likePost, sendComment, unlikePost} from "../../services/post.service.ts";

export const postMutations = {
    postComment: (postId: string) => mutationOptions({
        mutationFn: (content: string) => sendComment(postId, content),
    }),
    toggleLike: () => mutationOptions({
        mutationFn: async ({postId, wasLiked}: { postId: string, wasLiked: boolean }) => {
            if (wasLiked) {
                return unlikePost(postId);
            }
            return likePost(postId);
        },
    })
}