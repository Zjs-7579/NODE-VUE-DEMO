<template>
  <div class="box">
    <div style="background-color: #409EFF">
      <h3>新闻总数</h3>
      <p class="p1"><i class="el-icon-s-data"></i> {{Sum}} <span>条数据</span> </p>
      <p class="p2"><i class="el-icon-paperclip"></i> <span>所有新闻分类的总和，不包括未审阅的</span></p>
    </div>
    <div style="background-color: #F56C6C">
      <h3>未审核</h3>
      <p class="p1"><i class="el-icon-data-analysis"></i> {{Examine}} <span>条数据</span></p>
      <p class="p2"><i class="el-icon-paperclip"></i> <span>当前作者发布但未审阅的</span></p>
    </div>
    <div style="background-color: #67C23A">
      <h3>审核通过</h3>
      <p class="p1"><i class="el-icon-data-line"></i> {{Success}} <span>条数据</span></p>
      <p class="p2"><i class="el-icon-paperclip"></i> <span>新闻符合条件，同意发布</span></p>
    </div>
    <!-- <div>
     <el-progress type="circle" :width="230" :percentage="25"></el-progress>
    </div>
    <div>
     
    </div>
    <div>
    </div>
    <div>
    </div> -->

    
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
   data(){
     return {
      
     }
   },
   computed: {
     ...mapState(['NewsList', 'ExamineList', 'SuccessList']),
     Sum: {
       get() {
         let index = 0;
         this.NewsList.forEach((item) => {
           if(item){
             index= index+1
           }
         });
         return index
         
       },
       set(val){
         console.log(val)
         this.Sum = val
       }
     },
     Examine: {
       get() {
         let index = 0;
         this.ExamineList.forEach((item) => {
           if(item){
             index= index+1
           }
         });
         return index
       },
       set(val){
         console.log(val)
         this.Examine = val
       }
     },
     Success: {
       get() {
         let index = 0;
         this.SuccessList.forEach((item) => {
           if(item){
             index= index+1
           }
         });
         return index
       },
       set(val){
         console.log(val)
         this.Success = val
       }
     }
   },
  methods: {
    
  }
}
</script>

<style scoped>
  .box{
    width: 100%;
    height: 180px;
    display: flex;
    justify-content:space-around;
    color: white;
  }
  .box div{
    width: 350px;
    height: 180px;
    border-radius: 15px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  h3{
    text-indent: 0.5rem;
  }
  i{
    margin: 0 auto;
    padding: 0;
  }
  p{
    margin: 0;
    padding: 0;
  }
  .p1{
    font-size: 40px;
    text-indent: 1rem;
  }
  .el-icon-thumb{
    display: inline-block;
    
  }
  span{
    font-size: 15px;
  }
  .p2{
    text-indent: 1rem;
    padding-top: 20px;
  }
</style>