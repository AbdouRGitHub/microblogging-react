export interface User {
    id: string;
    username: string;
    avatarUrl: string;
    roles: string[];
    createdAt: string;
}

export interface currentUserSummary {
    id: string;
    username: string;
    avatarUrl: string;
}
