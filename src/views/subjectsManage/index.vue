<template>
  <div class="box col-wrapper">
    <el-tabs type="border-card" class="tabs">
      <el-tab-pane label="User">User</el-tab-pane>
      <el-tab-pane label="Config">Config</el-tab-pane>
      <el-tab-pane label="Role">Role</el-tab-pane>
      <el-tab-pane label="Task">Task</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style lang="less" scoped>
.box {
  .tabs {
    width: 100%;
  }
}
</style>