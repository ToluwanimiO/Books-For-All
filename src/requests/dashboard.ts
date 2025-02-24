import axios from "axios";
export function reportViolation(payload: any) {
  return axios.post(`violation`, payload);
}
