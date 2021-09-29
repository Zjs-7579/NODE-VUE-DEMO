<template>
  <div>
    <el-tabs type="border-card">
  <el-tab-pane>
    <span slot="label"><i class="el-icon-folder-checked"></i> 发布成功</span>
    <CheckList :CheckList="Success"/>
  </el-tab-pane>
  <el-tab-pane>
    <span slot="label"><i class="el-icon-folder-delete"></i> 发布失败</span>
    <CheckList :CheckList="unSuccessful"/>
  </el-tab-pane>
</el-tabs>
  </div>
</template>

<script>
import CheckList from './AdminNewsList/CheckList.vue'
import {mapState} from 'vuex'
export default {
  data() {
    return {

    }
  },
  components: {
    CheckList
  },
  computed: {
    ...mapState(['SuccessList', 'DefeatedList', 'User']),
    Success: {
      get() {
        console.log(this.SuccessList)
        console.log(this.User)
        const res = this.SuccessList.filter(item=>{
          return item.reviewer === this.User.id
        });
        console.log(res)
        return res
      },
      set(val) {
        console.log(val)
        this.Success = val
      }
    },
    unSuccessful: {
      get() {
        const res = this.DefeatedList.filter(item=>{
          return item.reviewer === this.User.id
        });
        return res
      },
      set(val) {
        console.log(val)
        this.unSuccessful = val
      }
    }
  }
}
</script>

<style>

</style>