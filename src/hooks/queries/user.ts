import {queryOptions} from "@tanstack/react-query";
import {getAccountDetails, getMyInfo, getUserById} from "../../services/user.service.ts";

export const userQueries = {
    summary: (id: string | undefined) => queryOptions({
        queryKey: ['account', id],
        queryFn: () => getUserById(id),
        staleTime: 30 * 1000,
    }),
    me: () => queryOptions({
        queryKey: ['account', 'me'],
        queryFn: () => getMyInfo(),
        staleTime: 1000 * 60 * 15,
        gcTime: Infinity,
    }),
    myDetails: () => queryOptions({
        queryKey: ['account', 'me', 'details'],
        queryFn: () => getAccountDetails(),
    })
}