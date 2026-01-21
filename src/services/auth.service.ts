import kyClient from "../utils/kyClient";
import type {Inputs} from "../pages/SignIn.tsx";

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