<template>
  <el-switch
    v-on="$listeners"
    v-bind="$attrs"
    v-model="value"
    active-color="#13ce66"
    inactive-color="#ff4949"
  >
  </el-switch>
</template>

<script>
export default {
  name: 'Switch'
}
</script>

<style scoped>

</style>
