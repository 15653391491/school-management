<template>
<el-form  label-position="right" label-width="auto" v-bind="$attrs">
  <slot></slot>
</el-form>
</template>

<script>
export default {
  name: "Form"
}
</script>

<style scoped>

</style>