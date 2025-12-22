import ky from 'ky';
import type {User} from "../models/user.model.ts";

async function getUserById(userId: string | undefined): Promise<User> {
    return await ky.get(`http://localhost:8080/accounts/${userId}`).json<User>();
}

export {getUserById};