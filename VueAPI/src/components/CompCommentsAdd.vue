<template>
   <div class="ass1-add-comment">
      <form action="#" @submit.prevent="handleSubmitPostComment">
         <textarea v-model="comment" class="form-control ttg-border-none" placeholder="Thêm một bình luận" ></textarea>
      </form>
      <div class="ass1-add-comment__content">
         <a @click.prevent="handleSubmitPostComment" href="#" class="ass1-add-comment__btn-save ass1-btn-icon">
            <span> {{renderMaxLength}}</span>
            <i class="icon-Submit_Tick"></i>
         </a>
      </div>
   </div>
</template>

<script>
import {mapActions} from "vuex";
export default {
   name: "commentsAdd",
   data(){
      return {
         comment: "",
         maxLength: 180,
         postid: this.$route.params.id,
      }
   },
   watch: {
      "$route" (to, from){
         this.postId = to.params.id;
      }
   },
   computed: {
      renderMaxLength(){
         return this.maxLength - this.comment.length;
      }
   },
   methods: {
      ...mapActions(["addComment"]),
      handleSubmitPostComment(){
         let {comment, postid, maxLength} = this;
         if(comment.length && comment.length <= maxLength){
            let data = {
               comment,
               postid,
            };
            this.addComment(data).then((res)=>{
               if(res.ok){
                  alert(res.message);
                  this.comment = "";
               }else{
                  alert(res.error);
               }
            });
         }else{
            alert("Dữ liệu nhập vào chưa đúng quy tắc!");
         }
      }
   }
}
</script>

<style>

</style>
