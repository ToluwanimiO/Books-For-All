import PartnerSchools from "@/pages/dashboard/partner-schools.vue";
import { shallowRef } from "vue";

const Dashboard = () => import("@/pages/dashboard/dashboard.vue");

const routes = () => {
  return [
    {
      path: '/dashboard/:view?',
      name: "dashboard",
      component: shallowRef(Dashboard).value,
      meta: {
        module: "dashboard",
        permission: "user",
        layout: "AppLayoutSideNav"
      },
    },
    {
      path: "/partner-schools",
      name: "partner-schools",
      component: shallowRef(PartnerSchools).value,
      meta: {
        module: "dashboard",
        permission: "user",
        layout: "AppLayoutSideNav"
      },
    },
    {
      path: "/profile/verify",
      name: "verify-account",
      component: shallowRef(Dashboard).value,
      meta: {
        module: "dashboard",
        permission: "guest",
        layout: "AppLayoutSideNav"
      },
    },
  ];
};

export default routes();
