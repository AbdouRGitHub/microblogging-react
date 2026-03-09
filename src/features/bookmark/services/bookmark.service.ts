import kyClient from "../../../shared/utils/kyClient.ts";
import type {PageResult} from "../../../shared/utils/pagingAndSorting.ts";
import type {Post} from "../../post/models/post.model.ts";

function getBookmarks({pageParam}: { pageParam: number }) {
    return kyClient.get(`posts/bookmarks?page=${pageParam}`).json<PageResult<Post>>();
}

function addBookmark(postId: string) {
    return kyClient.post(`posts/${postId}/bookmarks`).json();
}

function removeBookmark(postId: string) {
    return kyClient.delete(`posts/${postId}/bookmarks`).json();
}

export {getBookmarks, addBookmark, removeBookmark};