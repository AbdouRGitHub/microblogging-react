import {queryOptions, infiniteQueryOptions} from "@tanstack/react-query";
import {
    getLatestPosts,
    getPostById,
    getPostsByUserId,
    getRepliesByPostId,
    getRepliesByUserId
} from "../../services/post.service.ts";
import type {PageResult} from "../../utils/pagingAndSorting.ts";
import type {Post} from "../../models/post.model.ts";


export const postQueries = {
    latest: () => infiniteQueryOptions({
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
    }),
    details: (id: string | undefined) => queryOptions({
        queryKey: ['post', id],
        queryFn: () => getPostById(id),
    }),
    replies: (id: string | undefined) => queryOptions({
        queryKey: ['post', id, 'replies'],
        queryFn: () => getRepliesByPostId(id),
        enabled: !!id,
        retry: false,
    }),
    userPosts: (userId: string | undefined) => infiniteQueryOptions({
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
    }),
    userReplies: (userId: string | undefined) => infiniteQueryOptions({
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
    })
}