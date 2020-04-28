<template>
<main>
   <div class="ass1-login">
      <div class="ass1-login__content">
         <p>Đăng ký một tài khoản</p>
         <div class="ass1-login__form">
            <form action="#" @submit.prevent="handleSubmitRegister">
               <input v-model="fullName"
                  type="text" class="form-control" placeholder="Tên hiển thị" required="">
               <input v-model="email"
                  type="email" class="form-control" placeholder="Email" required="">
               <input v-model="password"
                  type="password" class="form-control" placeholder="Mật khẩu" required="">
               <input v-model="rePassword"
                  type="password" class="form-control" placeholder="Nhập lại mật khẩu" required="">
               <div class="ass1-login__send">
                  <router-link :to="{ name: 'loginPage'}">Đăng nhập</router-link>
                  <router-link :to="{ name: 'homePage'}">Về trang chủ</router-link>
                  <button type="submit" class="ass1-btn">Đăng ký</button>
               </div>
            </form>
         </div>
      </div>
   </div>
</main>
</template>

<script>
import { mapActions } from "vuex";
export default {
   name: "registerPage",
   data(){
      return {
         email : "",
         fullName : "",
         password : "",
         rePassword : "",
      }
   },
   methods: {
      ...mapActions(["register"]),
      handleSubmitRegister(){
         let data = {
            email: this.email,
            fullname: this.fullName,
            password: this.password,
            repassword: this.rePassword,
         };
         if(data.fullname && data.email && data.repassword && data.password){
            this.register(data).then((res)=>{
               if(!res.ok){
                  alert(res.error);
               }else{
                  this.$router.push({name: "homePage"});
                  alert("Đăng kí tài khoản thành công!")
               }
            });
         }else{
            alert("Thông tin đăng kí chưa hợp lệ")
         }
      },
   }
}
</script>

<style>

</style>
