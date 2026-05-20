import axios from "axios";

export function login(payload:any) {
  console.log(payload)
  return axios.post("auth/login", payload);
}
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

import {register, updateUserData} from "@/services/firebase"
import { AuthCredentials } from "@/types";

export const registerUser = async (payload:AuthCredentials) =>{
  return await register(payload)
}

export const updateProfileRequest = async (payload:any)=>{
  return await updateUserData(payload.uid, payload.data)
}