<template>
  <div class="box">
    <div class="form">
      <Form inline>
        <el-form-item label="学段">
          <el-select placeholder="学段">
            <el-option label="小学"></el-option>
            <el-option label="初中"></el-option>
            <el-option label="高中"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="老师姓名">
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
                         prop="account"
                         label="账号">
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
                         label="学段">
          <template #default="scope">
            <span v-show="scope.row.stage==='1'">小学</span>
            <span v-show="scope.row.stage==='2'">初中</span>
            <span v-show="scope.row.stage==='3'">高中</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         prop="grade"
                         label="年级">
        </el-table-column>
        <el-table-column align="center"
                         prop="class"
                         label="班级">
        </el-table-column>
        <el-table-column align="center"
                         prop="subject"
                         label="科目">
        </el-table-column>
        <el-table-column align="center"
                         prop="identity"
                         label="身份">
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
            title="添加教师信息"
            width="40vw"
            @close="addVisiable=false">
      <!--   表单   -->
      <Form class="form row-wrapper">
        <el-form-item label="账号">
          <Input class="input" v-model="addForm.name"/>
        </el-form-item>
        <el-form-item label="密码">
          <Input class="input" v-model="addForm.mobile"/>
        </el-form-item>
        <el-form-item label="联系方式">
          <Input class="input" v-model="addForm.remark"/>
        </el-form-item>
        <el-form-item label="姓名">
          <Input class="input" v-model="addForm.remark"/>
        </el-form-item>
        <el-form-item label="学段信息">
          <Input class="input" v-model="addForm.remark"/>
        </el-form-item>
        <el-form-item label="板子编号">
          <Input class="input" v-model="addForm.remark"/>
        </el-form-item>
      </Form>
      <div>
        <Button @click="addClassVisiable=true" :type="'primary'">添加班级</Button>
      </div>
      <el-table>
        <el-table-column align="center" label="学段"></el-table-column>
        <el-table-column align="center" label="年级"></el-table-column>
        <el-table-column align="center" label="班级"></el-table-column>
        <el-table-column align="center" label="身份"></el-table-column>
        <el-table-column align="center" label="科目"></el-table-column>
        <el-table-column align="center" label="操作"></el-table-column>
      </el-table>
      <template #footer>
        <Button :type="'primary'">确定</Button>
        <Button @click="addVisiable=false">取消</Button>
      </template>
    </Dialog>
    <!--  编辑弹窗  -->
    <Dialog v-model="editVisiable"
            title="编辑教师信息"
            width="40vw"
            @close="editVisiable=false">
      <!--   表单   -->
      <Form class="form row-wrapper">
        <el-form-item label="账号">
          <Input class="input" v-model="editForm.name"/>
        </el-form-item>
        <el-form-item label="密码">
          <Input class="input" v-model="editForm.mobile"/>
        </el-form-item>
        <el-form-item label="联系方式">
          <Input class="input" v-model="editForm.mobile"/>
        </el-form-item>
        <el-form-item label="姓名">
          <Input class="input" v-model="editForm.grade"/>
        </el-form-item>
        <el-form-item label="学段信息">
          <el-select class="input" v-model="editForm.stage">
            <el-option value="1" label="小学"></el-option>
            <el-option value="2" label="初中"></el-option>
            <el-option value="3" label="高中"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="板子编号">
          <Input class="input" v-model="editForm.machineModel"/>
        </el-form-item>
      </Form>
      <div>
        <Button @click="addClassVisiable=true" :type="'primary'">添加班级</Button>
      </div>
      <el-table>
        <el-table-column align="center" label="学段"></el-table-column>
        <el-table-column align="center" label="年级"></el-table-column>
        <el-table-column align="center" label="班级"></el-table-column>
        <el-table-column align="center" label="身份"></el-table-column>
        <el-table-column align="center" label="科目"></el-table-column>
        <el-table-column align="center" label="操作"></el-table-column>
      </el-table>
      <template #footer>
        <Button :type="'primary'">确定</Button>
        <Button @click="addVisiable=false">取消</Button>
      </template>
    </Dialog>
    <!--  添加班级  -->
    <Dialog v-model="addClassVisiable"
            title="添加班级"
            width="20vw"
            @close="addClassVisiable=false">
      <div class="col-wrapper dialog">
        <Form>
          <el-form-item label="学段信息">
            <el-select>
              <el-option label="高中"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年级">
            <el-select>
              <el-option label="2021"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级">
            <el-select>
              <el-option label="班级"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="科目">
            <el-select>
              <el-option label="化学"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="身份">
            <el-select>
              <el-option label="教师"></el-option>
            </el-select>
          </el-form-item>
        </Form>
      </div>
      <template #footer>
        <Button :type="'primary'">确定</Button>
        <Button @click="addVisiable=false">取消</Button>
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
          name: '张建英',
          mobile: '13853616123',
          stage: '2', // 1-小学 2- 初中 3- 高中
          grade: '一年级',
          class: '班级',
          subject: '政治',
          identity: '教师',
          account: 'zhangjianying',
          machineModel: ''
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
      editForm: {},
      //  --- 添加班级弹窗 ---
      addClassVisiable: false,
      addClassForm: {}
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

.form {
  justify-content: space-around;
  align-self: stretch;
  flex-wrap: wrap;
}

.input {
  width: 180px;
}
.dialog{
  align-items: stretch;
}
</style>