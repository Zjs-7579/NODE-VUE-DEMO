<template>
  <div class="box">
    <el-timeline>
    <el-timeline-item icon="el-icon-edit" size="large" color="#409EFF" :timestamp="start_time" placement="top">
      <el-card>
        <h4>状态信息列表</h4>
        <p>此篇文章提交于 {{All_start_time}}</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item icon="el-icon-check" size="large" :color="color" :timestamp="end_time" placement="top" v-if="context.end_time">
      <el-card>
        <h4>状态信息列表</h4>
        <p>管理员审核于 {{All_end_time}}</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item icon="el-icon-more" size="large" color="#909399" :timestamp="start_time" placement="top" v-else>
      <el-card>
        <h4>状态信息列表</h4>
        <p>管理员在审核中....</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item size="large" :timestamp="end_time" placement="top" v-if="context.end_time">
      <el-card>
        <h4>状态信息列表</h4>
        <p>文章{{Choose}}于 {{All_end_time}}</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
  </div>
</template>

<script>
export default {
  props: ['context'],

  computed: {
    Choose: {
      get() {
        if(this.context.flag === '2'){
        return "发表"
      }

      if(this.context.flag === '3'){
        return "撤回"
      }else{
        return ''
      }
      },
      set(val) {
        this.Choose = val
      }
    },
    color: {
      get() {
        if(this.context.flag === '2'){
          return "#67C23A"
        }

        if(this.context.flag === '3'){
          return "#F56C6C"
        }else{
          return "#909399"
        }
      },
      set(val) {
        this.color = val
      }
    },
    start_time: {
      get() {
        const time = new Date(this.context.start_time*1);
        const data = time.getFullYear()+"/"+(time.getMonth()+1)+"/"+time.getDate();
        return data
      },
      set(val) {
        this.start_time = val
      }
    },
    All_start_time: {
      get() {
        const time = new Date(this.context.start_time*1);
        const data = time.getFullYear()+"/"+(time.getMonth()+1)+"/"+time.getDate()+" "+time.getHours()+":"+time.getMinutes();
        return data
      },
      set(val) {
        this.All_start_time = val
      }
    },
    end_time: {
      get() {
        const time = new Date(this.context.end_time*1);
        const data = time.getFullYear()+"/"+(time.getMonth()+1)+"/"+time.getDate();
        return data
      },
      set(val) {
        this.end_time = val
      }
    },
    All_end_time: {
      get() {
        const time = new Date(this.context.end_time*1);
        const data = time.getFullYear()+"/"+(time.getMonth()+1)+"/"+time.getDate()+" "+time.getHours()+":"+time.getMinutes();
        return data
      },
      set(val) {
        this.All_end_time = val
      }
    }
  }
}
</script>

<style scoped>
  .box{
    width: 90%;
    margin: 0 auto;
  }
</style>