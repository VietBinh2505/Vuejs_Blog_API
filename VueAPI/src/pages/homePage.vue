<template>
	<div class="row">
		<div class="col-lg-8">
			<postList/>
		</div>
		<div class="col-lg-4">
			<sidebar/>
		</div>
	</div>
</template>

<script>
import {mapActions} from "vuex";
import postList from "./../components/CompPostList";
import sidebar from "./../components/Sidebar";
export default {
	name: "homePage",
	components: {
		postList, sidebar
	},
	watch: {
      "$route"(to, from) {
			let tagIndex = to.query.tagIndex;
			this.getlistPostHasPaging({tagIndex});
      }
	},
	created(){
		let tagIndex = this.$route.query.tagIndex;
		this.getlistPostHasPaging({tagIndex});
   },
	methods: {
		...mapActions(["getlistPostHasPaging"]),
	}
}
</script>

<style>

</style>