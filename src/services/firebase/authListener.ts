import {onAuthStateChanged} from "firebase/auth"
import auth from "./auth";
import { useAuthStore } from "@/store/auth";

export const initAuthListener = ()=>{
    const authStore = useAuthStore()
   onAuthStateChanged(auth, (user) => {
    if (user){
        authStore.setUser(user)
    }else{
        authStore.clearUser()
    }
   })
}