<template>
<main>
   <div class="container">
      <!--sections-->
      <div class="row">
         <div class="col-lg-8">
            <!--section-->
            <div class="ass1-section ass1-section__edit-post">
               <div class="ass1-section__content">
                  <form action="#">
                     <div class="form-group">
                        <input v-model="url_image" type="text" class="form-control ttg-border-none" placeholder="https://">
                     </div>
                     <div class="form-group">
                        <textarea v-model="post_content" type="text" class="form-control ttg-border-none" placeholder="Mô tả ..."></textarea>
                     </div>
                  </form>
                  <div class="ass1-section__image">
                     <a href="#"><img :src="renderImg" alt="default"></a>
                  </div> 
                  <a href="https://memeful.com/" target="_blank" class="ass1-btn ass1-btn-meme">Chế ảnh từ
                     meme</a>
                  <button @click="uploadImages" class="ass1-btn ass1-btn-meme">Đăng ảnh từ máy tính</button>
                  <input @change="handleUploadImg" style="display: none" ref="imgUpload" type="file" name="images" class="form-control" />
               </div>
            </div>
         </div>
         <div class="col-lg-4">
            <aside class="ass1-aside ass1-aside__edit-post">
               <div>
                  <button @click.prevent="handleSubmitCreatePost" class="ass1-btn">Đăng bài</button>
               </div>
               <div class="ass1-aside__edit-post-head">
                  <span style="display: block; width: 100%; margin-bottom: 10px;">Chọn danh mục</span>
                  <label class="ass1-checkbox" 
                     v-for="item in allCategories"
                     :key="item.id"
                  >
                     <input 
                        v-bind:value="item.id"
                        v-model="categories"
                        type="checkbox" name="state-post">
                     <span></span>
                     <p>{{item.text}}</p>
                  </label>
               </div>
               <div class="ass1-aside__get-code">
                  <p>Share Link</p>
               </div>
               <div class="ass1-aside__social">
                  <a href="" class="ass1-btn-social__facebook ass1-btn-social">
                     <i class="fa fa-facebook" aria-hidden="true"></i>
                  </a>
                  <a href="" class="ass1-btn-social__twitter ass1-btn-social">
                     <i class="fa fa-twitter" aria-hidden="true"></i>
                  </a>
                  <a href="" class="ass1-btn-social__google ass1-btn-social">
                     <i class="fa fa-google-plus" aria-hidden="true"></i>
                  </a>
               </div>
            </aside>
         </div>
      </div>
   </div>
</main>
</template>

<script>
import { mapActions } from "vuex";
import {checkImageURL, checkImageFile} from "../helpers/formatString.helper";
export default {
   name: "postUpload",
   data(){
      return {
         post_content: "",
         categories: [],
         url_image: "",
         obj_image: {
            objFile: "",
            base64URL: null,
         },
      }
   },
   computed: {
      allCategories() {
         return this.$store.state.modulePost.categories
      },
      renderImg(){
         if(this.url_image){
            return this.url_image;
         }else if(this.obj_image.base64URL){
            return this.obj_image.base64URL;
         }else{
            return "/dist/images/no_image_available.jpg";
         }
      }
   },
   methods: {
      ...mapActions(["createNewPost"]),
      uploadImages(){
         this.$refs.imgUpload.click();
      },
      handleUploadImg(e){
         if(e.target.files && e.target.files.length){
            let ImgUpload = e.target.files[0];
            let check = checkImageFile(ImgUpload);
            if(!check){
               alert("Định dạng file không hợp lệ!");
               return
            }
            let reader = new FileReader();
            reader.addEventListener("load", ()=>{
               let previewSrc = reader.result;
               this.obj_image.base64URL = previewSrc;
               this.obj_image.objFile = ImgUpload;
            }, false);
            if(ImgUpload){
               reader.readAsDataURL(ImgUpload);
            }
         }
      },
      resetData(){
         this.post_content = "",
         this.categories = "",
         this.url_image = "",
         this.obj_image = {
            objFile: "",
            base64URL: null,
         }
      },
      handleSubmitCreatePost(e){
         let {post_content, categories, url_image, obj_image } = this;
         if(post_content && categories.length){
            if(url_image || obj_image.objFile){
               let data = {
                  post_content, 
                  category: categories, 
                  url_image,
               };
               if(obj_image.objFile){
                  data.obj_image = obj_image.objFile
               }
               this.createNewPost(data).then((res)=>{
                  if(res.ok){
                     alert("Thêm bài viết thành công!");
                     this.resetData();
                     this.$router.push({name: "homePage"});
                  }else{
                     alert(res.error);
                  }
               });
            }else{
               alert("vui lòng upload hình ảnh!");
            }
         }else{
            alert("Vui lòng nhập đầy đủ nội dung!");
            return
         }

      },
   },
}
</script>

<style>

</style>
