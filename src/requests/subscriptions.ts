import axios from "axios";

export function createSubscriptionDraft(payload: any) {
  return axios.post("subscriptions", payload);
}
export function updateSubscription(id: number, payload: any) {
  return axios.patch(`subscriptions/${id}`, payload);
}
export function editSubscriptionMidCycle(id: number, payload: any) {
  return axios.patch(`subscriptions/${id}/services`, payload);
}
export function getSubscriptions(params: string) {
  return axios.get(`subscriptions?status=${params}`);
}
export function getSubscriptionDetails(id: number) {
  return axios.get(`subscriptions/${id}`);
}
export function singleUploadEmployees(id: number, payload: any) {
  return axios.post(`subscriptions/${id}/employees`, payload);
}
export function bulkUploadEmployees(id: number, payload: any) {
  return axios.post(`subscriptions/${id}/employees/bulk_upload`, payload);
}
export function getPaymentURL(id: number) {
  return axios.get(`subscriptions/${id}/pay`);
}
export function addCard(id: number) {
  return axios.get(`subscriptions/${id}/add_card`)
}
export function pauseServices(id: number, payload: any) {
  return axios.post(`subscriptions/${id}/services/pause`, payload);
}
export function getActivePauses(id: number) {
  return axios.get(`subscriptions/${id}/redeemable_services/active_pauses`)
}
export function getRedeemableServices(id: number) {
  return axios.get(`subscriptions/${id}/redeemable_services`)
}
export function getRedeemableServiceDetails(subscriptionId: number, id: number) {
  return axios.get(`subscriptions/${subscriptionId}/redeemable_services/${id}`)
}
export function redeemService(subscriptionId: number, id: number, payload: any) {
  return axios.post(`subscriptions/${subscriptionId}/redeemable_services/${id}`, payload)
}
export function getPauseLogs(id: number) {
  return axios.get(`subscriptions/${id}/services/pause_logs`)
}
export function getHistory(id: number) {
  return axios.get(`subscriptions/${id}/history`)
}
export function unpauseServices(id: number, payload: any) {
  return axios.post(`subscriptions/${id}/services/unpause`, payload)
}
export function editPausePeriod(id: number, payload: any) {
  return axios.post(`subscriptions/${id}/services/edit_pause`, payload)
}
export function renewSubscription(id: number) {
  return axios.get(`subscriptions/${id}/renew`)
}
export function getOutstandingAmount(id: number, payload: any) {
  return axios.post(`subscriptions/${id}/outstanding`, payload)
}