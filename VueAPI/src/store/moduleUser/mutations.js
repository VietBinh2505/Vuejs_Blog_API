import Vue from "vue";
import {ACC_TOKEN} from "../../consts/index.const";
export default {
   setUserInfo(state, user){
      Vue.set(state.users, user.USERID, user);
   },
   setUserPost(state, {post, userid}){
      Vue.set(state.posts, userid, post);
   },
   setLoginInfo(state, {user = null, token = ""}){
      localStorage.setItem(ACC_TOKEN, token);
      state.currentUser = user;
      state[ACC_TOKEN] = token;
   },
   logout(state){
      state[ACC_TOKEN] = "";
      state.currentUser = null;
      localStorage.removeItem(ACC_TOKEN);
   },
   setCurrUser(state, user){
      state.currentUser = user;
   }
};
