<template>
  <label for="uploadImg">
    <input
      @change="uploadImgFun"
      id="uploadImg"
      type="file"
      accept="image/png,image/gif,image/jpeg"
      class="inputImg"/>
    <slot name="contain"></slot>
  </label>
</template>

<script>
export default {
  methods: {
    /**
     * 上传图片
     * @param e
     */
    uploadImgFun(e) {
      console.log(e.target.files)
      let params = new FormData()
      params['file'] = e.target.files[0]
      console.log(params)
    },
  }
}
</script>

<style scoped>
.inputImg {
  display: none;
}
</style>
