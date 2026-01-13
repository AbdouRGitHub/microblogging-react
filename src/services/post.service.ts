import kyClient from "../utils/kyClient";
import type {PageResult} from "../utils/pagingAndSorting.ts";
import type {Post} from "../models/post.model.ts";

async function getLatestPosts({pageParam}: { pageParam: number }): Promise<PageResult<Post>> {
    return await kyClient.get(`posts?page=${pageParam}`, {
        credentials: 'include'
    }).json<PageResult<Post>>();
}

async function getPostById(postId: string | undefined): Promise<Post> {
    return await kyClient.get(`posts/${postId}`, {
        credentials: 'include'
    }).json<Post>();
}

async function getRepliesByPostId(postId: string | undefined): Promise<PageResult<Post>> {
    return await kyClient.get(`posts/${postId}/comments`).json<PageResult<Post>>();
}

async function getPostsByUserId(pageParam: number, userId: string | undefined): Promise<PageResult<Post>> {

    return await kyClient.get(`posts/by-user/${userId}?page=${pageParam}`).json<PageResult<Post>>();
}

async function getRepliesByUserId(pageParam: number, userId: string | undefined): Promise<PageResult<Post>> {
    return await kyClient.get(`posts/by-user/${userId}/replies?page=${pageParam}`).json<PageResult<Post>>();
}

async function sendPost(content: string): Promise<Post> {
    return await kyClient.post('posts', {
        json: {content},
    }).json<Post>();
}

export {getLatestPosts, getPostById, getPostsByUserId, getRepliesByUserId, getRepliesByPostId, sendPost}