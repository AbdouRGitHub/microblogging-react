import {HTTPError} from "ky";
import kyClient from "../utils/kyClient";

export interface ApiSuccess {
    success: true;
}

export interface ApiError {
    success: false;
    status?: number;
    message: string;
}

export type LoginResponse = ApiSuccess | ApiError;

async function signIn(username: string, password: string): Promise<LoginResponse> {
    try {
        await kyClient.post('auth/login', {
            json: {username, password},
        }).json();
        return {
            success: true
        };
    } catch (error: unknown) {
        if (error instanceof HTTPError) {
            const message = await error.response.text();

            return {
                success: false,
                status: error.response.status,
                message,
            };
        }

        return {
            success: false,
            message: "Une erreur est survenue, Réesayer plus tard",
        };
    }

}
export {signIn};