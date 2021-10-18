<template>
  <div>
    <el-table :data="UserListData" stripe class="table">
      <el-table-column type="index" width="80"> </el-table-column>
      <el-table-column prop="id" label="ID" width="150"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="150">
      </el-table-column>
      <el-table-column prop="root_call" label="手机号" width="200"> </el-table-column>
      <el-table-column prop="root_email" label="邮箱" width="250"> </el-table-column>
      <el-table-column prop="root_address" label="地址" width="150">
      </el-table-column>
      <el-table-column prop="root_flag" label="权限" width="150"></el-table-column>
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
          @click="handleEdit(scope.row)">
            <i class="el-icon-view"></i>
          </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">
          <i class="el-icon-delete"></i>
          </el-button>
      </template>
    </el-table-column>
    </el-table>
<!-- 组件也拥有多层嵌套的方法 -->
    <el-drawer
  title="管理员信息"
  :visible.sync="drawer"
  size="70%">
  <UserDrawer :item="item"/>
  <p class="title">新闻列表</p>
  <div class="list">
    <el-table
      :data="ReviewerNewsList"
      style="width: 100%">
      <el-table-column type="index" width="80"> 
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="220">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="500">
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="innerDrawer(scope.row)">查看</el-button>
        <el-button
          size="mini"
          type="danger"
           @click="handleDelete(scope.row)"
          >删除</el-button>
      </template>
    </el-table-column>
    </el-table>




   <!-- <el-button @click="innerDrawer = true">打开里面的!</el-button> -->
   <el-drawer
     title="文章例图"
     size="60%"
     :append-to-body="true"
     :visible.sync="txt">
    <NewsContext :context="context"/>
   </el-drawer>
  </div>
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
import NewsContext from './ContextLook/NewsContext.vue'
import UserDrawer from './UserEditor/UserDrawer.vue'
import {mapState} from 'vuex'
export default {
  data() {
    return {
      //删除提示
      del: false,
      // 外层显示开关
      drawer: false,
      // 内层显示开关
      txt: false,
      // 搜索框里面的内容
      search: '',
      // 点击获取的用户基本情况
      item: '',
       // 点击获取的用户新闻详情
      news: '',
      // 新闻列表
      newsList: [],
       // 用户列表
      ReviewerNewsList: [],
      //里层文章详情
      context: [],
      //搜索后的用户列表
      NewsUserList: [],
      //用户数量
      page: 0
      
    };
  },
  computed: {
    ...mapState(['UserList', 'NewsList']),
    sumPages: {
        get() {

          if (this.NewsUserList.length) {
            return 9
          }else{

             return this.UserList.length;
          }
         
        },
        set(val) {
          this.sumPages = val
        }
      },
    UserListData: {
      get() {
        if(this.NewsUserList.length){
          return this.NewsUserList
        }else{
          return this.UserList
        }
      },
      set(val) {
        console.log(val);
        this.UserListData = val
      }
    }
  },
  components: {
    UserDrawer,
    NewsContext
  },
  methods: {
    handleEdit(row) {
      //console.log(row);
      this.drawer = true;
      this.item = row;
      const res = this.NewsList.filter(item => {
        return item.reviewer === row.id
      });
      this.ReviewerNewsList = res;
    },
    handleDelete(row) {
      //console.log(row.id);
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.post('deluser', row)
          if(res.data.code === 200){
            this.$store.dispatch('DelUser', row.id)
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
   innerDrawer(row){
     //console.log(row);
     this.txt = true;
     this.context = row;
   },
   handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val-1;
        //console.log(this.page);
      },
   SearchResult() {
        //console.log(this.search)
        let res =  this.UserList.filter(item => {return !this.search || item.id.toLowerCase().includes(this.search.toLowerCase())});
        //console.log(res);

        
        if (!res.length) {
          this.NewsUserList = []
        }else{
          this.NewsUserList = res;
        }

        //console.log(this.NewsUserList)
      }
  },
  created() {
     const h = this.$createElement;

        this.$notify({
          title: '友情提示',
          message: h('span', { style: 'color: red'}, '1 是新闻发布员')
        });
  }
};
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
  .title{
    text-indent: 1.5rem;
    color: #72767b;
  }
  .list{
    width: 90%;
    height: 480px;
    margin: 0 auto;
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