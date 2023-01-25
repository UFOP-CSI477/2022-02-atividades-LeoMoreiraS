import { Router } from "@/plugins";

const ListView = import(
  /* webpackChunkName: "list" */ "@/views/list/ListView.vue"
);

Router.addRoutes([
  {
    path: "/list",
    name: "list",
    component: () => ListView,
  },
]);
