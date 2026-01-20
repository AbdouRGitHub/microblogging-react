import type {User} from "../models/user.model.ts";
import kyClient from "../utils/kyClient.ts";

async function getUserById(userId: string | undefined): Promise<User> {
    return await kyClient.get(`accounts/${userId}`).json<User>();
}

async function getMyInfo(): Promise<User> {
    return await kyClient.get('accounts/me').json<User>();
}

async function signUp(username: string, email: string, password: string): Promise<User> {
    return await kyClient.post('accounts', {
        json: {
            username, email, password
        }
    }).json<User>();
}

export {getUserById, getMyInfo, signUp};