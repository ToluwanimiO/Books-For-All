const Settings = () => import("../pages/settings.vue");

const routes = () => {
  return [
    {
      path: '/settings',
      name: "settings",
      component: Settings,
      meta: {
        module:"settings",
        permission: "user",
        layout: "AppLayoutSideNav"
      },
    },
  ];
};

export default routes();
