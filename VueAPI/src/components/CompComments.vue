<template>
<div class="ass1-comments">
   <div class="ass1-comments__head">
      <div class="ass1-comments__title">{{comment.length}} Bình luận</div>
      <div class="ass1-comments__options">
         <span>Sắp xếp theo:</span>
         <a href="#" class="ass1-comments__btn-upvote ass1-btn-icon"><i class="icon-Upvote"></i></a>
         <a href="#" class="ass1-comments__btn-down ass1-btn-icon"><i class="icon-Downvote"></i></a>
         <a href="#" class="ass1-comments__btn-expand ass1-btn-icon"><i class="icon-Expand_all"></i></a>
      </div>
   </div>
   <CompCommentItem 
      v-for="cmt in comment" 
      :key="cmt.CID" 
      :comment="comment"
      :cmt="cmt"
   />
</div>
</template>
<script>
import CompCommentItem from "./CompCommentItem";
export default {
   name: "comments",
   props: {
      comment : {type: Array, default: null},
   },
   components: {
      CompCommentItem,
   }
}
</script>

<style>

</style>
