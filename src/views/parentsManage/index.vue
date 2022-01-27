<template>
  <div class="box">
    <div class="form">
      <Form inline>
        <el-form-item label="家长名称">
          <Input/>
        </el-form-item>
        <el-form-item>
          <Button type="success">搜索</Button>
        </el-form-item>
      </Form>
    </div>
    <div class="table">
      <el-table :data="tableData">
        <el-table-column align="center"
                         prop="deptName"
                         label="学生学号">
        </el-table-column>
        <el-table-column align="center"
                         prop="mobile"
                         label="学生姓名">
        </el-table-column>
        <el-table-column align="center"
                         prop="remark"
                         label="家长序号">
        </el-table-column>
        <el-table-column align="center"
                         prop="remark"
                         label="家长姓名">
        </el-table-column>
        <el-table-column align="center"
                         prop="remark"
                         label="联系方式">
        </el-table-column>
        <el-table-column align="center"
                         prop="remark"
                         label="主要监护人">
        </el-table-column>
        <el-table-column align="center"
                         prop="remark"
                         label="激活状态">
        </el-table-column>
        <el-table-column align="center"
                         label="操作">
          <template #default="scope">
            <div class="row-wrapper option">
              <Button size="small" @click="edit(scope.row)" :type="'success'">编辑</Button>
              <el-popconfirm confirm-button-text="确定"
                             cancel-button-text="取消"
                             @confirm="del(scope.row)"
                             :title="'确认删除吗?'">
                <template #reference>
                  <Button size="small" :type="'error'">删除</Button>
                </template>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--  分页器  -->
    <div class="pagination row-wrapper">
      <Pagination v-model:currentPage="page.page"
                  :total="page.total"
                  :page-size="page.limit"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange">
      </Pagination>
    </div>
    <!--  新增弹窗  -->
    <Dialog v-model="addVisiable"
            title="添加教务处"
            @close="addVisiable=false">
      <Form>
        <el-form-item label="名称">
          <Input v-model="addForm.name"/>
        </el-form-item>
        <el-form-item label="联系方式">
          <Input v-model="addForm.mobile"/>
        </el-form-item>
        <el-form-item label="备注">
          <Input type="textarea" v-model="addForm.remark"/>
        </el-form-item>
        <el-form-item>
          <Button :type="'primary'">确定</Button>
          <Button @click="addVisiable=false">取消</Button>
        </el-form-item>
      </Form>
    </Dialog>
    <!--  编辑弹窗  -->
    <Dialog v-model="editVisiable"
            title="添加教务处"
            @close="editVisiable=false">
      <Form>
        <el-form-item label="名称">
          <Input v-model="editForm.name"/>
        </el-form-item>
        <el-form-item label="联系方式">
          <Input v-model="editForm.mobile"/>
        </el-form-item>
        <el-form-item label="备注">
          <Input type="textarea" v-model="editForm.remark"/>
        </el-form-item>
        <el-form-item>
          <Button :type="'primary'">确定</Button>
          <Button @click="editVisiable=false">取消</Button>
        </el-form-item>
      </Form>
    </Dialog>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      tableData: [
        {
          studentId: '201921009003',
          studentName:'张程',
          parentId:'000005871',
          parentName:'爸爸',
          mobile: '18653360414',
          mainGuardian:'1',
          isActive:'1',
          remark: '11111111'
        }
      ],
      page: {
        page: 1,
        limit: 10,
        total: 100
      },
      //  --- 新增弹窗 ---
      addVisiable: false,
      addForm: {
        name: '',
        mobile: '',
        remark: ''
      },
      //  --- 编辑弹窗 ---
      editVisiable: false,
      editForm: {}
    }
  },
  methods: {
    /**
     * 编辑行
     * @param row
     */
    edit(row) {
      this.editForm = row
      this.editVisiable = true
    },
    /**
     * 新增
     */
    add() {
      this.addVisiable = true
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
  .form {
    padding: 0 15px;
  }

  .table {
    padding: 15px;
    width: 85vw;
  }

  .pagination {
    justify-content: center;
    width: 100%;
  }
}

.option {
  justify-content: center;
}

</style>