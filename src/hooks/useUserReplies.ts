import {useInfiniteQuery} from "@tanstack/react-query";
import {getRepliesByUserId} from "../services/post.service.ts";
import type {PageResult} from "../utils/pagingAndSorting.ts";
import type {Post} from "../models/post.model.ts";

export function useUserReplies(userId: string | undefined) {
    return useInfiniteQuery({
        queryKey: ['replies', userId],
        queryFn: ({pageParam, queryKey}) => getRepliesByUserId(pageParam, queryKey[1]),
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