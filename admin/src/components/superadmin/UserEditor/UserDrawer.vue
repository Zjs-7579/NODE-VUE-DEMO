<template>
  <div class="drawer">
    <el-descriptions title="用户信息">
      <el-descriptions-item label="用户名">{{
        item.username
      }}</el-descriptions-item>
      <el-descriptions-item label="手机号">{{item.root_call}}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{item.root_email}}</el-descriptions-item>
      <el-descriptions-item label="居住地">{{
        item.root_address
      }}</el-descriptions-item>
      <el-descriptions-item label="权限">
        <el-tag size="small">{{ item.root_flag }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style scoped>
.drawer {
  width: 90%;
  margin: 0 auto;
}
</style>