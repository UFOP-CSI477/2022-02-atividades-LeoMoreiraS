import { Router } from "@/plugins";

const Register = import(
  /* webpackChunkName: "register" */ "@/views/register/Register.vue"
);

Router.addRoutes([
  {
    path: "/register",
    name: "register",
    component: () => Register,
  },
]);
