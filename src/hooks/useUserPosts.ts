import {useInfiniteQuery} from "@tanstack/react-query";
import {getPostsByUserId} from "../services/post.service.ts";
import type {PageResult} from "../utils/pagingAndSorting.ts";
import type {Post} from "../models/post.model.ts";

export function useUserPosts(userId: string | undefined) {
    return useInfiniteQuery({
        queryKey: ['posts', userId],
        queryFn: ({pageParam, queryKey}) => getPostsByUserId(pageParam, queryKey[1]),
        initialPageParam: 1,
        getNextPageParam: (lastPage: PageResult<Post>): number | undefined => {
            const currentPage: number = lastPage.page.number + 1
            const totalPages: number = lastPage.page.totalPages

            return currentPage < totalPages
                ? currentPage + 1
                : undefined
        }
    });
}