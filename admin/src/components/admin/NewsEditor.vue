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
    <el-switch v-model="form.pinned"></el-switch>
  </el-form-item>
  <el-form-item label="文章撰写：">
    <Editor :form="form" :FromEmpty="FromEmpty"/>
  </el-form-item>
</el-form>
</template>
<script>
  import Editor from './Editor.vue'
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
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
      FromEmpty() {
        this.form.title = '',
        this.form.news_class ='',
        this.form.edit = '',
        this.form.source = '',
        this.form.pinned = false;
        this.form.tag = []
      }
    }
  }
</script>