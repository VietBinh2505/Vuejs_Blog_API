import {parseJwt} from "../../helpers/formatString.helper";
import {ACC_TOKEN} from "../../consts/index.const";
export default {
   isLogin(state){
      let userObj = parseJwt(state[ACC_TOKEN]);
      if(userObj){
         return true;
      }else{
         return false;
      }
   }, 
   crrUser(state){
      return state.currentUser;
   },
   getListPostOfCurrentUserId(state){
      if(state.currentUser){
         let userCrrId = state.currentUser.USERID;
         return state.posts[userCrrId];
      }else{
         return null;
      }
   }
};
