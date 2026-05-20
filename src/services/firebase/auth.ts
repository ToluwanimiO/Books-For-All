import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "./config";

import { AuthCredentials } from "@/types";

const auth = getAuth(app);
export const register = (payload: AuthCredentials) => {
    return createUserWithEmailAndPassword(auth, payload.email, payload.password)
}
export default auth

