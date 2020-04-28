<template>
<nav>
   <ul class="ass1-header__menu logoutColor">
      <li>
         <a href="#" class="b">Danh mục</a>
         <div class="ass1-header__nav" style="display: none;">
            <div class="container">
               <ul>
                  <li v-for="categ in categories" :key="categ.id">
                     <router-link :to="getLinkCateg(categ)">{{categ.text}}</router-link>
                  </li>
               </ul>
            </div>
            <div class="ass1-header__menu-transition"></div>
         </div>
      </li>
   </ul>
</nav>
</template>

<script>
import {
   removeVietnameseFromString
} from "../helpers/formatString.helper";
export default {
   name: "CompNavigation",
   computed: {
      categories() {
         return this.$store.state.modulePost.categories
      },
   },
   methods: {
      getLinkCateg(categ) {
         return {
            name: "homePage",
            query: {
               text: removeVietnameseFromString(categ.text),
               tagIndex: categ.id
            }
         }
      },
   },
};
</script>

<style scoped>
.ass1-header__nav>.container ul {
   width: 100%;
   flex-direction: row;
   flex-wrap: wrap;
}

.ass1-header__nav>.container ul li {
   width: 25%;
}

.logoutColor {
   width: 100px;
   height: 38px;
   padding-left: 12px;
   padding-right: 12px;
   font-weight: 300;
   border-radius: 6px;
   border: solid 2px #3482e2;
   background-color: rgb(218, 79, 79);
}
.logoutColor:hover {
   transition: 0.5s;
   background-color: rgb(248, 248, 248);
}
.logoutColor .b{
   color: white;
   top: 6px;
}
.logoutColor:hover .b{
   color: #3482e2;
}
</style>
