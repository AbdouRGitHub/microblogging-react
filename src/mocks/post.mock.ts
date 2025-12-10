import type {Post} from "../models/post.model.ts";
import {usersMock} from "./user.mock.ts";

// Helper pour récupérer un utilisateur par son ID
const getUser = (userId: string) => usersMock.find((u) => u.id === userId) || usersMock[0];

export const postsMock: Post[] = [
    {
        id: "p1",
        content: "Bienvenue sur notre nouveau réseau social ! Ravi de voir tout le monde ici. 👋",
        createdAt: "2023-10-01T08:00:00Z",
        updatedAt: "2023-10-01T08:00:00Z",
        account: getUser("u3"), // Charlie (Admin)
        replies: [
            {
                id: "c1",
                content: "Super initiative, hâte de voir la suite !",
                createdAt: "2023-10-01T08:30:00Z",
                updatedAt: "2023-10-01T08:30:00Z",
                account: getUser("u2"), // Bob
                replies: [],
            },
            {
                id: "c2",
                content: "Félicitations pour le lancement 🚀",
                createdAt: "2023-10-01T09:00:00Z",
                updatedAt: "2023-10-01T09:00:00Z",
                account: getUser("u4"), // Diana
                replies: [
                    {
                        id: "c2-r1",
                        content: "Merci Diana !",
                        createdAt: "2023-10-01T09:10:00Z",
                        updatedAt: "2023-10-01T09:10:00Z",
                        account: getUser("u3"), // Charlie
                        replies: [],
                    },
                ],
            },
        ],
    },
    {
        id: "p3",
        content: "Quelqu'un a des recommandations pour un bon livre de science-fiction ? 📚",
        createdAt: "2023-10-01T10:30:00Z",
        updatedAt: "2023-10-01T10:30:00Z",
        account: getUser("u2"), // Bob
        replies: [
            {
                id: "c3",
                content: "Isaac Asimov, le cycle de Fondation. Un classique indémodable.",
                createdAt: "2023-10-01T10:45:00Z",
                updatedAt: "2023-10-01T10:45:00Z",
                account: getUser("u6"), // Fiona
                replies: [],
            },
            {
                id: "c4",
                content: "Je recommande 'Le Problème à trois corps' de Liu Cixin.",
                createdAt: "2023-10-01T11:00:00Z",
                updatedAt: "2023-10-01T11:00:00Z",
                account: getUser("u9"), // Ivan
                replies: [],
            },
        ],
    },
    {
        id: "p8",
        content: "Est-ce que quelqu'un sait comment centrer une div ? Je demande pour un ami... 😅 #css",
        createdAt: "2023-10-02T10:10:00Z",
        updatedAt: "2023-10-02T10:10:00Z",
        account: getUser("u7"), // George
        replies: [
            {
                id: "c5",
                content: "display: flex; justify-content: center; align-items: center; et voilà !",
                createdAt: "2023-10-02T10:15:00Z",
                updatedAt: "2023-10-02T10:15:00Z",
                account: getUser("u5"), // Eric
                replies: [
                    {
                        id: "c5-r1",
                        content: "Et n'oublie pas de donner une hauteur à ton conteneur 😉",
                        createdAt: "2023-10-02T10:20:00Z",
                        updatedAt: "2023-10-02T10:20:00Z",
                        account: getUser("u1"), // Alice
                        replies: [],
                    },
                ],
            },
        ],
    },
];

export function findById(id: string | undefined): Post | null {

    function search(node: Post): Post | null {
        if (node.id === id) return node;

        for (const reply of node.replies ?? []) {
            const found = search(reply);
            if (found) return found;
        }

        return null;
    }

    for (const post of postsMock) {
        const result = search(post);
        if (result) return result;
    }

    return null;
}
