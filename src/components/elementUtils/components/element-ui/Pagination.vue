<template>
  <el-pagination v-bind="$attrs"
                 :page-sizes="[10, 20, 30, 40]"
                 layout="total,prev, pager, next,sizes,jumper">
  </el-pagination>
</template>

<script>
export default {
  name: "Pagination",
}
</script>

<style scoped>

</style>