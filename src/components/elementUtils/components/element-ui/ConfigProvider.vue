<template>
  <el-config-provider v-bind="$attrs" :locale="configZh">
    <slot></slot>
  </el-config-provider>
</template>

<script>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default {
  name: "ConfigProvider",
  data() {
    return {
      configZh: zhCn,
    }
  }
}
</script>

<style scoped>

</style>