import type {User} from "./user.model.ts";

export interface Post {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    account: User;
}
