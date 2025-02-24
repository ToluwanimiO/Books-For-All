import axios from "axios";

const list = (params = "") => {
    return axios.get("books" + params);
}
const getSingleEmployee = (employeeId:number) => {
    return axios.get(`employees/${employeeId}`);
}
const search = (searchTerm = "") => {
    return axios.get("employees?search=" + searchTerm);
}

const exportItems = () => {
    return axios.post("subscriptions");
}

const summary = () => {
    return axios.get("employees/summary");
}
const addEmployees = (payload:any)=>{
    return axios.post("employees",payload);
}
const addBulkEmployees = (payload:any)=>{
    return axios.post("employees/bulk_upload",payload);
}
const deleteEmployees = (payload:any)=>{
    return axios.delete(`employees`, { data: payload });
}
const deactivateEmployees = (payload:any)=>{
    return axios.post(`employees/deactivate`,  payload );
}
const reactivateEmployees = (payload:any)=>{
    return axios.post(`employees/reactivate`,  payload );
}
export default {
    list,
    search,
    exportItems,
    summary,
    addEmployees,
    deleteEmployees,
    deactivateEmployees,
    reactivateEmployees,
    getSingleEmployee,
    addBulkEmployees
}