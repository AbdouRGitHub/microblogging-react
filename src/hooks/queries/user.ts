import {queryOptions} from "@tanstack/react-query";
import {getMyInfo, getUserById} from "../../services/user.service.ts";

export const userQueries = {
    details: (id: string | undefined) => queryOptions({
        queryKey: ['account', id],
        queryFn: () => getUserById(id),
        staleTime: 30 * 1000,
    }),
    me: () => queryOptions({
        queryKey: ['account', 'me'],
        queryFn: () => getMyInfo(),
        staleTime: 1000 * 60 * 15,
        gcTime: Infinity,
    })
}