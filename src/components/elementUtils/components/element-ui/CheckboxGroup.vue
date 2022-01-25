<template>
  <el-checkbox-group v-bind="$attrs">
    <slot></slot>
  </el-checkbox-group>
</template>

<script>
export default {
  name: "CheckboxGroup"
}
</script>

<style scoped>

</style>