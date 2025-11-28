import type {User} from "./user.model.ts";
import type {Post} from "./post.model.ts";

export interface Comment {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    replies: Comment[];
    account: User;
    post: Post;
}