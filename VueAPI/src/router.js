import Vue from "vue";
import VueRouter from "vue-router";
import {ifNotAuthed, ifAuthed} from "./plugins/auth";
import articleDetail from "./pages/articleDetail";
import changePassword from "./pages/changePassword";
import loginPage from "./pages/loginPage";
import postUpload from "./pages/postUpload";
import registerPage from "./pages/registerPage";
import userPage from "./pages/userPage";
import userProfile from "./pages/userProfile";
import homePage from "./pages/homePage";
import searchPage from "./pages/searchPage";

Vue.use(VueRouter);

const routes = [ 
   { 
      path: "/", 
      component: homePage, 
      name: "homePage"
   },
   { 
      path: "/login", 
      component: loginPage, 
      name: "loginPage", 
      beforeEnter:ifNotAuthed
   },
   { 
      path: "/logout", 
      component: loginPage, 
      name: "logoutPage", 
      beforeEnter:ifAuthed
   },
   { 
      path: "/register", 
      component: registerPage, 
      name: "registerPage", 
      beforeEnter:ifNotAuthed 
   },
   { 
      path: "/upload", 
      component: postUpload, 
      name: "postUpload" 
   },
   
   { 
      path: "/detail/:id", 
      component: articleDetail, 
      name: "articleDetail" 
   },
   { 
      path: "/user/:id/password", 
      component: changePassword, 
      name: "changePassword",
      beforeEnter: ifAuthed, 
   },
   { 
      path: "/user/:id/profile", 
      component: userProfile, 
      name: "userProfile",
      beforeEnter: ifAuthed, 
   },
   { 
      path: "/user/:id", 
      component: userPage, 
      name: "userPage" ,
      beforeEnter: ifAuthed,
   },
   { 
      path: "/search", 
      component: searchPage, 
      name: "searchPage" ,
   },
];
const router = new VueRouter({
   // mode: "history",
   routes
});
export default router;