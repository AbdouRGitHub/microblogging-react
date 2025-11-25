import type { Post } from "../models/post.model.ts";
import { usersMock } from "./user.mock.ts";

// Helper pour récupérer un utilisateur par son ID (pour simuler la relation)
const getUser = (userId: string) => usersMock.find((u) => u.id === userId) || usersMock[0];

export const postsMock: Post[] = [
    {
        id: "p1",
        content: "Bienvenue sur notre nouveau réseau social ! Ravi de voir tout le monde ici. 👋",
        createdAt: "2023-10-01T08:00:00Z",
        updatedAt: "2023-10-01T08:00:00Z",
        account: getUser("u3"), // Charlie (Admin)
    },
    {
        id: "p2",
        content: "Je viens de finir mon premier marathon ! 🏃‍♀️ Quelle expérience incroyable.",
        createdAt: "2023-10-01T09:15:00Z",
        updatedAt: "2023-10-01T09:15:00Z",
        account: getUser("u1"), // Alice
    },
    {
        id: "p3",
        content: "Quelqu'un a des recommandations pour un bon livre de science-fiction ? 📚",
        createdAt: "2023-10-01T10:30:00Z",
        updatedAt: "2023-10-01T10:30:00Z",
        account: getUser("u2"), // Bob
    },
    {
        id: "p4",
        content: "Aujourd'hui, j'apprends TypeScript. C'est typé, c'est carré, j'adore. 💻 #coding #typescript",
        createdAt: "2023-10-01T11:45:00Z",
        updatedAt: "2023-10-01T11:45:00Z",
        account: getUser("u5"), // Eric
    },
    {
        id: "p5",
        content: "Recette du jour : Tarte aux pommes maison. 🍎 1. Pâte brisée 2. Pommes 3. Sucre... Miam !",
        createdAt: "2023-10-01T13:00:00Z",
        updatedAt: "2023-10-01T13:00:00Z",
        account: getUser("u8"), // Helena
    },
    {
        id: "p6",
        content: "La vue depuis mon bureau ce matin est juste magnifique. 🏔️",
        createdAt: "2023-10-02T07:30:00Z",
        updatedAt: "2023-10-02T07:30:00Z",
        account: getUser("u4"), // Diana
    },
    {
        id: "p7",
        content: "Salut @bob ! Tu devrais lire 'Dune' si ce n'est pas déjà fait.",
        createdAt: "2023-10-02T08:45:00Z",
        updatedAt: "2023-10-02T08:45:00Z",
        account: getUser("u6"), // Fiona
    },
    {
        id: "p8",
        content: "Est-ce que quelqu'un sait comment centrer une div ? Je demande pour un ami... 😅 #css",
        createdAt: "2023-10-02T10:10:00Z",
        updatedAt: "2023-10-02T10:10:00Z",
        account: getUser("u7"), // George
    },
    {
        id: "p9",
        content: "Nouveau morceau de guitare en cours d'apprentissage. C'est dur mais ça vient ! 🎸",
        createdAt: "2023-10-02T14:20:00Z",
        updatedAt: "2023-10-02T14:20:00Z",
        account: getUser("u10"), // Julia
    },
    {
        id: "p10",
        content: "Match incroyable hier soir ! L'équipe a vraiment tout donné. ⚽",
        createdAt: "2023-10-03T09:00:00Z",
        updatedAt: "2023-10-03T09:00:00Z",
        account: getUser("u9"), // Ivan
    },
    {
        id: "p11",
        content: "Petite mise à jour de la plateforme : nous avons corrigé le bug des avatars. Merci de votre patience !",
        createdAt: "2023-10-03T11:00:00Z",
        updatedAt: "2023-10-03T11:00:00Z",
        account: getUser("u3"), // Charlie
    },
    {
        id: "p12",
        content: "Café numéro 3 de la journée. La productivité est à son maximum (ou pas). ☕",
        createdAt: "2023-10-03T15:30:00Z",
        updatedAt: "2023-10-03T15:30:00Z",
        account: getUser("u1"), // Alice
    },
    {
        id: "p13",
        content: "Je confirme, centrer une div c'est tout un art @george ! Utilise Flexbox. 😉",
        createdAt: "2023-10-03T16:45:00Z",
        updatedAt: "2023-10-03T16:45:00Z",
        account: getUser("u5"), // Eric
    },
    {
        id: "p14",
        content: "Bonne nuit tout le monde ! 🌙",
        createdAt: "2023-10-03T22:00:00Z",
        updatedAt: "2023-10-03T22:00:00Z",
        account: getUser("u2"), // Bob
    },
    {
        id: "p15",
        content: "Aujourd'hui c'est jardinage ! Mes tomates commencent à rougir. 🍅",
        createdAt: "2023-10-04T08:15:00Z",
        updatedAt: "2023-10-04T08:15:00Z",
        account: getUser("u8"), // Helena
    },
    {
        id: "p16",
        content: "Qui est partant pour une séance de ciné ce soir ? 🎬",
        createdAt: "2023-10-04T13:40:00Z",
        updatedAt: "2023-10-04T13:40:00Z",
        account: getUser("u4"), // Diana
    },
    {
        id: "p17",
        content: "J'ai enfin fini ce puzzle de 1000 pièces. Plus jamais ça. 😂",
        createdAt: "2023-10-04T17:55:00Z",
        updatedAt: "2023-10-04T17:55:00Z",
        account: getUser("u6"), // Fiona
    },
    {
        id: "p18",
        content: "Quelqu'un utilise Linux ici ? J'hésite à changer d'OS.",
        createdAt: "2023-10-05T10:20:00Z",
        updatedAt: "2023-10-05T10:20:00Z",
        account: getUser("u9"), // Ivan
    },
    {
        id: "p19",
        content: "Répétition générale ce soir avec le groupe. Ça va faire du bruit ! 🥁",
        createdAt: "2023-10-05T18:30:00Z",
        updatedAt: "2023-10-05T18:30:00Z",
        account: getUser("u10"), // Julia
    },
    {
        id: "p20",
        content: "C'est vendredi ! Bon week-end à tous la team. 🎉",
        createdAt: "2023-10-06T16:00:00Z",
        updatedAt: "2023-10-06T16:00:00Z",
        account: getUser("u7"), // George
    },
];