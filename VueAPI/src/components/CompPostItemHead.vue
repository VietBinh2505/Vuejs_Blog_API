<template>
   <div class="ass1-section__head">
      <router-link 
         :to="getPostLink"
         class="ass1-section__avatar ass1-avatar">
         <img :src="getAvatar" :alt="post.fullname">
      </router-link >
      <div>
         <router-link v-if="querySearch"
            :to="getPostLink" 
            class="ass1-section__name" v-html="formatFullname"> 
         </router-link>
         <router-link v-else
            :to="getPostLink" 
            class="ass1-section__name"> 
            {{post.fullname}}
         </router-link>
         <span class="ass1-section__passed">{{formatTime}}</span>
      </div>
      <router-link :to="getPostLink" class="ass1-section__link
      ass1-btn-icon"><i class="icon-Link"></i></router-link>
   </div>      
</template>

<script>
import moment from "moment";
import {replaceAll} from "../helpers/formatString.helper";
export default {
   name: "post-item-head",
   data(){
      return {
         querySearch: this.$route.query.query,
      }
   },
   watch: {
      "$route" (to, from){
         this.querySearch = to.query.query;
      },
   },
   props: {
      post: {type: Object, default: null},
   },
   computed: {
      getAvatar(){
         if(this.post.profilepicture){
            return this.post.profilepicture;
         }else{
            return "/dist/images/avatar-02.png"
         }
      },
      getPostLink(){
         let userid = this.post.USERID || 1;
         return {name: 'userPage', params: {id: userid}}
      },
      formatTime(){
         return moment(this.post.time_added).locale("vi").fromNow();
      },
      formatFullname(){
         if(this.querySearch){
            return replaceAll(this.post.fullname, this.querySearch, `<mark>${this.querySearch}</mark>`)
         }else{
            this.post.fullname;
         }
      }
   }
}
</script>

<style>
   .ass1-section__name{
      text-transform: capitalize;
   }
   .ass1-section__avatar img{
      width: 100%;
      height: 100%;
      object-fit: cover;
   }
   mark {
      background-color: #f0c90a;
   }

</style>
