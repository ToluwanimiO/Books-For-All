import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "./config";

import { AuthCredentials } from "@/types";

const auth = getAuth(app);
export const register = (payload: AuthCredentials) => {
    return createUserWithEmailAndPassword(auth, payload.email, payload.password)
}
export const login = (payload: AuthCredentials) => {
    return signInWithEmailAndPassword(auth, payload.email, payload.password)
}
export const logOut = () => {
    return signOut(auth)    
}
export default auth

