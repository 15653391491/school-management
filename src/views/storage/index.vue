<template>
  <div class="box">
    <div class="form">
      <Form inline>
        <el-form-item label="设备类型">
          <el-select>
            <el-option label="手写板" value="1"></el-option>
            <el-option label="笔芯" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备编号">
          <Input/>
        </el-form-item>
        <el-form-item label="设备型号">
          <el-select>
            <el-option label="a-001" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入库时间">
          <el-date-picker type="date">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="出库时间">
          <el-date-picker type="date">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="入库人">
          <el-select>
            <el-option label="张三" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出库人">
          <el-select>
            <el-option label="张三" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <Button :type="'success'">搜索</Button>
          <Button @click="add" :type="'primary'">入库新设备</Button>
        </el-form-item>
      </Form>
    </div>
    <div class="table">
      <el-table :data="tableData">
        <el-table-column align="center"
                         prop="machineType"
                         label="设备类型">
        </el-table-column>
        <el-table-column align="center"
                         prop="studentId"
                         label="设备编号">
        </el-table-column>
        <el-table-column align="center"
                         prop="machineCode"
                         label="设备型号">
        </el-table-column>
        <el-table-column align="center"
                         prop="putinTime"
                         label="入库时间">
        </el-table-column>
        <el-table-column align="center"
                         prop="putinPerson"
                         label="入库人">
        </el-table-column>
        <el-table-column align="center"
                         prop="putoutTime"
                         label="出库时间">
        </el-table-column>
        <el-table-column align="center"
                         prop="outputPerson"
                         label="出库人">
        </el-table-column>
        <el-table-column align="center"
                         prop="remark"
                         label="出库入库状态">
          <template #default="scope">
            <span v-show="scope.row.mainGuardian==='1'">已入库</span>
            <span v-show="scope.row.mainGuardian==='2'">已出库</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         prop="remark"
                         label="备注">
        </el-table-column>
        <el-table-column align="center"
                         label="操作">
          <template #default="scope">
            <div class="row-wrapper option">
              <el-popconfirm confirm-button-text="确定"
                             cancel-button-text="取消"
                             @confirm="del(scope.row)"
                             :title="'确认出库设备'+scope.row.studentId+'吗?'">
                <template #reference>
                  <Button size="small" :type="'danger'">出库</Button>
                </template>
              </el-popconfirm>
              <Button size="small" @click="edit(scope.row)" :type="'primary'">出入库历史记录</Button>
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
            title="上架新设备"
            width="20vw"
            @close="addVisiable=false">
      <Form>
        <el-form-item label="设备编号">
          <Input v-model="addForm.name"/>
        </el-form-item>
        <el-form-item label="设备型号">
          <el-select>
            <el-option value="1" label="a-001"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <Input :type="'textarea'" v-model="addForm.remark"/>
        </el-form-item>
        <el-form-item>
          <Button :type="'primary'">确定</Button>
          <Button @click="addVisiable=false">取消</Button>
        </el-form-item>
      </Form>
    </Dialog>
    <!--  编辑弹窗  -->
    <Dialog v-model="editVisiable"
            :title="'设备 '+editForm.studentId + ' 出入库历史记录'"
            width="60vw"
            @close="editVisiable=false">
      <div class="col-wrapper editForm">
        <el-table>
          <el-table-column align="center"
                           label="时间">
          </el-table-column>
          <el-table-column align="center"
                           label="出库/入库">
          </el-table-column>
          <el-table-column align="center"
                           label="操作人">
          </el-table-column>
        </el-table>
        <Pagination v-model:currentPage="page.page"
                    :total="page.total"
                    :page-size="page.limit"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange">
        </Pagination>
      </div>
      <template #footer>
        <Button :type="'primary'">确认</Button>
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
          machineType: '手写板',
          studentId: '201921009003',
          machineCode: 'a-001',
          putinTime: '2020-02-09 16:43:00',
          putoutTime: '2020-02-09 16:43:00',
          putinPerson: '张三',
          parentAccount: '',
          outputPerson: '张三',
          password: '123456',
          mainGuardian: '1',
          isActive: '1',
          remark: '11111111'
        },
        {
          machineType: '笔芯',
          studentId: '201921009003',
          machineCode: 'a-002',
          putinTime: '2020-02-09 16:43:00',
          putinPerson: '李四',
          putoutTime: '2020-02-09 16:43:00',
          parentAccount: '',
          outputPerson: '李四',
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
</style>