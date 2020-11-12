import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import AddNewItems from "../components/admin/AddNewItems.vue";
import Login from "../components/admin/Login.vue";
import Shop from "../views/Shop.vue";
import Contact from "../views/Contact.vue";
import Faq from "../views/Faq.vue";
import Safety from "../views/Safety.vue";

import firebase from "firebase";
import "firebase/firestore";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/contact",
      name: "Contact",
      component: Contact,
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/addNew",
      name: "AddNew",
      component: AddNewItems,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "*",
      redirect: "/",
    },
    {
      path: "/shop",
      name: "shop",
      component: Shop,
    },
    {
      path: "/faq",
      name: "faq",
      component: Faq,
    },
    {
      path: "/safety",
      name: "safety",
      component: Safety,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next("login");
  else next();
});

export default router;
