<template>
  <div class="box">
    <el-tabs v-model="selectTab" type="card">
      <el-tab-pane name="grade" label="年级组管理">
        <div class="table">
          <el-table :data="tableData">
            <el-table-column align="center"
                             width="120"
                             type="index"
                             label="序号">
            </el-table-column>
            <el-table-column align="center"
                             prop="deptName"
                             label="组名">
            </el-table-column>
            <el-table-column align="center"
                             label="组长">
              <template #default="scope">
                <Button size="small"
                        @click="add(scope.row)"
                        :type="'success'">设置
                </Button>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="操作">
              <template #default="scope">
                <div class="row-wrapper option">
                  <Button size="small" @click="edit(scope.row)" :type="'success'">查看</Button>
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
      </el-tab-pane>
      <el-tab-pane name="teach" label="教研组管理">
        <div class="table">
          <el-table :data="tableData">
            <el-table-column align="center"
                             width="120"
                             type="index"
                             label="序号">
            </el-table-column>
            <el-table-column align="center"
                             prop="deptName"
                             label="组名">
            </el-table-column>
            <el-table-column align="center"
                             label="组长">
              <template #default="scope">
                <Button size="small"
                        @click="edit(scope.row)"
                        :type="'success'">设置
                </Button>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="操作">
              <template #default="scope">
                <div class="row-wrapper option">
                  <Button size="small" @click="edit(scope.row)" :type="'success'">查看</Button>
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
      </el-tab-pane>
      <el-tab-pane name="subject" label="备课组管理">
        <div class="table">
          <el-table :data="tableData">
            <el-table-column align="center"
                             width="120"
                             type="index"
                             label="序号">
            </el-table-column>
            <el-table-column align="center"
                             prop="deptName"
                             label="组名">
            </el-table-column>
            <el-table-column align="center"
                             label="组长">
              <template #default="scope">
                <Button size="small"
                        @click="edit(scope.row)"
                        :type="'success'">设置
                </Button>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="操作">
              <template #default="scope">
                <div class="row-wrapper option">
                  <Button size="small" @click="edit(scope.row)" :type="'success'">查看</Button>
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
      </el-tab-pane>
    </el-tabs>
    <!--  新增弹窗  -->
    <Dialog v-model="addVisiable"
            title="设置组长"
            @close="addVisiable=false">
      <Form>
        <el-form-item label="教师名称">
          <el-select>
            <el-option value="1" label="李老师"></el-option>
          </el-select>
        </el-form-item>
      </Form>
    </Dialog>
    <!--  编辑弹窗  -->
    <Dialog v-model="editVisiable"
            title="编辑专家"
            @close="editVisiable=false">
      <Form>
        <el-form-item label="组名">
          <Input v-model="editForm.name"/>
        </el-form-item>
        <el-form-item label="组长">
          <Input v-model="editForm.mobile"/>
        </el-form-item>
        <el-form-item label="成员">
          李老师
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
      selectTab: 'grade',
      tableData: [
        {
          name: '1111',
          mobile: '15655555555',
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