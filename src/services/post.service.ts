import ky from "ky";
import type {PageResult} from "../utils/pagingAndSorting.ts";
import type {Post} from "../models/post.model.ts";

async function getLatestPosts({pageParam}: { pageParam: number }): Promise<PageResult<Post>> {
    return await ky.get(`http://localhost:8080/posts?page=${pageParam}`).json<PageResult<Post>>();
}

async function getPostById(postId: string | undefined): Promise<Post> {
    return await ky.get(`http://localhost:8080/posts/${postId}`).json<Post>();
}

export {getLatestPosts, getPostById}