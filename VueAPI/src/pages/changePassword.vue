<template>
<main>
   <div class="ass1-login">
      <div class="ass1-login__content">
         <p>Đổi mật khẩu</p>
         <div class="ass1-login__form">
            <form action="#" @submit.prevent="handleChangePassword">
               <input type="password" v-on:input="oldPassword = $event.target.value" class="form-control" placeholder="Mật khẩu cũ" required="">
               <input type="password" v-on:input="newPassword = $event.target.value" class="form-control" placeholder="Mật khẩu mới" required="">
               <input type="password" v-on:input="reNewPassword = $event.target.value" class="form-control" placeholder="Xác nhận mật khẩu mới" required="">
               <div class="ass1-login__send justify-content-center">
                  <button type="submit" class="ass1-btn">Gửi</button>
               </div>
            </form>
         </div>
      </div>
   </div>
</main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
   name: "changePassword",
   data() {
      return {
         oldPassword: "",
         newPassword: "",
         reNewPassword: "",
         userid: this.$route.params.id,
      }
   },
   watch:{
      "$route" (to, from){
         this.userid = to.params.id;
         this.checkIsCrrUser();
      },
   },
   created(){
      this.checkIsCrrUser();
   },
   computed: {
      ...mapGetters(["crrUser"]),
   },
   methods: {
      ...mapActions(["changePassword"]),
      handleChangePassword(){
         let {oldPassword, newPassword, reNewPassword} = this;
         if(oldPassword && newPassword && reNewPassword){
            if(newPassword === oldPassword){
               alert("Mật khẩu mới phải khác với mật khẩu cũ!");
            }else if(newPassword !== reNewPassword){
               alert("Mật khẩu nhập lại chưa đúng!");
            }else{
               let data = { oldPassword, newPassword, reNewPassword };
               this.changePassword(data).then((res)=>{
                  if(res.ok){
                     alert(res.message);
                     this.$router.push({name: "homePage"});
                  }else{
                     alert(res.error);
                  }
               });
            }
         }else{
            alert("Vui lòng nhập đầy đủ thông tin!");
         }
      },
      checkIsCrrUser(){
         if(this.crrUser && this.userid){
            if(this.userid === this.crrUser.USERID){
               return true
            }else{
               this.$router.push({name: "homePage"});
            }
         }
      },
   }
}
</script>

<style>

</style>
