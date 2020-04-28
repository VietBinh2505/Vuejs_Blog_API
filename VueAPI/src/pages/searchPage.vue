<template>
   <div class="search-page">
      <div class="search-info">
         <h3>Từ khóa tìm kiếm: <strong>{{query}}.</strong></h3>
         <p>Tìm kiến được <b>({{listPostSearch.length}})</b> kết quả phù hợp.</p>
      </div>
      <div 
         v-if="listPostSearch && listPostSearch.length"
         v-masonry
         column-width='.grid-sizer'
         transition-duration="0.3s" 
         item-selector=".ass1-section__item"
         class="ass1-section__wrap row ass1-section__isotope-init">
         <div class="grid-sizer"></div>
         <post-item 
            v-masonry-tile
            v-for="item in listPostSearch"
            v-bind:key="item.PID"
            v-bind:post="item"
            class="col-lg-6"
         />
      </div>
   </div>
</template>

<script>
import postItem from "./../components/CompPostItem";
import { mapActions } from "vuex";
export default {
   name: "searchPage",
   data(){
      return{
         query: this.$route.query.query,
         listPostSearch: [],
      }
   },
   watch: {
      "$route" (to, from){
         this.query = to.query.query;
         this.fetchDataSearch();
      },
   },
   components: {
      postItem,
   },
   created(){
      this.checkQuery();
      this.fetchDataSearch();
   },
   methods: {
      ...mapActions(["getListPostSearch"]),
      checkQuery(){
         if(!this.query){
            this.$router.push({name: "homePage"});
         }
      },
      fetchDataSearch(){
         if(this.query){
            this.getListPostSearch(this.query).then((res)=>{
               if(!res.ok){
                  alert(res.message);
               }else{
                  this.listPostSearch = res.posts;
               }
            });
         }
      },
   }
};
</script>

<style>
   .search-page{
      margin-top: 35px;
   }
   .search-info{
      margin-bottom: 20px;
   }
</style>