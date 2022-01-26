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
      config: {
        name: 'zh-cn',
        el: {
          pagination: {
            total: '共',
            pagesize: '条每页',
            goto: '跳转至',
            pageClassifier: ''
          },
        },
      }
    }
  }
}
</script>

<style scoped>

</style>