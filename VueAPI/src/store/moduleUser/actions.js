import axiosInstance from "../../plugins/axios";
import {parseJwt} from "../../helpers/formatString.helper";
import {ACC_TOKEN} from "../../consts/index.const";
export default {
   async getListPostByUserID({commit}, userid){
      let config = {
         params: {
            userid,
         },
         headers: { 
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem(ACC_TOKEN),
         },
      };
      try {
         let resultArticles = await axiosInstance.get("/post/getListPostUserID.php?", config);
         if(resultArticles.data.status === 200){
            let data = {
               userid: userid,
               post: resultArticles.data.posts,
            }
            commit("setUserPost", data);
            return{
               ok: true,
               posts: resultArticles.data.posts || [],
               error: null
            }
         }else{
            return {
               ok: false,
               error: null
            }
         }
      } catch (error) {
         return {
            ok: false,
            error: result.message
         }
      }
   },
   async getUserById({commit}, userId){
      try {
         let result = await axiosInstance.get("/member/member.php?userid=" + userId);
         if(result.data.status === 200){
            commit("setUserInfo", result.data.user);
            return{
               ok: true,
               data: result.data.user,
               error: null
            }
         }else{
            return {
               ok: false,
               error: result.message
            }
         }
      } catch (error) {
         return {
            ok: false,
            error: error.message
         }
      }
   },
   async login({commit, dispatch}, {email = "", password = ""}){
      let data = {
         email, password,
      };
      try {
         commit("set_loading", true);
         let result = await axiosInstance.post("/member/login.php", data);
         commit("set_loading", false);
         if(result.data.status === 200){
            commit("setUserInfo", result.data.user);
            commit("setLoginInfo", result.data);
            await dispatch("getListPostByUserID", result.data.user.USERID);
            return {
               ok: true,
               data: result.data,
               error: null
            }
         }else{
            return {
               ok: false,
               error: result.data.error
            }
         }
      } catch (error) {
         return {
            ok: false,
            error: error.message
         }
      }
   },
   async checkLogin({commit, dispatch}){
      try {
         let token = localStorage.getItem(ACC_TOKEN);
         let userObj = parseJwt(token);
         if(userObj){
            let promiseUser = dispatch("getUserById", userObj.id);
            let promisePost = dispatch("getListPostByUserID", userObj.id);
            let [resultUser, resultPost] = await Promise.all([promiseUser, promisePost]);
            if(resultUser.ok && resultPost.ok){
               let data = {
                  user: resultUser.data,
                  token,
               };
               commit("setLoginInfo", data);
               return {
                  ok: true,
                  error: null,
               }
            }
         }
         return {
            ok: false,
         }
      } catch (error) {
         return{
            ok: false,
            error,
         }
      }
   },
   async logout({commit}){
      commit("logout");
   },
   async register({commit, dispatch}, data){
      try {
         commit("set_loading", true);
         let result = await axiosInstance.post("/member/register.php", data);
         commit("set_loading", false);
         if(result.data.code === 200){
            let data = {
               token: result.data.token,
               user: result.data.user
            };
            commit("setUserInfo", result.data.user);
            commit("setLoginInfo", data);
            await dispatch("getListPostByUserID", result.data.user.USERID);
            return {
               ok: true,
               data: result.data,
               error: null
            }
         }else{
            return {
               ok: false,
               error: result.data.error,
            }
         }
      } catch (error) {
         return {
            ok: false,
            error: error.message,
         }
      }
   },
   async editProfile({commit}, {fullname = "", description= "", gender= "", objForm= ""}){
      try {
         let formData = new FormData();
         formData.append("fullname", fullname);
         formData.append("description", description);
         formData.append("gender", gender);
         if(objForm){
            formData.append("avatar", objForm);
         }
         let config = {
            headers: {
               "Content-Type": "multipart/form-data",
               "Authorization": "Bearer " + localStorage.getItem(ACC_TOKEN),
            }
         };
         commit("set_loading", true);
         let result = await axiosInstance.post("/member/update.php", formData, config);
         commit("set_loading", false);
         if(result.data.status === 200){
            commit("setCurrUser", result.data.user);
            return {
               ok: true,
               user: result.data.user,
            }
         }else{
            return {
               ok: false,
               error: result.data.error,
            }
         }
      } catch (error) {
         commit("set_loading", false);
         return {
            ok: false,
            error,
         }
      }
   },
   async changePassword({commit}, data){
      try {
         let config = {
            headers: {
               "Content-Type": "application/json",
               "Authorization": "Bearer " + localStorage.getItem(ACC_TOKEN),
            }
         };
         commit("set_loading", true);
         let result = await axiosInstance.post("/member/password.php", data, config);
         commit("set_loading", false);
         if(result.data.status === 200){
            return{
               ok: true,
               error: null,
               message: result.data.message,
            }
         }else{
            return {
               ok: false,
               error: result.message
            }
         }
      } catch (error) {
         commit("set_loading", false);
         return {
            ok: false,
            error,
         }
      }
   },
};
