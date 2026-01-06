import ky, {HTTPError} from "ky";

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
        await ky.post('http://localhost:8080/auth/login', {
            json: {username, password},
            credentials: 'include'
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