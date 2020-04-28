import Vue from "vue";
import Vuex from "vuex";
import moduleUser from "./moduleUser/index.moduleUser";
import modulePost from "./modulePost/index.modulePost";
Vue.use(Vuex);
const store = new Vuex.Store({
   state: {
      isLoading: false
   },
   actions: {
      set_loading({commit}, loading = false){
         commit("set_loading", loading);
      },
   },
   mutations: {
      set_loading(state, loading = false){
         state.isLoading = loading;
      },
   },    
   modules: {
      moduleUser,
      modulePost
   },
});
export default store;