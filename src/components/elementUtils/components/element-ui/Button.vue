<template>
  <el-button v-on="$listeners" v-bind="$attrs">
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  name: 'Button'
}
</script>

<style scoped>

</style>
