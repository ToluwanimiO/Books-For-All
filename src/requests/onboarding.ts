import axios from "axios";

export function updateOnboarding() {
  const payload = {
    "onboarded_to_eden_business": true
  }
  return axios.patch("users/profile", payload);
}
export function updateAdminProfile(payload:any) {
  return axios.patch("users/profile",payload);
}
export function updateCompanyProfile(payload:any,id:number) {
  return axios.patch(`companies/${id}`,payload);
}
export function getCompanyInfo(id:number) {
  return axios.get(`companies/${id}`);
}
export function getCountries() {
  return axios.get("countries");
}
export function getLocationAreas() {
  return axios.get("location_areas");
}
export function getStates(id:number) {
  return axios.get(`countries/${id}/states`);
}
export function waitingList(payload:any) {
  return axios.post(`locations/waiting_list`,payload);
}
export function getAllCountries() {
  return axios.get(`countries/all`);
}
