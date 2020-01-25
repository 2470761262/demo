import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/Middle",
    name: "middle",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "middle" */ "../views/Middle.vue"),
    meta: {
      routeArray: [
        {
          path: "",
          name: "系统管理"
        }
      ]
    },
    redirect: "/Middle/Details",
    children: [
      {
        path: "/Middle/Details",
        name: "details",
        meta: {
          routeArray: [
            {
              path: "",
              name: "系统管理"
            },
            {
              path: "",
              name: "应用管理"
            }
          ]
        },
        component: () =>
          import(/* webpackChunkName: "details" */ "../views/Details.vue")
      },
      {
        path: "/Middle/List",
        name: "list",
        meta: {
          routeArray: [
            {
              path: "",
              name: "系统管理"
            },
            {
              path: "",
              name: "日志管理"
            }
          ]
        },
        component: () =>
          import(/* webpackChunkName: "list" */ "../views/List.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
