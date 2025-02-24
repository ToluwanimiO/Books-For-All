import Donate from "@/pages/dashboard/donate.vue";
import FindBook from "@/pages/dashboard/find-book.vue";
import PartnerSchools from "@/pages/dashboard/partner-schools.vue";
import RegisterSchool from "@/pages/dashboard/register-school.vue";
import ReportViolation from "@/pages/dashboard/report-violation.vue";
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
      path: '/donate',
      name: "donate",
      component: shallowRef(Donate).value,
      meta: {
        module: "dashboard",
        permission: "user",
        layout: "AppLayoutSideNav"
      },
    },
    {
      path: "/find-book",
      name: "find-book",
      component: shallowRef(FindBook).value,
      meta: {
        module: "dashboard",
        permission: "guest",
        layout: "AppLayoutSideNav"
      },
    },
    {
      path: '/register-school',
      name: "register-school",
      component: shallowRef(RegisterSchool).value,
      meta: {
        module: "dashboard",
        permission: "user",
        layout: "AppLayoutSideNav"
      },
    },
    {
      path: '/report-violation',
      name: "report-violation",
      component: shallowRef(ReportViolation).value,
      meta: {
        module: "dashboard",
        permission: "user",
        layout: "AppLayoutSideNav"
      },
    },
  ];
};

export default routes();
