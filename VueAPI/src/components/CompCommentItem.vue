<template>
   <div v-if="cmt">
      <div class="ass1-comments__section">
         <a href="#" class="ass1-comments__avatar ass1-avatar">
            <img :src="getAvatar" :alt="cmt.fullname">
         </a>
         <div class="ass1-comments__content">
            <a href="#" class="ass1-comments__name">{{cmt.fullname}}</a>
            <span class="ass1-comments__passed">{{formatTime}}</span>
            <p>{{cmt.comment}}</p>
            <div class="ass1-comments__info">
               <a href="#" class="ass1-comments__btn-upvote ass1-btn-icon">
                  <i class="icon-Upvote"></i>
                  <span>0</span>
               </a>
               <a href="#" class="ass1-comments__btn-down ass1-btn-icon">
                  <i class="icon-Downvote"></i>
                  <span>0</span>
                  </a>
            </div>
         </div>
      </div>
   </div>
   <div v-else>
      <p>Chưa có bình luận</p>
   </div>
</template>

<script>
import moment from "moment";
export default {
   name: "CompCommentItem",
   props: {
      cmt : {type: Object, default: null},
   },
   computed: {
      getAvatar(){
         if(this.cmt.profilepicture){
            return this.cmt.profilepicture;
         }else{
            return "/dist/images/avatar-02.png";
         }
      },
      formatTime(){
         return moment(this.cmt.time_added).locale("vi").fromNow();
      },
   }
}
</script>

<style>

</style>
