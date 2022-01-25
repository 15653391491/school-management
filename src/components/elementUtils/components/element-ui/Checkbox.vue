<template>
  <el-checkbox v-bind="$attrs" border>
    <slot></slot>
  </el-checkbox>
</template>

<script>
export default {
  name: "Checkbox"
}
</script>

<style scoped>

</style>