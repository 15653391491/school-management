<template>
  <div class="box">
    <div class="form">
      <Form inline>
        <el-form-item label="退换货类型">
          <el-select>
            <el-option label="退货" value="1"></el-option>
            <el-option label="换货" value="2"></el-option>
          </el-select>
        </el-form-item>
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
        <el-form-item label="退换货日期">
          <el-date-picker type="date"/>
        </el-form-item>
        <el-form-item label="处理状态">
          <el-select>
            <el-option label="已完成" value="1"></el-option>
            <el-option label="未完成" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单号">
          <Input/>
        </el-form-item>
        <el-form-item>
          <Button type="success">搜索</Button>
          <Button type="primary" @click="add">新增</Button>
        </el-form-item>
      </Form>
    </div>
    <div class="table">
      <el-table :data="tableData">
        <el-table-column align="center"
                         prop="studentId"
                         label="退换货类型">
        </el-table-column>
        <el-table-column align="center"
                         prop="studentName"
                         label="设备类型">
        </el-table-column>
        <el-table-column align="center"
                         prop="parentId"
                         label="设备编号">
        </el-table-column>
        <el-table-column align="center"
                         prop="parentName"
                         label="设备型号">
        </el-table-column>
        <el-table-column align="center"
                         prop="mobile"
                         label="退换货日期">
        </el-table-column>
        <el-table-column align="center"
                         prop="remark"
                         label="处理状态">
          <template #default="scope">
            <span v-show="scope.row.mainGuardian==='1'">是</span>
            <span v-show="scope.row.mainGuardian==='2'">否</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         prop="mobile"
                         label="收货地址">
        </el-table-column>
        <el-table-column align="center"
                         prop="mobile"
                         label="收货人联系方式">
        </el-table-column>
        <el-table-column align="center"
                         prop="mobile"
                         label="快递订单号">
        </el-table-column>
        <el-table-column align="center"
                         prop="remark"
                         label="备注">
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
            width="20vw"
            title="新增退换货"
            @close="addVisiable=false">
      <Form>
        <el-form-item label="退换货类型">
          <el-select>
            <el-option label="退货" value="1"></el-option>
            <el-option label="换货" value="2"></el-option>
          </el-select>
        </el-form-item>
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
        <el-form-item label="退换货日期">
          <el-date-picker type="date"/>
        </el-form-item>
        <el-form-item label="订单号">
          <Input/>
        </el-form-item>
        <el-form-item label="收货地址">
          <Input/>
        </el-form-item>
        <el-form-item label="收货人联系方式">
          <Input/>
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
            title="编辑退换货"
            width="20vw"
            @close="editVisiable=false">
      <div class="row-wrapper editForm">
        <Form>
          <el-form-item label="退换货类型">
            <el-select>
              <el-option label="退货" value="1"></el-option>
              <el-option label="换货" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退换货是否已经完成">
            <el-switch v-model="editForm.finish" />
          </el-form-item>
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
          <el-form-item label="退换货日期">
            <el-date-picker type="date"/>
          </el-form-item>
          <el-form-item label="订单号">
            <Input/>
          </el-form-item>
          <el-form-item label="收货地址">
            <Input/>
          </el-form-item>
          <el-form-item label="收货人联系方式">
            <Input/>
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
          parentName: '爸爸',
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
      editForm: {
        finish: false
      }
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