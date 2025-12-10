import type {User} from "./user.model.ts";

export interface Comment {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    account: User;
    comments?: Comment[];
}