<template>
  <div class="classlist">
    <p>新闻标签</p>
    <el-tag
    :key="item.tag_id"
    v-for="item in TagNews"
    :type="item.type"
    closable
    :disable-transitions="false"
    @close="handleClose(item.tag_name)">
    {{item.tag_name}}
  </el-tag>
  <el-input
    class="input-new-tag"
    v-if="inputVisible"
    v-model="inputValue"
    ref="saveTagInput"
    size="medium"
    @keyup.enter.native="handleInputConfirm"
    @blur="handleInputConfirm"
  >
  </el-input>
  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  </div>
</template>

<script>
 import {mapState} from 'vuex'
  export default {
    data() {
      return {
        
        inputVisible: false,
        inputValue: ''
      };
    },
    computed: {
      ...mapState(['TagNews'])

    },
    methods: {
      handleClose(tag_name) {
        this.$confirm('此操作将永久删除该新闻分类,并且删除此分类所有新闻, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let num = ''
          this.TagNews.forEach(
            (x,index)=>{
              //console.log(x);
              //console.log(index);
              if(x.tag_name === tag_name) {
                num = index
              }  
          });
          if(this.TagNews[num].type === 'success'){
            const res = await this.$http.post('deltagclass', this.TagNews[num]);
            //console.log(res)
            if(res.data.code === 200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
            this.$store.dispatch('delTagNews', num)
          }else{
            this.$store.dispatch('delTagNews', num)
            this.$message({
                type: 'success',
                message: '删除成功!'
              });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          let res = this.TagNews.filter((item)=>{return item.tag_name === inputValue});
          //console.log(res);
          if(res.length){
            this.$message({
              showClose: true,
              message: '输入错误，请重新输入',
              type: 'error'
            });
          }else{

            this.$prompt('请输入此标签的英文名', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputPattern: /^(\w){3,20}$/,
              inputErrorMessage: '长度在3-20之间'
            }).then(({ value }) => {
              this.$message({
                type: 'success',
                message: '你创建的数据库表名: ' + value
              });
              let time = Date.now();
              this.TagNews.push({tag_id: time, tag_name: inputValue, tag_alias: value, type: 'warning'});
              this.$store.dispatch('getTagNews', this.TagNews)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消输入'
              });       
            });         
          }        
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
  }
</script>

<style scoped>
  .classlist{
    margin: 30px;
  }
  .el-tag + .el-tag {
    margin: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>