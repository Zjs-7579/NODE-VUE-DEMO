<template>
  <div>
    <el-table :data="News" stripe class="table">
      <el-table-column type="index" width="100"> </el-table-column>
      <el-table-column prop="id" label="ID" width="200"> </el-table-column>
      <el-table-column prop="title" label="标题" width="600"> </el-table-column>
      <el-table-column prop="pinned" label="是否加精(1为加精)" width="200">
      </el-table-column>
      <el-table-column align="right">
        <!-- eslint-disable-next-line -->
      <template slot-scope="scope" slot="header">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索" 
          @keyup.enter.native="SearchResult"
          />
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">
          <i class="el-icon-view"></i>
          </el-button>
      </template>
    </el-table-column>
    </el-table>


  <el-drawer
  title="文章例图"
  :visible.sync="drawer"
  size="60%">
  <NewsContext :context="context"/>
</el-drawer>

<div class="pagination">
<el-pagination
  background
  :small="false"
  layout="prev, pager, next"
  :page-size="8"
  :total="sumPages"
  @current-change="handleCurrentChange">
</el-pagination>
</div>

  </div>
</template>

<script>
import NewsContext from '../ContextLook/NewsContext.vue'
export default {
  props: ['CheckList'],
  data() {
    return {
      page: 0,
      drawer: false,
      context: '',
      search: '',
      resultData: []
    }
  },
  computed: {
    News: {
      get(){
        if (this.resultData.length) {
          return this.resultData
        }else{
          const list = [];
          let current = [];
          this.CheckList.forEach(item => {
            current.push(item);
            if (current.length === 8) {
                list.push(current);
                current = [];
            }
          });

          if (current.length) {
              list.push(current);
          }
          return list[this.page]
        }

      },
      set(val) {
       this.News = val  
      }
    },
    sumPages: {
      get() {
        if (this.resultData.length) {
          return 8
        }else{
          return this.CheckList.length
        }
      },
      set(val) {
          this.sumPages = val
        
        
      }
    }

  },
  components: {
    NewsContext
  },
  methods: {
      handleEdit(row) {
        //console.log(row);
        this.context = row;
        this.drawer = true
        
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val-1;
        //console.log(this.page);
      },
      SearchResult() {
        console.log(this.search);
        let res =  this.CheckList.filter(item => {return !this.search || item.title.toLowerCase().includes(this.search.toLowerCase())});
        if (!res.length) {
          this.News = []
        }else{
          this.resultData = res;

        }
      }
    }

}
</script>

<style scoped>
  .table{
    width: 100%;
    height: 478px;
    overflow: hidden;
    overflow-y: auto;
    -ms-overflow-style: none; /* IE 10+ */
    scrollbar-width: none;
  }
  ::-webkit-scrollbar {
  display: none; /* Chrome Safari */
  }
  .pagination{
    width: 350px;    
    margin: 15px auto;
    
  }
</style>