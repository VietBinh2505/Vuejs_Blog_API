export default {
   getListPost(state){
      return state.listPosts;
   },
   getDataPostDetail(state, getters , rootState ){
      if(state.postDetail){
         let USERID = state.postDetail.post.USERID;
         let user = rootState.moduleUser.users[USERID];
         let data = {
            post: {
               ...state.postDetail.post,
               fullname: user.fullname,
               profilepicture: user.profilepicture
            },
            categories: state.postDetail.categories,
            comments: state.postDetail.comments,
         };
         return data;
      }
   }
};