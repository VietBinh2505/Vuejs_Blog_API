<template>
   <div>
		<userPageInfor 
			:userInfo="userInfo"
			:post="listPostOfUser"
		/>
		<div 
			v-if="listPostOfUser && listPostOfUser.length"
			v-masonry
			column-width=".grid-sizer"
			transition-duration="0.3s"
			item-selector=".ass1-section__item"
			class="ass1-section__wrap row ass1-section__isotope-init">
			
			<div class="grid-sizer"></div>
			<postItem  
				v-masonry-tile
				v-for="item in listPostOfUser"
				:key="item.PID"
				:post="item"
				class="col-lg-6"
			/>
		</div>
	</div>
</template>

<script>
import userPageInfor from "./userPageInfor";
import postItem from "./../components/CompPostItem";
import { mapActions } from "vuex";
export default {
	name: "userPage",
	data(){
		return {
			userID : this.$route.params.id,
			userInfo: null,
			listPostOfUser: [],
		}
	},
	watch:{
      "$route" (to, from){
			this.userID = to.params.id;
			this.fetchAllData();
      },
	},
	created(){
		this.fetchAllData();
	},
	components: {
		userPageInfor, postItem
	},
	methods: {
		...mapActions(["getUserById", "getListPostByUserID", "set_loading"]),
		async fetchAllData(){
			let userid = this.userID;
			let promiseUser = this.getUserById(userid);
			let promisePost = this.getListPostByUserID(userid);
			this.set_loading(true);
			let [resultUser, resultPost] = await Promise.all([promiseUser, promisePost]);
			this.set_loading(false);
			if(resultUser.ok && resultPost.ok){
				this.userInfo = resultUser.data;
				this.listPostOfUser = resultPost.posts;
				this.$redrawVueMasonry();
			}else{
				this.$router.push({name: "homePage"});
			}
		}
	}

}
</script>

<style>

</style>
