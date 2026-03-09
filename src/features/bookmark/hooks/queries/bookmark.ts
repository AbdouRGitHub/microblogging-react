import {infiniteQueryOptions} from "@tanstack/react-query";
import {getBookmarks} from "../../services/bookmark.service.ts";
import type {PageResult} from "../../../../shared/utils/pagingAndSorting.ts";
import type {Post} from "../../../post/models/post.model.ts";

export const bookmarkQueries = {
    all: () => infiniteQueryOptions({
        queryKey: ['bookmarks'],
        queryFn: getBookmarks,
        initialPageParam: 1,
        getNextPageParam: (lastPage: PageResult<Post>): number | undefined => {
            const currentPage: number = lastPage.page.number + 1
            const totalPages: number = lastPage.page.totalPages

            return currentPage < totalPages
                ? currentPage + 1
                : undefined
        },
    }),
}