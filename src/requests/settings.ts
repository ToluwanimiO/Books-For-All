import axios from "axios";

export function changePassword(id:number,payload:Record<string, unknown>) {
  return axios.post(`users/${id}/change_password`, payload);
}
export function getAllAdmins() {
    return axios.get('admins');
}
export function sendAdminIvite(payload:Record<string, unknown>) {
    return axios.post('admins/invite',payload);
}
export function removeAdmin(id:number) {
    return axios.patch(`admins/${id}/remove`);
}