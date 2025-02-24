import { ROUTES } from "@/router/route-names";

const all = ["donor", "student", "school"];

const stewards = ["steward", "ofa"];

export interface NavItem {
  icon: string;
  label: string;
  name: string;
  access: string[];
  active: boolean;
  sub_routes?: NavItem[];
}

export const navRoutes = (): NavItem[] => {
  return [
    {
      icon: "eden-icon-dashboard",
      label: "Dashboard",
      name: "dashboard",
      access: all.concat(["all"]),
      active: true,
    },
    {
      icon: "eden-icon-users",
      label: "Partner Schools",
      name: "partner-schools",
      access: all.concat(["all"]),
      active: true,
    },
    {
      icon: "fa fa-gift",
      label: "Donate",
      name: "donate",
      access: ["donor","all"],
      active: true,
    },
    // {
    //   icon: "order-fulfillment",
    //   label: "One-Off orders",
    //   name: "one-off-orders",
    //   access: all.concat(["kitchen", "gardener"]),
    //   active: true,
    // },
    {
      icon: "eden-icon-search",
      label: "Find a Book",
      name: "find-book",
      access: all.concat(["all"]),
      active: true,
    },
    // {
    //   icon: "eden-icon-orders",
    //   label: "Register New School ",
    //   name: "register-school",
    //   access: stewards.concat(["superadmin", "admin"]),
    //   active: true,
    // },
    {
      icon: "eden-icon-alert-circle",
      label: "Report Violation",
      name: "report-violation",
      access: all,
      active: true,
    },
    {
      icon: "eden-icon-settings",
      label: "Settings",
      name: "settings",
      access: all,
      active: true,
    },
  ];
};
