<template>
  <div>
    <div>
      <vue-editor
        v-model="context"
        useCustomImageHandler
      />
    </div>
    <div>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="onEmpty">重置</el-button>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import {mapState} from 'vuex'
export default {
  props: ['form', 'FromEmpty'],
  data() {
		return{
      context: ''
		}
  },
  computed: {
    ...mapState(['NewsClass', 'User'])
  },
  components: { VueEditor },
  methods: {
    async onSubmit() {
      const id = Math.random().toString(36).substr(3);
      const {title,news_class,edit,source,pinned,tag } = this.form;
      let start_time = Date.now();
      const context = this.context;
      const username = this.User.id;    
      const dd = this.NewsClass.filter((item)=>{return item.news_className === news_class});
      const data =  {id, title, news_class, edit, source, tag, start_time, pinned, context, username, newsclass_flag: dd[0].flag, flag: '1'};
      
      console.log(data);
      if(dd[0].flag === '1'){  
        const res = await this.$http.post('/addnewsclass', data);
        if(res.data.code === 200){
          this.$store.dispatch('addText', data);
        }
      }

      const result = await this.$http.post('/addnews', data);
      if(result.data.code === 200){
          this.$message.success('恭喜你，新闻添加成功');
      }else{
        this.$message.error('对不起, 新闻添加失败');
      }
      
      
      this.FromEmpty();
      this.context = ''
      
    },
    onEmpty() {
      this.FromEmpty();
      this.context = ''
    }
  }

};
</script>

<style scoped>
/* @import "";
@import '~quill/dist/quill.core.css'; */
/* @import '~quill/dist/quill.bubble.css';
@import '~quill/dist/quill.snow.css'; */
</style>