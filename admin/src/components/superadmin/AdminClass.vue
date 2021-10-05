<template>
  <div>
    <ClassList />
    <TagClass />
    <el-button type="primary" class="btn" @click="UpNews">确认提交</el-button>
    <DataGraph/>
    <br>
    
  </div>
</template>

<script>
import ClassList from "./AdminClass/ClassList.vue";
import TagClass from "./AdminClass/TagClass.vue";
import DataGraph from "./AdminClass/DataGraph.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["NewsClass"]),
    ...mapState(["TagNews"]),
  },
  components: {
    ClassList,
    TagClass,
    DataGraph
  },
  methods: {
    UpNews() {
      this.$confirm("此操作会更新数据库, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const newsClass = this.NewsClass.filter((item) => {
            return item.type === "warning";
          });
          const TagClass = this.TagNews.filter((item) => {
            return item.type === "warning";
          });
          //console.log(this.NewsClass, this.TagNews)
          //console.log(newsClass, TagClass)
          if (newsClass == "") {
            console.log("无新闻分类添加");
          } else {
            newsClass.forEach((item) => {
              item.type = "success";
            });
            const res = await this.$http.post("upnewsclass", newsClass);
            if (res.data.code === 404) {
              this.$message({
                type: "danger",
                message: "添加失败!",
              });
            } else {
              this.$message({
                type: "success",
                message: "添加成功!",
              });
            }
          }

          if (TagClass == "") {
            console.log("无新闻标签添");
          } else {
            TagClass.forEach((item) => {
              item.type = "success";
            });
            const res = await this.$http.post("uptagclass", TagClass);
            if (res.data.code === 404) {
              this.$message({
                type: "danger",
                message: "添加失败!",
              });
            } else {
              this.$message({
                type: "success",
                message: "添加成功!",
              });
            }
          }

          this.$store.dispatch("UP_TAG_NEWCLASS");
        })
        .catch(() => {
          console.log("dsadsa");
          this.$message({
            type: "info",
            message: "取消成功",
          });
        });
    },
  },
};
</script>

<style scoped>
.btn {
  margin: 25px 30px;
}
</style>