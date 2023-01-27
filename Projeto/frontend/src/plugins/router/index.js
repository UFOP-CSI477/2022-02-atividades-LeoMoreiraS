import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL || "",
  routes: [],
});

export const Router = {
  instance: router,

  addRoutes(routes) {
    routes.forEach((route) => router.addRoute(route));
  },
};
