import axios from "axios";

export function resendEmail(payload:any) {
  return axios.post(`users/resend_verification`, payload);
}
export function verifyAccount(payload:any) {
  return axios.post(`users/verify`, payload);
}
export function resetPassword(payload:any) {
  return axios.post(`users/update_password`, payload);
}

export function forgotPassword(payload:any) {
  return axios.post(`users/forgot_password`,payload);
}
export function getAllSchools() {
  return axios.get(`auth/schools`);
}

// new start
import {login, register, updateUserData, logOut} from "@/services/firebase"
import { AuthCredentials } from "@/types";

export const registerUser =  (payload:AuthCredentials) => register(payload)
export const loginUser =  (payload:AuthCredentials) => login(payload)
export const logOutUser = () => logOut()

export const updateProfileRequest = async (payload:any)=>{
  return await updateUserData(payload.uid, payload.data)
}