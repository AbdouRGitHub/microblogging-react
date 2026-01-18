import {mutationOptions} from "@tanstack/react-query";
import {signIn} from "../../services/auth.service.ts";
import {HTTPError} from "ky";

export const authQueries = {
    signIn: (onSuccessFn: () => void, onError: (message: string) => void) => mutationOptions({
        mutationFn: signIn,
        onSuccess: onSuccessFn,
        onError: async (error) => {
            if (error instanceof HTTPError) {
                const message = await error.response.text();
                onError(message);
            } else {
                onError("Une erreur est survenue, réessayez plus tard");
            }
        },
    }),
}