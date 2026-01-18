import kyClient from "../utils/kyClient";
import type {Inputs} from "../pages/SignIn.tsx";

export interface ApiSuccess {
    success: true;
}

export interface ApiError {
    success: false;
    status?: number;
    message: string;
}

export type LoginResponse = ApiSuccess | ApiError;

async function signIn(inputs: Inputs): Promise<LoginResponse> {
    return await kyClient.post('auth/login', {
        json: inputs,
    }).json();
}

export {signIn};