<template>
  <div class="box col-wrapper">
    <div class="contain">
      <el-form class="form" label-position="right" label-width="auto">
        <el-form-item label="名称">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="学校Logo">
          <el-button type="primary">上传图片</el-button>
        </el-form-item>
        <el-form-item label="学校学段">
          <div class="col-wrapper gradeContent">
            <div class="content row-wrapper">
              <el-checkbox v-model="primary" label="小学" border></el-checkbox>
              <el-select v-show="primary" v-model="form.primaryEs" style="margin-left: 15px">
                <el-option value="1" label="五年制"></el-option>
                <el-option value="2" label="六年制"></el-option>
              </el-select>
            </div>
            <div class="content row-wrapper" style="margin-top: 5px">
              <el-checkbox v-model="junior" label="初中" border></el-checkbox>
              <el-select v-show="junior" v-model="form.juniorEs" style="margin-left: 15px">
                <el-option value="1" label="三年制"></el-option>
                <el-option value="2" label="四年制"></el-option>
              </el-select>
            </div>
            <div class="content row-wrapper" style="margin-top: 5px">
              <el-checkbox v-model="height" label="高中" border></el-checkbox>
              <el-select v-show="height" v-model="form.heightEs" style="margin-left: 15px">
                <el-option value="1" label="三年制"></el-option>
              </el-select>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="所属地区">
          <div class="row-wrapper">
            <el-select v-model="form.province">
              <el-option value="1" label="山东省"></el-option>
            </el-select>
            <el-select v-model="form.city" style="margin-left: 15px">
              <el-option value="1" label="淄博市"></el-option>
            </el-select>
            <el-select v-model="form.county" style="margin-left: 15px">
              <el-option value="1" label="张店区"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.mobile"/>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="form.address"/>
        </el-form-item>
        <el-form-item label="学校简介">
          <Input v-model="form.introduction" type="textarea"/>
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
  name: "basicInfo",
  data() {
    return {
      primary: true,
      junior: true,
      height: true,
      form: {
        name: '建享实验教育',
        mobile: '15552662020',
        address: '高科技创业园',
        introduction: '建享教育实验校',
        primaryEs: '1', // 小学学制
        juniorEs: '1', // 初中学制
        heightEs: '1', // 高中学制
        province: '1', // 省
        city: '1', // 市
        county: '1' // 县
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  padding: 15px;

  .contain {
    align-self: flex-start;

    .form {
      margin-left: 15px;
    }
  }
}

.gradeContent {
  .content {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>