import {mutationOptions} from "@tanstack/react-query";
import {addBookmark, removeBookmark} from "../../services/bookmark.service.ts";

export const bookmarkMutations = {
    add: () => mutationOptions({
        mutationFn: (postId: string) => addBookmark(postId)
    }),
    remove: () => mutationOptions({
        mutationFn: (postId: string) => removeBookmark(postId)
    }),
    toggleBookmark: () => mutationOptions({
        mutationFn: ({postId, wasBookmarked}: { postId: string, wasBookmarked: boolean }) => {
            if (wasBookmarked) {
                return removeBookmark(postId);
            }
            return addBookmark(postId);
        }
    })
}