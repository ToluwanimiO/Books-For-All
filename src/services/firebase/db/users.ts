import db from "./index"
import {doc, setDoc,getDoc} from "firebase/firestore"

export const createUserData = async (uid:string, data:any) =>{
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, data, {merge:true})
}
export const getUserProfile = async (uid:string) =>{
    const docRef = doc(db, "users", uid)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) {
        throw new Error("User profile not found")
    }

    return docSnap.data()
}