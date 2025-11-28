import type { Comment } from "../models/comment.model.ts";
import { postsMock } from "./post.mock.ts";
import { usersMock } from "./user.mock.ts";

// Helpers pour récupérer les objets liés
const getUser = (userId: string) => usersMock.find((u) => u.id === userId) || usersMock[0];
const getPost = (postId: string) => postsMock.find((p) => p.id === postId) || postsMock[0];

export const commentsMock: Comment[] = [
    {
        id: "c1",
        content: "Super initiative, hâte de voir la suite !",
        createdAt: "2023-10-01T08:30:00Z",
        updatedAt: "2023-10-01T08:30:00Z",
        account: getUser("u2"), // Bob
        post: getPost("p1"), // Post Bienvenue (Charlie)
        replies: [],
    },
    {
        id: "c2",
        content: "Félicitations pour le lancement 🚀",
        createdAt: "2023-10-01T09:00:00Z",
        updatedAt: "2023-10-01T09:00:00Z",
        account: getUser("u4"), // Diana
        post: getPost("p1"),
        replies: [
            {
                id: "c2-r1",
                content: "Merci Diana !",
                createdAt: "2023-10-01T09:10:00Z",
                updatedAt: "2023-10-01T09:10:00Z",
                account: getUser("u3"), // Charlie
                post: getPost("p1"),
                replies: []
            }
        ],
    },
    {
        id: "c3",
        content: "Isaac Asimov, le cycle de Fondation. Un classique indémodable.",
        createdAt: "2023-10-01T10:45:00Z",
        updatedAt: "2023-10-01T10:45:00Z",
        account: getUser("u6"), // Fiona
        post: getPost("p3"), // Post Livre SF (Bob)
        replies: [],
    },
    {
        id: "c4",
        content: "Je recommande 'Le Problème à trois corps' de Liu Cixin.",
        createdAt: "2023-10-01T11:00:00Z",
        updatedAt: "2023-10-01T11:00:00Z",
        account: getUser("u9"), // Ivan
        post: getPost("p3"),
        replies: [],
    },
    {
        id: "c5",
        content: "display: flex; justify-content: center; align-items: center; et voilà !",
        createdAt: "2023-10-02T10:15:00Z",
        updatedAt: "2023-10-02T10:15:00Z",
        account: getUser("u5"), // Eric
        post: getPost("p8"), // Post CSS (George)
        replies: [
            {
                id: "c5-r1",
                content: "Et n'oublie pas de donner une hauteur à ton conteneur 😉",
                createdAt: "2023-10-02T10:20:00Z",
                updatedAt: "2023-10-02T10:20:00Z",
                account: getUser("u1"), // Alice
                post: getPost("p8"),
                replies: []
            }
        ],
    },
    {
        id: "c6",
        content: "Miam, j'adore la tarte aux pommes ! Tu mets de la cannelle ?",
        createdAt: "2023-10-01T13:15:00Z",
        updatedAt: "2023-10-01T13:15:00Z",
        account: getUser("u2"), // Bob
        post: getPost("p5"), // Post Tarte (Helena)
        replies: [
            {
                id: "c6-r1",
                content: "Bien sûr, c'est le secret !",
                createdAt: "2023-10-01T13:30:00Z",
                updatedAt: "2023-10-01T13:30:00Z",
                account: getUser("u8"), // Helena
                post: getPost("p5"),
                replies: []
            }
        ],
    },
    {
        id: "c7",
        content: "Courage pour la guitare, les barrés c'est le plus dur au début.",
        createdAt: "2023-10-02T14:45:00Z",
        updatedAt: "2023-10-02T14:45:00Z",
        account: getUser("u7"), // George
        post: getPost("p9"), // Post Guitare (Julia)
        replies: [],
    },
];