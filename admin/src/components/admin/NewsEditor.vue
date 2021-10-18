<template>
  <el-form ref="form" :model="form" label-width="100px">
  <el-form-item label="文章标题：">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
  <el-form-item label="文章类型：">
    <el-select v-model="form.news_class" placeholder="请选择文章类型">
      <span v-for="item in NewsClass" :key="item.classify_id">
        <el-option :label=item.classify_name :value=item.news_className></el-option>
      </span>
    </el-select>
  </el-form-item>
  <el-form-item label="文章标签：">
    <el-select
    v-model="form.tag"
    multiple
    filterable
    allow-create
    default-first-option
    placeholder="请选择文章标签">
    <el-option
      v-for="item in TagNews"
      :key="item.tag_id"
      :label="item.tag_name"
      :value="item.tag_alias">
    </el-option>
  </el-select>
  </el-form-item>

  <el-form-item label="文章编辑：">
    <el-input v-model="form.edit"></el-input>
  </el-form-item>
  <el-form-item label="文章来源：">
    <el-input v-model="form.source"></el-input>
  </el-form-item>
  
  <el-form-item label="是否推荐：">
    <el-switch v-model="pinnedImg"></el-switch>
  </el-form-item>
  <el-form-item label="文章撰写：">
    <Editor :form="form" :FromEmpty="FromEmpty"/>
  </el-form-item>


  <el-dialog
  title="提示"
  :visible.sync="pinnedImgDiv"
  width="40%"
  :before-close="handleClose">
  <div class="ImgDiv">
    <input accept="image/png,image/jpeg,image/jpg" type="file" value="上传图片" ref="ImgUrl" @change="uploadIMG($event)">
    <img src="" ref="Img" alt="">
  </div>

  <span slot="footer" class="dialog-footer">
    <el-button @click="Pinned(0)">取 消</el-button>
    <el-button type="primary" @click="Pinned(1)">确 定</el-button>
  </span>
</el-dialog>

</el-form>




</template>
<script>
  import Editor from './Editor.vue'
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        pinnedImg: false,
        pinnedImgDiv: false,
        form: {
          //标题
          title: '',
          //类型
          news_class: '',
          //写作人
          edit: '',
          //来源
          source: '',
          //置顶
          pinned: false,
          //base64编码图片
          imageUrl: '',
          //标签
          tag: [],       
        }
      }
    },
    computed: {
      ...mapState(['NewsClass', 'TagNews'])
    },
    components: {
      Editor
    },
    methods: {
      uploadIMG(e) {
        //console.log(e)
        //that = this
        //var img = this.$refs.ImgUrl;
        //console.log(img.files[0])
        var reader = new FileReader();
        //console.log(reader)
        reader.readAsDataURL(e.target.files[0])
        reader.onload = ()=>{
          let result = reader.result;
          //return result
          //this.imageUrl = result.toString()
          if(result.length<9000){
            this.$refs.Img.src = result
          }else{
            this.$message({
              message: '图片过大，建议换一张图片(5kb左右即可)',
              type: 'warning'
            });
            this.$refs.Img.src = ''
          }
          
        }
        //console.log(this.imageUrl)
      },
      FromEmpty() {
        this.form.title = '',
        this.form.news_class ='',
        this.form.edit = '',
        this.form.source = '',
        this.form.pinned = false;
        this.form.tag = []
      },
      handleClose(done) {
        console.log(done)
        this.$confirm('确认关闭？')
          .then(() => {
            this.form.imageUrl = ''
            this.pinnedImg = false,
            this.pinnedImgDiv = false
            done();
          })
          .catch(() => {});
      },
      Pinned(val) {
        //console.log(val)
        if(val){ 
          this.form.imageUrl = this.$refs.Img.src;
          this.form.pinned = true;
          this.pinnedImgDiv = false
        }else{
          this.form.imageUrl = ''
          this.pinnedImg = false,
          this.pinnedImgDiv = false
        }        
      }
    },
    watch: {
      pinnedImg(bool) {
        if(!bool) {
          this.form.imageUrl = ''
        }
        this.pinnedImgDiv = bool
      }
    }
  }
</script>
<style scoped>
  .ImgDiv{
    width: 100%;
    height: 100%;
  }
  .ImgDiv input{
    display: block;
  }
  .ImgDiv img{
    display: block;
    margin: 15px 0;
    width: 100%;
  }
</style>