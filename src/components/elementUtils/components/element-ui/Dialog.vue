<template>
  <el-dialog
    :width="$attrs.width===undefined?'30%':$attrs.width"
    :title="$attrs.title===undefined?'提示':$attrs.title"
    v-bind="$attrs"
    :before-close="handleClose">
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  methods: {
    /**
     * 关闭窗口
     */
    handleClose() {
      this.dialogVisible = false
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
