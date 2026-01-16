import {useQuery} from "@tanstack/react-query";
import {getPostById} from "../services/post.service.ts";
import type {Post} from "../models/post.model.ts";

export function usePostDetails(id: string | undefined) {
    return useQuery<Post>({
        queryKey: ['post', id],
        queryFn: () => getPostById(id),
    });
}
