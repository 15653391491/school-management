<template>
  <el-divider v-bind="$attrs" content-position="left">
    <slot></slot>
  </el-divider>
</template>

<script>
export default {
  name: "Divider"
}
</script>

<style scoped>

</style>