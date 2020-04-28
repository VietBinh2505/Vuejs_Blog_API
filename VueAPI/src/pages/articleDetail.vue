<template>
<main>
   <div class="container"> 
      <div class="row">
         <div class="col-lg-8">
            <div class="ass1-section__list" v-if="getDataPostDetail && getDataPostDetail.post">
               <div class="ass1-section">
                  <postItem :post="getDataPostDetail.post"/>
                  <postFeeling/>
                  <ul>
                     <li 
                        v-for="categ in getDataPostDetail.categories" 
                        :key="categ.TAG_ID" >
                        <router-link :to="getLinkCateg(categ)">{{categ.tag_value}}</router-link>
                     </li>
                  </ul>
               </div>
               <commentsAdd/>
               <comments :comment="getDataPostDetail.comments"/>
            </div>
         </div>
         <div class="col-lg-4">
            <sidebar/>
         </div>
      </div>
   </div>
</main>
</template>

<script>
import sidebar from "./../components/Sidebar";
import comments from "./../components/CompComments";
import commentsAdd from "./../components/CompCommentsAdd";
import postFeeling from "./../components/CompPostFeeling";
import postItem from "./../components/CompPostItem";
import { mapActions, mapGetters, mapMutations } from "vuex";
import {removeVietnameseFromString} from "../helpers/formatString.helper";
export default {
   name: "postDetail",
   data(){
      return {
         postId: this.$route.params.id,
      }
   },
   watch:{
      "$route" (to, from){
         this.postId = to.params.id;
         this.fetchDataPostDetail();
      },
   },
   created(){
      this.fetchDataPostDetail();
   },
   computed: {
      ...mapGetters(["getDataPostDetail"]),
   },
   methods: {
      ...mapActions(["getPostDetailByPostId"]),
      // ...mapMutations(["setPostDetail"]),
      fetchDataPostDetail(){
         this.getPostDetailByPostId(this.postId).then((res)=>{
            if(!res.ok){ //lấy api thất bại đẩy qua home
               this.$router.push({ name: "homePage"});
            }
         }); 
      },
      getLinkCateg(categ) {
         return {
            name: "homePage",
            query: {
               text: removeVietnameseFromString(categ.tag_value),
               tagIndex: categ.tag_index
            }
         }
      },
   },
   components: {
      sidebar, comments, commentsAdd, postFeeling, postItem
   }
}
</script>

<style>

</style>
