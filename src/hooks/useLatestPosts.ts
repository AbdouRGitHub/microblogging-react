import {useInfiniteQuery} from "@tanstack/react-query";
import {getLatestPosts} from "../services/post.service.ts";
import type {PageResult} from "../utils/pagingAndSorting.ts";
import type {Post} from "../models/post.model.ts";

export function useLatestPosts() {
    const {
        data, fetchNextPage, isPending, isFetching, isError, hasNextPage, refetch,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['posts', 'latest'],
        queryFn: getLatestPosts,
        initialPageParam: 1,
        getNextPageParam: (lastPage: PageResult<Post>): number | undefined => {
            const currentPage: number = lastPage.page.number + 1
            const totalPages: number = lastPage.page.totalPages

            return currentPage < totalPages
                ? currentPage + 1
                : undefined
        },
    });

    return {data, fetchNextPage, isPending, isFetching, isError, hasNextPage, refetch, isFetchingNextPage};
}