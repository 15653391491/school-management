<template>
  <div class="box">
    <div class="form">
      <Form inline>
        <el-form-item label="学段">
          <Input/>
        </el-form-item>
        <el-form-item label="入学年份">
          <el-select>
            <el-option value="1" label="2021"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级">
          <el-select>
            <el-option value="1" label="一年级"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-select>
            <el-option value="1" label="一班"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学生姓名">
          <Input/>
        </el-form-item>
        <el-form-item label="手写版号">
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
                         prop="studentId"
                         label="学号">
        </el-table-column>
        <el-table-column align="center"
                         prop="name"
                         label="姓名">
        </el-table-column>
        <el-table-column align="center"
                         prop="account"
                         label="账号">
        </el-table-column>
        <el-table-column align="center"
                         label="性别">
          <template #default="scope">
            <span v-show="scope.row.gender==='1'">男</span>
            <span v-show="scope.row.gender==='2'">女</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         prop="mobile"
                         label="联系方式">
        </el-table-column>
        <el-table-column align="center"
                         prop="stage"
                         label="学段">
          <template #default="scope">
            <span v-show="scope.row.stage==='1'">小学</span>
            <span v-show="scope.row.stage==='2'">初中</span>
            <span v-show="scope.row.stage==='3'">高中</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         prop="schoolYear"
                         label="年份">
          <template #default="scope">
            <span v-show="scope.row.schoolYear==='1'">2021</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         prop="grade"
                         label="年级">
        </el-table-column>
        <el-table-column align="center"
                         prop="class"
                         label="班级">
          <template #default="scope">
            <span v-show="scope.row.class==='1'">一班</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         prop="machineModel"
                         label="手写板编号">
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
            title="添加教务处"
            width="35vw"
            @close="addVisiable=false">
      <div class="row-wrapper form">
        <Form>
          <el-form-item label="姓名">
            <Input v-model="addForm.name"/>
          </el-form-item>
          <el-form-item label="学段">
            <Input v-model="addForm.name"/>
          </el-form-item>
          <el-form-item label="年级">
            <Input v-model="addForm.name"/>
          </el-form-item>
          <el-form-item label="出生日期">
            <Input v-model="addForm.name"/>
          </el-form-item>
          <el-form-item label="密码">
            <Input style="width: 180px" type="password" v-model="addForm.mobile"/>
          </el-form-item>
          <el-form-item label="qq邮箱">
            <Input v-model="addForm.remark"/>
          </el-form-item>
          <el-form-item label="板子编号">
            <Input v-model="addForm.remark"/>
          </el-form-item>
          <el-form-item label=" ">
          </el-form-item>
        </Form>
        <Form>
          <el-form-item label="学号">
            <Input v-model="addForm.mobile"/>
          </el-form-item>
          <el-form-item label="入学年份">
            <el-select>
              <el-option label="2021" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级">
            <el-select>
              <el-option label="一班" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-select>
              <el-option label="男" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=" ">
            <span>初始值:123456</span>
          </el-form-item>
          <el-form-item label="联系方式">
            <Input v-model="addForm.remark"/>
          </el-form-item>
        </Form>
      </div>
      <template #footer>
        <Button type="primary">确定</Button>
        <Button>取消</Button>
      </template>
    </Dialog>
    <!--  编辑弹窗  -->
    <Dialog v-model="editVisiable"
            title="编辑学生信息"
            width="35vw"
            @close="editVisiable=false">
      <div class="row-wrapper form">
        <Form>
          <el-form-item label="姓名">
            <Input v-model="editForm.name"/>
          </el-form-item>
          <el-form-item label="学段">
            <Input v-model="editForm.stage"/>
          </el-form-item>
          <el-form-item label="年级">
            <Input v-model="editForm.grade"/>
          </el-form-item>
          <el-form-item label="出生日期">
            <Input v-model="editForm.schoolYear"/>
          </el-form-item>
          <el-form-item label="密码">
            <Input style="width: 180px" type="password" v-model="editForm.password"/>
          </el-form-item>
          <el-form-item label="qq邮箱">
            <Input v-model="editForm.emaile"/>
          </el-form-item>
          <el-form-item label="板子编号">
            <Input v-model="editForm.machineModel"/>
          </el-form-item>
          <el-form-item label=" ">
          </el-form-item>
        </Form>
        <Form>
          <el-form-item label="学号">
            <Input v-model="editForm.studentId"/>
          </el-form-item>
          <el-form-item label="入学年份">
            <el-select v-model="editForm.schoolYear">
              <el-option label="2021" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级">
            <el-select v-model="editForm.class">
              <el-option label="一班" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="editForm.gender">
              <el-option label="男" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=" ">
            <span>初始值:123456</span>
          </el-form-item>
          <el-form-item label="联系方式">
            <Input v-model="editForm.mobile"/>
          </el-form-item>
        </Form>
      </div>
      <template #footer>
        <Button type="primary">确定</Button>
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
          studentId: '20200206002',
          name: '张三',
          account: 'ZHANGSAN1',
          gender: '1', // 1- 男 2- 女
          stage: '1', // 1-小学 2- 初中 3- 高中
          schoolYear: '1',
          grade: '一年级',
          class: '1',
          machineModel: '98cdac7f3ec0',
          mobile: '15655555555',
          remark: '11111111',
          password:'123456',
          emaile:'11111111@qq.com'
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

.form {
  justify-content: space-between;
  align-items: stretch;
  align-self: stretch;
}
</style>