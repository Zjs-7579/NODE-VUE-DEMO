import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Registered from "../views/Registered.vue";
import Admin from "../views/Admin.vue"
import SuperAdmin from "../views/SuperAdmin.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/registered",
    name: "Registered",
    component: Registered,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    children:[
      {
        path: "/admin/main",
        name: "Main",
        component: ()=>import("../components/admin/Main.vue"),
      },
      {
        path: "/admin",
        redirect: "/admin/main"
      },
      {
        path: "/admin/adminnewslist",
        name: "AdminNewsList",
        component: ()=>import("../components/admin/AdminNewsList.vue"),
      },
      {
        path: "/admin/newseditor",
        name: "NewsEditor",
        component: ()=>import("../components/admin/NewsEditor.vue"),
      },
      {
        path: "/admin/newsstatus",
        name: "NewsStatus",
        component: ()=>import("../components/admin/NewsStatus.vue"),
      },
      {
        path: "/admin/adminpersonage",
        name: "AdminPersonage",
        component: ()=>import("../components/admin/AdminPersonage.vue"),
      }
    ]
  },
  {
    path: "/superadmin",
    name: "SuperAdmin",
    component: SuperAdmin,
    children:[
      {
        path: "/superadmin/home",
        name: "Home",
        component: ()=>import("../components/superadmin/Home.vue"),
      },
      {
        path: "/superadmin",
        redirect: "/superadmin/home"
      },
      {
        path: "/superadmin/newslist",
        name: "NewsList",
        component: ()=>import("../components/superadmin/NewsList.vue"),
      },
      {
        path: "/superadmin/adminclass",
        name: "AdminClass",
        component: ()=>import("../components/superadmin/AdminClass.vue"),
      },
      {
        path: "/superadmin/usereditor",
        name: "UserEditor",
        component: ()=>import("../components/superadmin/UserEditor.vue"),
      },
      {
        path: "/superadmin/usersuper",
        name: "UserSuper",
        component: ()=>import("../components/superadmin/UserSuper.vue"),
      },
      {
        path: "/superadmin/newscheck",
        name: "NewsCheck",
        component: ()=>import("../components/superadmin/NewsCheck.vue"),
      },
      {
        path: "/superadmin/personage",
        name: "Personage",
        component: ()=>import("../components/superadmin/Personage.vue"),
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
