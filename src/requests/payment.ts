import axios from "axios";


const getWalletBalance = () => {
    return axios.get(`billing/wallet_balance`);
}
const getBillingHistory = (params='') => {
    if(params){
        return axios.get(`billing/history?${params}`);
    }
    return axios.get(`billing/history`);
}
const getWalletBreakdown = () => {
    return axios.get(`billing/wallet_breakdown`);
}
const getCards = () => {
    return axios.get(`billing/cards`);
}
const addCardUrl = () => {
    return axios.get(`billing/cards/add_url`);
}
const setDefaultCard = (cardId:number) => {
    return axios.patch(`billing/cards/${cardId}/set_default`);
}
const getAutobilling = () => {
    return axios.get(`billing/auto_billing/settings`);
}
const updateAutoBilling = (payload:any) => {
    return axios.put(`billing/auto_billing/settings`,payload);
}
const deleteCard = (cardId:number,payload:any) => {
    return axios.delete(`billing/cards/${cardId}`,{ data: payload });
}
export default {
    getWalletBalance,
    getBillingHistory,
    getWalletBreakdown,
    getCards,
    addCardUrl,
    setDefaultCard,
    deleteCard,
    updateAutoBilling,
    getAutobilling
}