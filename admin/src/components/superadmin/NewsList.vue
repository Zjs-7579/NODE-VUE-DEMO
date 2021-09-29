<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- <el-tab-pane  :label=item.classify_name name="second">{{item.classify_name}}</el-tab-pane> -->
      <el-tab-pane label='综合' name='SumList'>
        <SumNewsList/>
      </el-tab-pane>



      <template v-for="item in NewsClass">
         <el-tab-pane :label=item.classify_name :name=item.news_className :key="item.classify_id">
           <NewsClassList :NewsList="NewsList"/>
         </el-tab-pane>
      </template>
     
  </el-tabs>
  </div>
</template>
<script>
import SumNewsList from './NewsList/SumNewsList.vue'
import NewsClassList from './NewsList/NewsClassList.vue'
import {mapState} from 'vuex'
  export default {
    data() {
      return {
        activeName: 'SumList',
        NewsList: []
      };
    },
    computed: {
      ...mapState(['NewsClass', 'NewsListAll']),
    },
    components: {
      NewsClassList,
      SumNewsList
    },
    methods: {
      handleClick(tab) {
        //this.ClassName = tab.name;
        this.NewsList = this.NewsListAll[tab.name]
      }
    },
    // watch: {
    //   NewsList(val) {
    //     console.log(val);
    //     this.tableData = val
    //   }
    // }
  };
</script>