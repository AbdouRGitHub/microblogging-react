import {useQuery} from "@tanstack/react-query";
import {getUserById} from "../services/user.service.ts";

export function useUserDetails(userId: string | undefined) {
    return useQuery({
        queryKey: ['account', userId],
        queryFn: () => getUserById(userId),
        staleTime: 30 * 1000,
    });
}