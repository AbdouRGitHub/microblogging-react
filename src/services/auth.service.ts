import kyClient from "../utils/kyClient";
import type {Inputs} from "../pages/SignIn.tsx";
import type {SignUpInputs} from "../pages/SignUp.tsx";

async function signIn(inputs: Inputs) {
    return await kyClient.post('auth/login', {
        json: inputs,
    }).json();
}

async function signUp(inputs: SignUpInputs) {
    return await kyClient.post('accounts', {
        json: inputs,
    }).json();
}

async function signOut() {
}

export {signIn, signUp, signOut};