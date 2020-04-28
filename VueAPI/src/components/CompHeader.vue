<template>
   <header>
		<div class="ass1-header">
			<div class="container">
				<a href="/" class="ass1-logo">
					<img src="/dist/images/logone.png" alt="logo">
				</a>
				<CompNavigation/>
				<CompHeaderSearch/>
				<router-link :to="{name: 'postUpload'}" class="ass1-header__btn-upload ass1-btn logoutColor">
					<i class="icon-Upvote"></i> Đăng tải
				</router-link>
				<router-link v-if="!isLogin" :to="{name: 'loginPage'}" class="ass1-header__btn-upload ass1-btn logoutColor">Đăng nhập</router-link>
				<a v-else-if="isLogin" class="ass1-header__btn-upload ass1-btn logoutColor"> <p @click.prevent="handleLogout"> Đăng xuất</p></a>
				<div class="wrapper-user" v-if="isLogin">
					<a class="user-header">
						<span class="avatar">
							<img :src="linkImg" alt="avatar">
						</span>
						<!-- <span class="email">{{crrUser.fullname}}</span> -->
						<router-link :to="getPostLink">
							<span class="email">{{crrUser.fullname}}</span>
						</router-link>
					</a>
				</div>
			</div>
		</div> 
	</header>
</template>

<script>
import $ from "jquery";
import {mapGetters, mapActions} from "vuex";
import CompNavigation from "./CompNavigation";
import CompHeaderSearch from "./CompHeaderSearch";
export default {
	name: "compHeader",
	mounted(){
		$(".ass1-header__menu li > a").click(function(e){
			$(this).parent().find(".ass1-header__nav").slideToggle(300, 'swing');
		});
		$(".ass1-header__nav ul li > a").click(function(e){
			$(this).parents(".ass1-header__nav").slideUp(300, "swing")
		});
	},
	computed: {
		...mapGetters(["isLogin", "crrUser"]),
		linkImg(){
			if(this.crrUser.profilepicture){
				return this.crrUser.profilepicture;
			}else{
				return "/dist/images/default-avatar.png"
			}
		},
		getPostLink(){
         return {name: 'userPage', params: {id: this.crrUser.USERID}}
      },
	},
	methods:{
		...mapActions(["logout"]),
		handleLogout(){
			let check = confirm("Bạn có chắc chắn đăng xuât?");
			if(check){
				this.logout();	
				this.$router.push({name: "loginPage"})
			}
		},
	},
	components: {
		CompNavigation, CompHeaderSearch
	} 
};
</script>

<style scoped>
	.logoutColor{
		cursor: grab;
		background-color: rgb(218, 79, 79);
		color: #ffffff;
	}
	.logoutColor:hover{
		background-color: #ffffff;
		color: #3482e2;
	}
	.user-header {
		position: relative;
		color: #1e1633;
		transition: all .2s ease;
		display: inline-block;
	}
	.user-header:hover {
		color: #3482e2;
	}
	.user-header > span {
		display: inline-block;
		vertical-align: middle;
	}
	.user-header .avatar {
		width: 35px;
		height: 35px;
		margin-right: 4px;
		border-radius: 100%;
		overflow: hidden;
	}
	.user-header .avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.wrapper-user {
		position: relative;
	}
	.logout {
		right: 0;
		top: 100%;
		position: absolute;
		background-color: #3482e2;
		padding: 10px 30px;
		min-width: 150px;
		text-align: center;
		border-radius: 3px;
		box-shadow: 0 0 5px 0px rgba(0,0,0,0.1);
		z-index: 0;
		transition: all .3s ease;
		opacity: 0;
		pointer-events: none;
		cursor: pointer;
	}
	.wrapper-user .logout:hover,
	.wrapper-user .user-header:hover + .logout {
		text-align: center;
		opacity: 1;
		z-index: 2;
		pointer-events: auto;
	}
	.ass1-header__nav > .container ul {
		flex-direction: row;
		flex-wrap: wrap;
	}
	.ass1-header__nav > .container ul li {
		flex: 0 0 25%;
		max-width: 25%;
	}
	.ass1-header__nav > .container ul li:first-child {
		margin-top: 8px;
	}
</style>