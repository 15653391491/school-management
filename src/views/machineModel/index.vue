<template>
  <div class="box">
    <div class="form">
      <Form inline>
        <el-form-item label="型号">
          <el-select>
            <el-option label="a-001" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="录入时间">
          <el-date-picker type="date">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="录入人">
          <el-select>
            <el-option label="张三" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <Button :type="'success'">搜索</Button>
          <Button :type="'primary'" @click="add">添加</Button>
        </el-form-item>
      </Form>
    </div>
    <div class="table">
      <el-table :data="tableData">
        <el-table-column align="center"
                         prop="studentId"
                         label="型号">
        </el-table-column>
        <el-table-column align="center"
                         prop="studentName"
                         label="录入时间">
        </el-table-column>
        <el-table-column align="center"
                         prop="parentId"
                         label="录入人">
        </el-table-column>
        <el-table-column align="center"
                         prop="parentName"
                         label="备注">
        </el-table-column>
        <el-table-column align="center"
                         label="说明文件">
          <template #default>
            <span class="link">
              下载
            </span>
          </template>
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
                  <Button size="small" :type="'danger'">删除</Button>
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
            title="添加新型号"
            width="20vw"
            @close="addVisiable=false">
      <Form>
        <el-form-item label="型号">
          <Input v-model="addForm.name"/>
        </el-form-item>
        <el-form-item label="说明文件">
          <Button type="primary">
            <label for="uploadFile">
              <input style="display: none" id="uploadFile" type="file"/>上传文件
            </label>
          </Button>
        </el-form-item>
        <el-form-item label="备注">
          <Input type="textarea"/>
        </el-form-item>
      </Form>
      <template #footer>
        <Button :type="'primary'">确定</Button>
        <Button @click="addVisiable=false">取消</Button>
      </template>
    </Dialog>
    <!--  编辑弹窗  -->
    <Dialog v-model="editVisiable"
            title="编辑设备型号"
            width="20vw"
            @close="editVisiable=false">
      <div class="row-wrapper editForm">
        <Form>
          <el-form-item label="型号">
            <Input v-model="editForm.name"/>
          </el-form-item>
          <el-form-item label="说明文件">
            <Button type="primary">
              <label for="uploadFile2">
                <input style="display: none" id="uploadFile2" type="file"/>上传文件
              </label>
            </Button>
          </el-form-item>
          <el-form-item label="备注">
            <Input type="textarea"/>
          </el-form-item>
        </Form>
      </div>
      <template #footer>
        <Button type="primary">确认</Button>
        <Button>取消</Button>
      </template>
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
          studentName: '张程',
          parentId: '000005871',
          parentName: '11111111',
          parentAccount: '',
          mobile: '18653360414',
          password: '123456',
          mainGuardian: '1',
          isActive: '1',
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

.editForm {
  justify-content: space-between;
}

.link {
  color: #3a8ee6;
}

.link:hover {
  cursor: pointer;
}
</style>