import {useQuery} from "@tanstack/react-query";
import {getRepliesByPostId} from "../services/post.service.ts";
import type {Post} from "../models/post.model.ts";

export function usePostComments(post: Post| undefined) {
    return useQuery({
        queryKey: ['replies', post?.id],
        queryFn: () => getRepliesByPostId(post?.id),
        enabled: !!post?.id,
        retry: true,
    });
}