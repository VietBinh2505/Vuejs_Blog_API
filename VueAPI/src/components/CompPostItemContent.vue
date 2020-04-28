<template>
   <div class="ass1-section__content">
      <p v-if="formatPostContent" v-html="formatPostContent"></p>
      <div class="ass1-section__image">
         <router-link :to="getPostLink">
            <img :src="post.url_image" :alt="post.post_content">
         </router-link>
      </div>
   </div>
</template>

<script>
import {replaceAll} from "../helpers/formatString.helper";
export default {
   name: "post-item-content",
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
      getPostLink(){
         return {name: 'articleDetail', params: {id: this.post.PID}}
      },
      formatPostContent(){
         if(this.querySearch){
            return replaceAll(this.post.post_content, this.querySearch, `<mark>${this.querySearch}</mark>`)
         }else{
            return this.post.post_content;
         }
      }
   }
}
</script>

<style>

</style>
