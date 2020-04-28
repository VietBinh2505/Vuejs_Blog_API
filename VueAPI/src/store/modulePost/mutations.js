export default {
   setListPost(state, data){
      state.listPosts = data;
   },
   pustListPost(state, data){
      state.listPosts = [...state.listPosts, ...data];
   },
   setPostDetail(state, data){
      state.postDetail = data;
   },
   pushListComment(state, comment){
      state.postDetail.comments.push(comment);
   }, 
} 