import axiosInstance from "../../plugins/axios";
import {PAGE_SIZE, CURRENT_PAGE, ACC_TOKEN} from "../../consts/index.const";
export default {
   async getlistPostHasPaging({commit}, {pagesize = PAGE_SIZE, currPage = CURRENT_PAGE, tagIndex = null}){
      commit("set_loading", true);
      try {
         let config = {
            params: {
               pagesize,
               currPage
            }
         };
         let result = "";
         if(tagIndex){
            config.params.tagIndex = tagIndex;
            result = await axiosInstance.get("/post/getListByCategory.php", config);
         }else{
            result = await axiosInstance.get("/post/getListPagination.php", config);
         }
         if(result.data.status === 200){
            if(currPage === 1){
               commit("setListPost", result.data.posts);
            }else if(currPage > 1){
               commit("pustListPost", result.data.posts);
            }
         }
         commit("set_loading", false);
      } catch (error) {
         commit("set_loading", false);
         console.log(error);
      }
   },
   async getPostDetailByPostId({commit, dispatch}, postId){
      commit("set_loading", true);
      try {
         let result = await axiosInstance.get("/post/post.php?postid=" + postId);
         if(result.data.status === 200){
            let promiseUser = dispatch("getUserById", result.data.data.post.USERID);
            let promiseComments = dispatch("getListCommentByPostId", postId);
            let [resultUser, resultComments] = await Promise.all([promiseUser, promiseComments]);
            let dataPostDetail = {
               ...result.data.data,
               comments: [],
            };
            if(resultComments.ok){
               dataPostDetail.comments = resultComments.comments;
            }
            commit("set_loading", false);
            commit("setPostDetail", dataPostDetail);
            return{
               ok: true,
               data: result.data.data,
               error: null
            }
         }
         commit("set_loading", false);
      } catch (error) {
         commit("set_loading", false);
         return {ok: false, error:error.message}
      }
   },
   async getListPostSearch({commit}, keyword){
      commit("set_loading", true);
      try {
         let result = await axiosInstance.get("/post/search.php?query=" + keyword);
         commit("set_loading", false);
         if(result.data.status === 200){
            return{
               ok: true,
               posts: result.data.posts,
               error: null
            }
         }else{
            return {
               ok: false,
               message: result.message,
            }
         }
      } catch (error) {
         commit("set_loading", false);
         return {ok: false, error:error.message}
      }
   },
   async createNewPost({commit}, {post_content="", category="", url_image="", obj_image=null }){
      commit("set_loading", true);
      try {
         let bodyFormData = new FormData();
         bodyFormData.append("post_content", post_content);
         bodyFormData.append("category", category);
         bodyFormData.append("url_image", url_image);
         if(obj_image){
            bodyFormData.append("obj_image", obj_image);
         }
         let config = {
            headers: { 
               "Accept": "multipart/form-data",
               "Authorization": "Bearer " + localStorage.getItem(ACC_TOKEN),
            },
         };
         let result = await axiosInstance.post("/post/addNew.php", bodyFormData, config);
         commit("set_loading", false);
         if(result.data.status === 200){
            return{
               ok: true,
               data: result.data.data,
            }
         }else{
            return {
               ok: false,
               error: result.data.error,
            }
         }
      } catch (error) {
         commit("set_loading", false);
         return {ok: false, error:error.message}
      }
   },
   async getListCommentByPostId({commit}, postId){
      commit("set_loading", true);
      try {
         let result = await axiosInstance.get("/comment/comments.php?postid=" + postId);
         commit("set_loading", false);
         if(result.data.status === 200){
            return{
               ok: true,
               comments: result.data.comments,
            }
         }else{
            return {
               ok: false,
               message: result.data.message,
            }
         }
      } catch (error) {
         commit("set_loading", false);
         return {ok: false, error:error.message}
      }
   },
   async addComment({commit, rootState}, {comment = "", postid = null}){
      commit("set_loading", true);
      try {
         let data = {
            comment, postid
         };
         let config = {
            headers: { 
               "Content-Type": "application/json",
               "Authorization": "Bearer " + localStorage.getItem(ACC_TOKEN),
            },
         };
         let result = await axiosInstance.post("/comment/add_new.php", data, config);
         console.log('result=',result.data);
         commit("set_loading", false);
         if(result.data.status === 200){
            let comment = {
               ...result.data.body,
               fullname: rootState.moduleUser.currentUser.fullname,
               profilepicture: rootState.moduleUser.currentUser.profilepicture,
            };
            commit("pushListComment", comment);
            return{
               ok: true,
               message: result.data.message,
            }
         }else{
            return {
               ok: false,
               error: result.data.error,
            }
         }
      } catch (error) {
         commit("set_loading", false);
         return {ok: false, error:error.message}
      }
   },
};
