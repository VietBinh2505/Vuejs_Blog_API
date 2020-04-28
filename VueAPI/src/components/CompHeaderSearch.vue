<template>
	<div class="ass1-header__search">
		<form action="#" @submit.prevent="submitKeyword">
			<label>
				<input v-model="querySearch" type="search" name="search-text" class="form-control" placeholder="Nhập từ khóa ...">
				<i class="icon-Search"></i>
			</label>
		</form>
	</div>	
</template>

<script>
export default {
	name: "CompHeaderSearch",
	data(){
		return {
			querySearch: "",
		}
	},
	methods:{
		submitKeyword(){
			if(this.querySearch !== ""){
				this.$router.push({
					name: "searchPage", 
					query: {
						query: this.querySearch
					}
				});
			}else{
				alert("Vui lòng nhập nội dung cần tìm kiếm!");
			}
			this.querySearch = "";
		}
	}
};
</script>

<style>

</style>