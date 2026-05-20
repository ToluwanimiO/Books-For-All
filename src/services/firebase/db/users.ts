import db from "./index"
import {doc, setDoc} from "firebase/firestore"

export const updateUserData = async (uid:string, data:any) =>{
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, data, {merge:true})
}