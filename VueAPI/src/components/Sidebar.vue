<template>
<aside class="ass1-aside">
   <div class="ass1-content-head__t">
      <div>Bài viết gần đây.</div>
   </div>
   <div v-if="!isLogin">
      Vui lòng <router-link :to="{name: 'loginPage'}">đăng nhập</router-link> để xem nội dung này
   </div>
   <div v-else-if="isLogin && getListPostOfCurrentUserId">
      <postItem 
         v-for="post in getListPostOfCurrentUserId" 
         :key="post.PID" 
         :post="post"
      />
   </div>
</aside>
</template>

<script>
import postItem from "./CompPostItem";
import { mapGetters } from 'vuex';
export default {
   name: "sidebar",
   components: {
      postItem,
   },
   computed: {
      ...mapGetters(["getListPostOfCurrentUserId", "isLogin"]),
   }
}
</script>

<style>

</style>
