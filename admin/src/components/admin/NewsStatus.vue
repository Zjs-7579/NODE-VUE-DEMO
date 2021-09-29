<template>
  <div>
    <el-tabs type="border-card">
  <el-tab-pane>
    <span slot="label"><i class="el-icon-folder-checked"></i> 审核成功</span>
    <CheckData :CheckList="Success"/>
  </el-tab-pane>
  <el-tab-pane>
    <span slot="label"><i class="el-icon-folder-delete"></i> 审核失败</span>
    <CheckData :CheckList="unSuccessful"/>
  </el-tab-pane>
  <el-tab-pane>
    <span slot="label"><i class="el-icon-folder"></i> 审核进行</span>
    <CheckData :CheckList="Process"/>
  </el-tab-pane> 
</el-tabs>
  </div>
</template>

<script>
import CheckData from './NewsStatus/CheckData.vue'
import {mapState} from 'vuex'
export default {
  data() {
    return {

    }
  },
  components: {
    CheckData
  },
  computed: {
    ...mapState(['SuccessList', 'DefeatedList','ExamineList', 'User']),
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
    },
    Process: {
      get() {
        const res = this.ExamineList.filter(item=>{
          return item.reviewer === this.User.id
        });
        return res
      },
      set(val) {
        console.log(val)
        this.Process = val
      }
    }
  }
}
</script>

<style>

</style>