<template>
<main>
   <div class="ass1-login">
      <div class="ass1-login__content">
         <p>Profile</p>
         <div class="ass1-login__form">
            <div class="avatar">
               <img v-bind:src="getAvatar" alt="crrUserFullname">
            </div>
            <form action="#" v-if="crrUser" v-on:submit.prevent="handleSubmitEditProfile">
               <input 
                  v-bind:value="crrUser.fullname" v-on:input="fullname = $event.target.value"
                  type="text" class="form-control" placeholder="Tên ..." required="">

               <select 
                  v-bind:value="crrUser.gender"
                  @change="gender = $event.target.value"
                  class="form-control">
                  <option value="">Giới tính</option>
                  <option value="nam">Nam</option>
                  <option value="nu">Nữ</option>
               </select>
               <input v-on:change="uploadAvatar"
                  type="file" name="avatar" placeholder="Ảnh đại diện" class="form-control">
               <textarea 
                  v-bind:value="crrUser.description" v-on:input="description = $event.target.value"
                  class="form-control" cols="30" rows="5" placeholder="Mô tả ngắn ..."></textarea>
               <div class="ass1-login__send justify-content-center">
                  <button type="submit" class="ass1-btn">Cập nhật</button>
               </div>
            </form>
         </div>
      </div>
   </div>
</main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
   name: "userProfile",
   data(){
      return {
         userid: this.$route.params.id,
         fullname: "",
         description: "",
         gender: "",
         avatar: {
            objFile: null,
            base64URL: "",
         },
      }
   },
   created(){
      this.checkIsCrrUser();
   },
   watch: {
      "$route" (to, from) {
         this.userid = to.params.id;
         this.checkIsCrrUser();
      },
      
   },
   computed: {
      ...mapGetters(["crrUser"]),
      getAvatar(){
         if(this.avatar.base64URL === "" && this.crrUser){
            return this.crrUser.profilepicture;
         }else{
            return this.avatar.base64URL;
         }
      },
   },
   methods: {
      ...mapActions(["editProfile"]),
      checkIsCrrUser(){
         if(this.crrUser && this.userid){
            if(this.userid === this.crrUser.USERID){
               return true
            }else{
               this.$router.push({name: "homePage"});
            }
         }
      },
      handleSubmitEditProfile(){
         let data = {
            avatar: this.avatar,
            fullname: this.fullname,
            description: this.description,
            gender: this.gender,
         };
         if(data.gender === ""){data.gender = this.crrUser.gender;}
         if(data.fullname === ""){data.fullname = this.crrUser.fullname;}
         if(data.description === ""){data.description = this.crrUser.description;}
         if(data.gender && data.fullname && data.description){
            if(this.avatar.objFile){
               data.objForm = this.avatar.objFile;
            }
            this.editProfile(data).then((res)=>{
               if(res.ok){
                  alert("Chỉnh sửa thông tin cá nhân thành công!");
               }else{
                  alert(res.error);
               }
            });
         }
      },
      uploadAvatar(e){
         if(e.target.files && e.target.files.length){
            let fileAvatar = e.target.files[0];
            let reader = new FileReader();
            reader.addEventListener("load", ()=>{
               let previewSrc = reader.result;
               this.avatar.base64URL = previewSrc;
               this.avatar.objFile = fileAvatar;
            }, false);
            if(fileAvatar){
               reader.readAsDataURL(fileAvatar);
            }
         }
      },
   }
}
</script>

<style>

</style>