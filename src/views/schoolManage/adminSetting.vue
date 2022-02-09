<template>
  <div class="box col-wrapper">
    <div class="head row-wrapper">
      <Button @click="addVisiable=true" class="add" :type="'primary'">+新增</Button>
      <div class="text">
        <span>密码初始值123456</span>
      </div>
    </div>
    <el-table :data="tableData" class="table" :border="true">
      <el-table-column type="index" align="center" width="80" label="序号"></el-table-column>
      <el-table-column prop="account" align="center" label="账号"></el-table-column>
      <el-table-column prop="userName" align="center" label="姓名"></el-table-column>
      <el-table-column prop="role" align="center" label="角色名称"></el-table-column>
      <el-table-column prop="mobile" align="center" label="电话号码"></el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <div class="row-wrapper" style="justify-content: center">
            <Button size="small" @click="editAdmin(scope.row)" type="success">修改</Button>
            <el-popconfirm confirm-button-text="确定"
                           cancel-button-text="取消"
                           @confirm="del(scope.row)"
                           :title="'确认删除'+scope.row.userName+'吗?'">
              <template #reference>
                <Button size="small" type="danger">删除</Button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="row-wrapper pagination">
      <Pagination v-model:currentPage="page.page"
                  :total="page.total"
                  :page-size="page.limit"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange">
      </Pagination>
    </div>
    <!--  添加弹窗  -->
    <Dialog v-model="addVisiable"
            title="添加管理员"
            @close="addVisiable=false">
      <div class="dialogCon">
        <Form>
          <el-form-item label="账号">
            <Input v-model="addForm.account"/>
          </el-form-item>
          <el-form-item label="密码">
            <div class="row-wrapper formItem">
              <Input type="password" v-model="addForm.password"/>
              <div class="tips">
                <span>初始值:123456</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="addForm.role">
              <el-option value="1" label="超级管理员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名">
            <Input v-model="addForm.userName"/>
          </el-form-item>
          <el-form-item label="联系方式">
            <Input v-model="addForm.mobile"/>
          </el-form-item>
          <el-form-item>
            <Button type="primary">保存</Button>
            <Button @click="addVisiable=false">取消</Button>
          </el-form-item>
        </Form>
      </div>
    </Dialog>
    <!--  编辑弹窗  -->
    <Dialog v-model="editVisiable"
            title="编辑角色"
            @close="editVisiable=false">
      <div class="dialogCon">
        <Form>
          <el-form-item label="账号">
            <Input v-model="editForm.account"/>
          </el-form-item>
          <el-form-item label="密码">
            <div class="row-wrapper formItem">
              <Input type="password" v-model="editForm.password"/>
              <div class="tips">
                <span>初始值:123456</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="editForm.role">
              <el-option value="1" label="超级管理员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名">
            <Input v-model="editForm.userName"/>
          </el-form-item>
          <el-form-item label="联系方式">
            <Input v-model="editForm.mobile"/>
          </el-form-item>
          <el-form-item>
            <Button type="primary">保存</Button>
            <Button @click="editVisiable=false">取消</Button>
          </el-form-item>
        </Form>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Button from "@/components/elementUtils/components/element-ui/Button";

export default {
  name: "adminSetting",
  components: {Button},
  data() {
    return {
      tableData: [
        {
          account: '15552662020',
          userName: '贾舒',
          role: '超级管理员',
          mobile: '15552662020',
          password: '123456'
        }
      ],
      page: {
        page: 1,
        limit: 10,
        total: 100
      },
      addVisiable: false,
      editVisiable: false,
      addForm: {
        account: '',
        password: '123456',
        role: '1',
        userName: '',
        mobile: ''
      },
      editForm: {}
    }
  },
  activated() {
    this.$store.commit('setIndexPath', ['用户管理', '/adminSetting'])
  },
  methods: {
    /**
     * 修改管理员
     * @param row
     */
    editAdmin(row) {
      this.editForm = row
      this.editVisiable = true
    },
    /**
     * 删除超级管理员
     * @param row
     */
    del(row) {
      console.log(row)
    },
    /**
     * 每页条数变化
     * @param val
     */
    handleSizeChange(val) {
      this.page.page = 1
      this.page.limit = val
    },
    /**
     * 翻页
     * @param val
     */
    handleCurrentChange(val) {
      this.page.page = val
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  padding: 15px;

  .head {
    width: 100%;

    .add {
      align-self: flex-start;
    }

    .text {
      padding: 0 15px;
    }
  }

  .table {
    width: 85vw;
    margin-top: 15px;
  }

  .pagination {
    justify-content: center;
    width: 100%;
    padding: 15px 0;
  }
}

.formItem {
  align-items: flex-start;

  .tips {
    padding: 0 15px;
    width: 200px;
  }
}

.dialogCon {
  padding: 15px;
}
</style>