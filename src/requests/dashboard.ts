import axios from "axios";
const getDashboardOverview = (dateRange:string) => {
    return axios.get(`dashboard/summary${dateRange}`);
}
const getDashboardSubscriptionSummary = (id:Number,dateRange:string) => {
    return axios.get(`dashboard/subscriptions/${id}${dateRange}`);
}
const getActivityFeed = (endDate:string) => {
    return axios.get(`activity_feeds${endDate}`);
}
export default {
    getDashboardOverview,
    getDashboardSubscriptionSummary,
    getActivityFeed
}