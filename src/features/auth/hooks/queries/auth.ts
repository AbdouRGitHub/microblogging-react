import {queryOptions} from "@tanstack/react-query";

export const authQueries = {
    check: () => queryOptions({
        queryKey: ['auth', 'check'],
    }),
}