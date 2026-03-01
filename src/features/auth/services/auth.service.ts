import kyClient from "../../../shared/utils/kyClient.ts";
import type {Inputs} from "../SignIn.tsx";

async function signIn(inputs: Inputs) {
    return await kyClient.post('auth/login', {
        json: inputs,
    }).json();
}

async function signUp() {
}

async function signOut() {
}

export {signIn, signUp, signOut};