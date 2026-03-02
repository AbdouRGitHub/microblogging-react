import {mutationOptions, queryOptions} from "@tanstack/react-query";
import {signUp} from '../../services/auth.service.ts'

export const authQueries = {
    check: () => queryOptions({
        queryKey: ['auth', 'check'],
    }),
    signUp: () => mutationOptions({
        mutationFn: signUp
    })
}