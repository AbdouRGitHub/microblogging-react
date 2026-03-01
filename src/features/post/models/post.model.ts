import type {User} from "../../user/models/user.model.ts";

export interface Post {
    id: string;
    content: string;
    like: Like;
    commentsCount: number;
    createdAt: string;
    updatedAt: string;
    account: User;
    replies?: Post[];
}


interface Like {
    count: number;
    liked: boolean;
}
