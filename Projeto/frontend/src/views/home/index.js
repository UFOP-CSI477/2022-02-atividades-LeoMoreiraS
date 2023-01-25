import { Router } from "@/plugins";

const HomeView = import(
  /* webpackChunkName: "home" */ "@/views/home/HomeView.vue"
);

Router.addRoutes([
  {
    path: "/",
    name: "home",
    component: () => HomeView,
  },
]);
