<template>
  <div>
    <h1>未审阅数据</h1>
    <el-table
    :data="News[this.page]"
    class="table">
   <el-table-column type="index" width="100"> </el-table-column>
      <el-table-column prop="id" label="ID" width="200"> </el-table-column>
      <el-table-column prop="title" label="标题" width="600"> </el-table-column>
      <el-table-column prop="reviewer" label="发布人ID" width="200">
      </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">
          <i class="el-icon-view"></i>
          </el-button>
          <el-button
          size="mini"
          type="success"
          @click="handleSuccess(scope.row)">
          <i class="el-icon-s-claim"></i>
          </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">
            <i class="el-icon-s-release"></i>
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
import NewsContext from '../superadmin/ContextLook/NewsContext.vue'
import {mapState} from 'vuex'
  export default {
    data() {
      return {
        //NewsList: [],
        //NewsListPages: [],
        page: 0,
        drawer: false,
        context: '',
      }
    },
    components: {
      NewsContext
    },
    computed: {
      ...mapState(['ExamineList']),
      News: {
        get() {
          const list = [];
          let current = [];
          this.ExamineList.forEach(item => {
            current.push(item);
            if (current.length === 9) {
                list.push(current);
                current = [];
            }
          });

          if (current.length) {
              list.push(current);
          }

          return list


          //return this.NewsListPages[this.page]
        },
        set(val) {
          this.News = val
        }
      },
      sumPages: {
        get() {
          return this.ExamineList.length
        },
        set(val) {
          this.sumPages = val
        }
      }

    },
    methods: {
      handleEdit(row) {
        //console.log(index, row);
        this.context = row
        this.drawer = true
      },
      async handleSuccess(row) {
        console.log(row);
        //console.log(this.ExamineList);
        //this.ExamineList.splice(index, 1);
        let time = Date.now();
        const flag = '2'
        const data = {id:row.id, news_class: row.news_class, time, flag}
        const res = await this.$http.post('upnewsflag', data)
        //console.log(res)
        

        if (res.data.code === 200) {
            this.$store.dispatch('UpNewsFlag', data)
            this.ExamineList.forEach((item, index)=>{
              if(item.id === row.id){
                this.ExamineList.splice(index, 1)
              } 
            })        
            this.$message.success('文章审阅成功')
        }else{
          this.$message.error('数据更新失败')
        }
        // res.then(
        //   (d)=>{
        //     console.log(da.data.code)
        //     // if (d.data.code === 200) {
        //     //   console.log('qqq')
        //     //   this.$store.dispatch('UpNewsFlag', data)
        //     //   this.$message.success('文章审阅成功')
        //     // }else{
        //     //    this.$message.error('数据更新失败')
        //     // }
        //   }
        
        
      },
      async handleDelete(row) {
        console.log(row);
        //console.log(this.ExamineList);
        //this.ExamineList.splice(index, 1);
        let time = Date.now();
        const flag = '3'
        const data = {id:row.id, news_class: row.news_class, time, flag}
        const res = await this.$http.post('upnewsflag', data)
        console.log(res)
        if (res.data.code === 200) {
            this.$store.dispatch('UpNewsFlag', data)
            this.ExamineList.forEach((item, index)=>{
              if(item.id === row.id){
                this.ExamineList.splice(index, 1)
              } 
            }) 
            this.$message.success('文章审阅成功')
        }else{
          this.$message.error('数据更新失败')
        }
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val-1;
        //console.log(this.page);
      }
    },

  }
</script>

<style scoped>
  h1{
    font-size: 25px;
    margin: 0;
  }
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
    margin: 15px auto;
    
  }
</style>