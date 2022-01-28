<template>
  <div class="box">
    <div class="form">
      <Form inline>
        <el-form-item label="专家名称">
          <Input/>
        </el-form-item>
        <el-form-item>
          <Button type="success">搜索</Button>
          <Button>下载模板</Button>
          <Button type="success">数据导入</Button>
          <Button type="warning">数据导出</Button>
          <Button @click="addVisiable=true" type="primary">+新增</Button>
        </el-form-item>
      </Form>
    </div>
    <div class="table">
      <el-table :data="tableData">
        <el-table-column align="center"
                         width="120"
                         type="index"
                         label="序号">
        </el-table-column>
        <el-table-column align="center"
                         prop="name"
                         label="姓名">
        </el-table-column>
        <el-table-column align="center"
                         prop="mobile"
                         label="联系方式">
        </el-table-column>
        <el-table-column align="center"
                         label="操作">
          <template #default="scope">
            <div class="row-wrapper option">
              <Button size="small" @click="edit(scope.row)" :type="'success'">修改</Button>
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
            title="添加新专家"
            @close="addVisiable=false">
      <Form>
        <el-form-item label="联系方式">
          <Input style="width: 180px" v-model="addForm.mobile"/>
        </el-form-item>
        <el-form-item label="密码">
          <Input style="width: 180px;margin-right: 10px" v-model="addForm.remark"/>
          <span>初始值：123456</span>
        </el-form-item>
        <el-form-item label="名称">
          <Input style="width: 180px" v-model="addForm.name"/>
        </el-form-item>
        <el-form-item>
          <Button :type="'primary'">确定</Button>
          <Button @click="addVisiable=false">取消</Button>
        </el-form-item>
      </Form>
    </Dialog>
    <!--  编辑弹窗  -->
    <Dialog v-model="editVisiable"
            title="编辑专家"
            @close="editVisiable=false">
      <Form>
        <el-form-item label="联系方式">
          <Input style="width: 180px" v-model="editForm.mobile"/>
        </el-form-item>
        <el-form-item label="密码">
          <Input style="width: 180px;margin-right: 10px" v-model="editForm.remark"/>
          <span>初始值：123456</span>
        </el-form-item>
        <el-form-item label="名称">
          <Input style="width: 180px" v-model="editForm.name"/>
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
          name: '贾舒',
          mobile: '15552662020',
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