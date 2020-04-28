<template>
<div class="ass1-head-user">
   <div class="ass1-head-user__content" v-if="userInfo">
      <div class="ass1-head-user__image">
         <a href="#"><img :src="srcAvatar" :alt="userInfo.fullname">
         </a>
      </div>
      <div class="ass1-head-user__info">
         <div class="ass1-head-user__info-head">
            <div class="ass1-head-user__name">
               <span>{{userInfo.fullname}}</span>
               <i><img src="/dist/fonts/emotion/svg/Verified.svg" :alt="userInfo.fullname"></i>
            </div>
            <div class="w-100"></div>
            <a v-if="!isCrrUser" href="#" class="ass1-head-user__btn-follow ass1-btn">Theo dõi</a>
            <template v-else>
               <router-link :to="{name: 'changePassword'}" class="ass1-head-user__btn-follow ass1-btn">
                  Đổi mật khẩu</router-link>
               <router-link :to="{name: 'userProfile', params: {id: userInfo.USERID}}" class="ass1-head-user__btn-follow ass1-btn">
                  Trang cá nhân</router-link>
            </template>
            <!-- <a href="#" class="ass1-head-user__btn-options ass1-btn-icon"><i class="icon-Options"></i></a> -->
         </div>
         <div class="ass1-head-user__info-statistic">
            <div class="ass1-btn-icon">
               <i class="icon-Post"></i>
               <span>Bài viết: {{count}}</span>
            </div>
            <div class="ass1-btn-icon">
               <i class="icon-Followers"></i>
               <span>Theo dõi: 0</span>
            </div>
            <div class="ass1-btn-icon">
               <i class="icon-Following"></i>
               <span>Đang theo dõi: 0</span>
            </div>
            <!-- <div class="ass1-btn-icon"><i class="icon-Upvote"></i><span>Up Vote: 999999</span></div> -->
         </div>
         <p>{{userInfo.description}}</p>
      </div>
   </div>
</div>
</template>

<script>
import {
   mapGetters
} from "vuex";
export default {
   name: "userPageInfor",
   props: {
      userInfo: {
         type: Object,
         default: null
      },
      post: {
         type: Array,
         default: null
      },
   },
   computed: {
      count(){
         if(this.post.length){
            return this.post.length;
         }
      },
      srcAvatar() {
         if (this.userInfo.profilepicture) {
            return this.userInfo.profilepicture;
         } else {
            return "/dist/images/cat-1634369_1920.jpg";
         }
      },
      ...mapGetters(["crrUser"]),
      isCrrUser() {
         if (this.userInfo && this.crrUser) {
            if (this.userInfo.USERID === this.crrUser.USERID) {
               return true
            } else {
               return false
            }
         } else {
            return false
         }
      }
   }
};
</script>

<style>

</style>
