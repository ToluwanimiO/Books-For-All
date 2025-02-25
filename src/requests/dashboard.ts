import axios from "axios";
export function reportViolation(payload: any) {
  return axios.post(`violation`, payload);
}
export function donateBooks(payload: any) {
  return axios.post(`books`, payload);
}
export function getAllBooks() {
  return axios.get(`books`);
}
