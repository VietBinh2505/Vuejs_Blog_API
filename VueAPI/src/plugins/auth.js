import store from "../store/index.store";
import {parseJwt} from "../helpers/formatString.helper";
import {ACC_TOKEN} from "../consts/index.const";
const ifNotAuthed = (to, from, next) => {
   if(!store.getters.isLogin){
      next();
   }else{
      next({ 
         name: "homePage", 
         query: {
            redirect: to.name,
         } 
      });
   }
};
const ifAuthed = (to, from, next) => {
   let local = localStorage.getItem(ACC_TOKEN);
   let user = parseJwt(local)
   if(store.getters.isLogin || user){
      next();
   }else{
      next({ 
         name: "loginPage",
         query: {
            redirect: to.name,
         }  
      });
   }
};

export {
   ifNotAuthed,
   ifAuthed,
};