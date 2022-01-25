<template>
  <div class="box col-wrapper">
    <div class="contain">
      <el-form class="form" label-position="right" label-width="auto">
        <el-form-item label="名称">
          <el-input/>
        </el-form-item>
        <el-form-item label="学校Logo">
          <el-button type="primary">上传图片</el-button>
        </el-form-item>
        <el-form-item label="学校学段">
          <el-input/>
        </el-form-item>
        <el-form-item label="所属地区">
          <el-input/>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input/>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input/>
        </el-form-item>
        <el-form-item label="学校简介">
          <el-input/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "basicInfo"
}
</script>

<style lang="less" scoped>
.box {
  padding: 15px;

  .contain {
    align-self: flex-start;
    .form{
      margin-left: 15px;
    }
  }
}
</style>