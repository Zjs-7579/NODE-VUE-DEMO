<template>
  <div>
    <!-- {{List}} -->
    <el-table :data="News" stripe class="table">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="id" label="ID" width="150"> </el-table-column>
      <el-table-column prop="title" label="标题" width="600"> </el-table-column>
      <el-table-column prop="flag" label="审阅状态" width="150"> </el-table-column>
      <el-table-column prop="reviewer" label="发布人ID" width="200">
      </el-table-column>
      <el-table-column align="right">
        <!-- eslint-disable-next-line -->
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"
           @keyup.enter.native="SearchResult"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">
          <i class="el-icon-view"></i>
          </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">
          <i class="el-icon-delete"></i>
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
  :page-size="9"
  :total="sumPages"
  @current-change="handleCurrentChange">
</el-pagination>
</div>


  </div>
</template>

<script>
import NewsContext from '../ContextLook/NewsContext.vue'
//import {mapState} from 'vuex'
export default {
  props: ['NewsList'],
   data() {
      return {
        NewsListPages: [],
        resultData: [],
        search: '',
        drawer: false,
        context: '',
        page: 0
      }
    },
    components: {
      NewsContext
    },
    computed: {
      sumPages: {
        get() {

          if (this.resultData.length) {
            return 9
          }else{

             return this.NewsList.length;
          }
         
        },
        set(val) {
          this.sumPages = val
        }
      },
      News: {
        get() {


          if (this.resultData.length) {
            //console.log(this.resultData)
            return this.resultData
          }
          if (this.NewsList.length > 9) {
            const list = [];
            let current = [];
            this.NewsList.forEach(item => {
            current.push(item);
            if (current.length === 9) {
                list.push(current);
                current = [];
            }
          });

          if (current.length) {
              list.push(current);
          }

        //console.log(list)
        return list[this.page]

            //return this.NewsListPages[this.page]   
          }else{
            return this.NewsList
          }
        },
        set(val) {
          this.News = val 
        }
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this.context = row;
        this.drawer = true
        
      },
      handleDelete(row) {
        this.$confirm('此操作将永久删除此文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.post('delnews', row)
          if(res.data.code === 200){
            this.$store.dispatch('DelNewsList', row.id)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }else{
            this.$message({
              type: 'info',
              message: '删除失败!'
            });
          }
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
       handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val-1;
        //console.log(this.page);
      },
      SearchResult() {
        let res =  this.NewsList.filter(item => {return !this.search || item.title.toLowerCase().includes(this.search.toLowerCase())});
        // console.log(res);

        
        if (!res.length) {
          this.News = []
        }else{
          this.resultData = res;
        }
        // console.log(!res.length);
        // if (!res.length) {
        //   this.News = []
        //   console.log(this.NewsListPages)
        // }
        // if (!res.length) {
        //   this.NewsListPages = []
        // }else{
        //   this.resultData = res;
        //console.log(this.resultData)

        // }
      }
    },

    //  created() {
    //   console.log("111"+this.NewsList);
    // }
    // watch: {
    //   NewsList(val) {
    //     if (val.length > 9) {
    //       const list = [];
    //       let current = [];
    //       val.forEach(item => {
    //       current.push(item);
    //       if (current.length === 9) {
    //           list.push(current);
    //           current = [];
    //       }
    //     });

    //     if (current.length) {
    //         list.push(current);
    //     }

    //     //console.log(list)
    //     this.NewsListPages = list
    //   }else{
    //     this.NewsListPages = []
    //     this.NewsList = val
    //   }
    //     },

        // resultData(val){
        //   console.log(val.length)
        //    this.News = val
        //   // if (val.length) {
        //   //   this.News = val
        //   // }
        // }
    

}
</script>

<style scoped>
  .table{
    width: 100%;
    height: 530px;
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
    margin: 5px auto;
    
  }
</style>