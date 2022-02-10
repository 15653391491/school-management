<template>
  <el-input class="input" v-bind="$attrs">
    <template #prefix>
      <slot></slot>
    </template>
  </el-input>
</template>

<script>
export default {
  name: "Input"
}
</script>

<style scoped>
.input {
  width: 214px;
}

</style>