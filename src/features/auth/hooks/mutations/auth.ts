import {mutationOptions} from "@tanstack/react-query";
import {signIn} from "../../services/auth.service.ts";

export const authQueries = {
    signIn: (onSuccessFn: () => void, onErrorFn: (error: Error) => void) => mutationOptions({
        mutationFn: signIn,
        onSuccess: onSuccessFn,
        onError: onErrorFn
    }),
}