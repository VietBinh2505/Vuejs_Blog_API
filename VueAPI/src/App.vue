<template>
	<div id="app">
      <CompHeader v-if="isRenderHeader"/>
      <main>
         <div class="container">
            <router-view></router-view>
         </div>
      </main>
      <CompLoading v-bind:class="{show: isLoading}"/>
	</div>
</template>

<script>
import CompHeader from "./components/CompHeader";
import CompLoading from "./components/CompLoading";
import {mapState, mapActions} from "vuex";
export default {
   name: "app",
   data() {
      return {}
   },
   components: {
      CompHeader, CompLoading
   },
   computed: {
      ...mapState(["isLoading"]),
      isRenderHeader(){
         let arrName = ["loginPage", "registerPage"];
         let routeName = this.$route.name;
         let test = arrName.indexOf(routeName);
         if(test !== -1){
            return false;
         }else{
            return true;
         }
      },
   },
   methods: {
      ...mapActions(["checkLogin", "getListPostByUserID"]),
   },
   created(){
      this.checkLogin();
   },
}
</script>

<style>

</style>
