import {queryOptions} from "@tanstack/react-query";
import {getUserById} from "../../services/user.service.ts";

export const userQueries = {
    details: (id: string | undefined) => queryOptions({
        queryKey: ['account', id],
        queryFn: () => getUserById(id),
        staleTime: 30 * 1000,
    }),

}