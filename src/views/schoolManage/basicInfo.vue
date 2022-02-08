<template>
  <div class="box col-wrapper">
    <Form inline>
      <el-form-item label="省">
        <el-select v-model="form.provice">
          <el-option label="山东省" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="市">
        <el-select v-model="form.city">
          <el-option label="淄博市" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="区">
        <el-select v-model="form.county">
          <el-option label="张店区" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学段学制">
        <el-select v-model="form.stage">
          <el-option label="高中三年制" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="add" type="primary">新增</el-button>
      </el-form-item>
    </Form>
    <el-table class="table" :border="true" :data="tableData">
      <el-table-column prop="name" align="center" label="学校名" min-width="100">
      </el-table-column>
      <el-table-column prop="district" align="center" label="省市区" min-width="80">
      </el-table-column>
      <el-table-column prop="stage" align="center" label="学段学制" min-width="80">
      </el-table-column>
      <el-table-column prop="address" align="center" label="地址" min-width="80">
      </el-table-column>
      <el-table-column prop="classNum" align="center" label="班级数" min-width="80">
      </el-table-column>
      <el-table-column prop="studentNum" align="center" label="学生数" min-width="80">
      </el-table-column>
      <el-table-column prop="teacherNum" align="center" label="老师数" min-width="80">
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="80">
        <template #default="scope">
          <el-button type="success"
                     size="small"
                     @click="edit(scope.row)">编辑
          </el-button>
          <el-popconfirm confirm-button-text="确定"
                         cancel-button-text="取消"
                         @confirm="del(scope.row)"
                         :title="'确认删除'+scope.row.name+'吗?'">
            <template #reference>
              <el-button type="danger"
                         size="small">删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--  分页  -->
    <div class="row-wrapper pagination">
      <Pagination v-model:currentPage="page.page"
                  :total="page.total"
                  :page-size="page.limit"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange">
      </Pagination>
    </div>
    <!--  添加弹窗  -->
    <Dialog v-model="addRoleVisiable"
            title="添加新角色"
            width="20vw"
            @close="addRoleVisiable=false">
      <Form>
        <el-form-item label="学校名称">
          <Input v-model="addForm.name"/>
        </el-form-item>
        <el-form-item label="省">
          <el-select v-model="addForm.province">
            <el-option label="山东省" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="市">
          <el-select v-model="addForm.city">
            <el-option label="淄博市" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区">
          <el-select v-model="addForm.county">
            <el-option label="张店区" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学段学制">
          <el-select v-model="addForm.stageNum">
            <el-option label="高中三年制" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址">
          <Input v-model="addForm.address"/>
        </el-form-item>
        <el-form-item label="班级数">
          <Input type="number" v-model="addForm.classNum"/>
        </el-form-item>
        <el-form-item label="学生数" >
          <Input type="number" v-model="addForm.studentNum"/>
        </el-form-item>
        <el-form-item label="老师数">
          <Input type="number" v-model="addForm.teacherNum"/>
        </el-form-item>
        <el-form-item>
          <Button type="primary">保存</Button>
          <Button @click="editRoleVisiable=false">取消</Button>
        </el-form-item>
      </Form>
    </Dialog>
    <!--  编辑弹窗  -->
    <Dialog v-model="editRoleVisiable"
            title="编辑角色"
            width="20vw"
            @close="editRoleVisiable=false">
      <Form>
        <el-form-item label="学校名称">
          <Input v-model="editForm.name"/>
        </el-form-item>
        <el-form-item label="省">
          <el-select v-model="editForm.province">
            <el-option label="山东省" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="市">
          <el-select v-model="editForm.city">
            <el-option label="淄博市" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区">
          <el-select v-model="editForm.county">
            <el-option label="张店区" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学段学制">
          <el-select v-model="editForm.stageNum">
            <el-option label="高中三年制" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址">
          <Input v-model="editForm.address"/>
        </el-form-item>
        <el-form-item label="班级数">
          <Input type="number" v-model="editForm.classNum"/>
        </el-form-item>
        <el-form-item label="学生数" >
          <Input type="number" v-model="editForm.studentNum"/>
        </el-form-item>
        <el-form-item label="老师数">
          <Input type="number" v-model="editForm.teacherNum"/>
        </el-form-item>
        <el-form-item>
          <Button type="primary">保存</Button>
          <Button @click="editRoleVisiable=false">取消</Button>
        </el-form-item>
      </Form>
    </Dialog>
  </div>
</template>

<script>
import Form from "@/components/elementUtils/components/element-ui/Form";
import Input from "@/components/elementUtils/components/element-ui/Input";

export default {
  name: "roleManage",
  components: {Input, Form},
  data() {
    return {
      permissions: [
        {
          label: '学校管理',
          value: 1
        }, {
          label: '基础信息',
          value: 2
        }, {
          label: '角色管理',
          value: 3
        }, {
          label: '管理员设置',
          value: 4
        }, {
          label: '年级/班级管理',
          value: 5
        }, {
          label: '教务处管理',
          value: 6
        }, {
          label: '科目管理',
          value: 7
        }, {
          label: '教师管理',
          value: 8
        }, {
          label: '小组管理',
          value: 9
        }, {
          label: '学生管理',
          value: 10
        }, {
          label: '家长管理',
          value: 11
        }, {
          label: '专家管理',
          value: 12
        }, {
          label: '教师信息',
          value: 13
        },],
      // --- 表格 ---
      tableData: [
        {
          name: '淄博中学',
          district: '山东省淄博市张店区',
          stage: '高中三年制度',
          address: '',
          classNum: 10,
          studentNum: 4000,
          teacherNum: 20,
          province: '1',
          city: '1',
          county: '1'
        }],
      page: {
        page: 1,
        limit: 10,
        total: 100
      },
      form: {
        provice: '1',
        city: '1',
        county: '1',
        stage: '1'
      },
      // --- 增加角色 ---
      addRoleVisiable: false,
      addForm: {
        name: '',
        city: '1',
        province: '1',
        county: '1',
        stage: '高中三年制',
        stageNum: '1',
        address: '',
        classNum: undefined,
        studentNum: undefined,
        teacherNum: undefined,
      },
      // --- 修改角色 ---
      editRoleVisiable: false,
      editForm: {
        name: '',
        city: '1',
        province: '1',
        county: '1',
        stage: '高中三年制',
        stageNum: '1',
        address: '',
        classNum: undefined,
        studentNum: undefined,
        teacherNum: undefined,
      }
    }
  },
  methods: {
    /**
     * 编辑
     * @param row
     */
    edit(row) {
      let rowJson = JSON.stringify(row)
      this.editForm = JSON.parse(rowJson)
      this.editRoleVisiable = true
    },
    /**
     * 添加
     */
    add() {
      this.addRoleVisiable = true
    },
    /**
     * 权限变更
     */
    permissionChange() {
      console.log(this.addForm.permissions)
    },
    /**
     * 删除某角色
     * @param row
     */
    del(row) {
      this.$message.error(row.name)
    },
    handleSizeChange(val) {
      this.page.page = 1
      this.page.limit = val
    },
    handleCurrentChange(val) {
      this.page.page = val
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  padding: 15px;
  align-items: flex-start;

  .table {
    width: 85vw;
    margin-top: 15px;
  }

  .pagination {
    width: 100%;
    padding: 15px 0;
    justify-content: center;
  }
}
</style>