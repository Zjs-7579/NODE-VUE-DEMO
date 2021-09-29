<template>
  <div>
    <el-table :data="News" stripe class="table">
      <el-table-column type="index" width="100"> </el-table-column>
      <el-table-column prop="id" label="ID" width="200"> </el-table-column>
      <el-table-column prop="title" label="标题" width="600"> </el-table-column>
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
      <!-- eslint-disable-next-line -->
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="Timepiece(scope.row)">
          <i class="el-icon-view"></i>
          </el-button>
      </template>
    </el-table-column>
    </el-table>


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

 <el-drawer
  title="状态图"
  :visible.sync="drawer"
  direction="ltr"
  size="50%">
  <Timeline :context="context"/>
</el-drawer>

  </div>

</template>

<script>
import Timeline from './Timeline.vue'
export default {
  props: ['CheckList'],
  data() {
    return {
      drawer: false,
      search: '',
      context: '',
      page: 0,
      resultData: []
    }
  },
  components: {
    Timeline
  },
  computed: {
    News: {
      get() {
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
  methods: {
    Timepiece(row) {
      this.drawer = true;
      this.context = row;
      console.log(row)
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