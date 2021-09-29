<template>
  <div class="box">
    <hr>
    <div class="title">{{context.title}}</div>
    <div class="msg">
      <span>{{start_time}}</span><span>|</span>
      <span>来源：{{context.source}}</span><span>|</span>
      <span>编辑：{{context.edit}}</span>
    </div>
    <div v-html="context.context"></div>
  </div>
  
</template>

<script>
export default {
  props: ['context'],
  computed:{
    start_time: {
      get() {

        const time = new Date(this.context.start_time*1);
        const data = time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
        return data
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
  .title{
    color: #333;
    font-size: 35px;
    line-height: 50px;
    padding: 15px 0;
  }
  .msg{
    display: flex;
    color: #888;
  }
  span{
    display: block;
    margin-right: 15px;
  }
</style>