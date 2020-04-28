<template>
<div class="ass1-section__list">
   <postItem 
      v-for="post in getListPost"
      :key="post.pid"
      :post="post"
   />
   <button 
      v-if="getListPost && getListPost.length" 
      @click="handleReadMore" class="load-more ass1-btn">
      <span>Xem thêm</span>
   </button>
   <h3 v-else> Danh sách rỗng</h3>
</div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import postItem from "./CompPostItem";
import {PAGE_SIZE, CURRENT_PAGE} from "../consts/index.const";
export default {
   name: "postList",
   data(){
      return {
         pageSize: PAGE_SIZE,
         currentPage: CURRENT_PAGE,
         tagIndex: parseInt(this.$route.query.tagIndex),
      }
   },
   components: {
      postItem
   },
   computed: {
      ...mapGetters(["getListPost"]),
   },
   watch: {
      "$route" (to, from) {
         this.tagIndex = to.query.tagIndex;
         this.pageSize = 1;
      }
   },
   methods: {
      ...mapActions(["getlistPostHasPaging"]),
      handleReadMore(){
         this.currentPage = this.currentPage + 1;
         let obj = {
            pagesize: this.pageSize,
            currPage: this.currentPage,
            tagIndex: this.tagIndex
         };
         this.getlistPostHasPaging(obj);
      },
   },
   
}
</script>

<style>

</style>
