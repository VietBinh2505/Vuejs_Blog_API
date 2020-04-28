<template>
   <div class="ass1-section__item" v-if="post">
      <div class="ass1-section">
         <PostItemHead :post="post"/>
         <PostItemContent :post="post"/>
         <PostItemFooter :post="post"/>
      </div>
   </div>
</template>

<script>
import PostItemHead from "./CompPostItemHead";
import PostItemContent from "./CompPostItemContent";
import PostItemFooter from "./CompPostItemFooter";
export default {
   name: "post-item",
   data(){
      return {}
   },
   props: {
      post: {type: Object, default: null},
   },
   components: {
      PostItemHead, PostItemContent, PostItemFooter
   }
}
</script>

<style>

</style>
