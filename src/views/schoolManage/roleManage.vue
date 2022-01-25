<template>
  <div class="box col-wrapper">
    <el-button @click="add" type="primary">新增</el-button>
    <el-table class="table" :border="true" :data="tableData">
      <el-table-column prop="name" align="center" label="角色" min-width="100">
      </el-table-column>
      <el-table-column align="center" label="学校管理" min-width="80">
        <template #default="scope">
          <div v-show="scope.row.permissions.indexOf(1)!==-1">√</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="基础信息" min-width="80">
        <template #default="scope">
          <div v-show="scope.row.permissions.indexOf(2)!==-1">√</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色管理" min-width="80">
        <template #default="scope">
          <div v-show="scope.row.permissions.indexOf(3)!==-1">√</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="管理员设置" min-width="80">
        <template #default="scope">
          <div v-show="scope.row.permissions.indexOf(4)!==-1">√</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="年级/班级管理" min-width="80">
        <template #default="scope">
          <div v-show="scope.row.permissions.indexOf(5)!==-1">√</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="教务处管理" min-width="80">
        <template #default="scope">
          <div v-show="scope.row.permissions.indexOf(6)!==-1">√</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="科目管理" min-width="80">
        <template #default="scope">
          <div v-show="scope.row.permissions.indexOf(7)!==-1">√</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="教师管理" min-width="80">
        <template #default="scope">
          <div v-show="scope.row.permissions.indexOf(8)!==-1">√</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="教师信息" min-width="80">
        <template #default="scope">
          <div v-show="scope.row.permissions.indexOf(13)!==-1">√</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="小组管理" min-width="80">
        <template #default="scope">
          <div v-show="scope.row.permissions.indexOf(9)!==-1">√</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="学生管理" min-width="80">
        <template #default="scope">
          <div v-show="scope.row.permissions.indexOf(10)!==-1">√</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="家长管理" min-width="80">
        <template #default="scope">
          <div v-show="scope.row.permissions.indexOf(11)!==-1">√</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="专家管理" min-width="80">
        <template #default="scope">
          <div v-show="scope.row.permissions.indexOf(12)!==-1">√</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="100">
        <template #default="scope">
          <div class="row-wrapper" v-show="scope.row.role!==1">
            <el-button type="success" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-popconfirm confirm-button-text="确定"
                           cancel-button-text="取消"
                           @confirm="del(scope.row)"
                           :title="'确认删除'+scope.row.name+'吗?'">
              <template #reference>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--  添加弹窗  -->
    <Dialog v-model="addRoleVisiable"
            title="添加新角色"
            @close="addRoleVisiable=false">
      <Form>
        <el-form-item label="角色名称">
          <Input v-model="addForm.name"/>
        </el-form-item>
        <el-form-item label="权限">
          <CheckboxGroup @change="permissionChange" v-model="addForm.permissions">
            <Checkbox v-for="item in permissions" :label="item.value" :key="item.value">
              {{ item.label }}
            </Checkbox>
          </CheckboxGroup>
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
            @close="editRoleVisiable=false">
      <Form>
        <el-form-item label="角色名称">
          <Input v-model="editForm.name"/>
        </el-form-item>
        <el-form-item label="权限">
          <CheckboxGroup @change="permissionChange" v-model="editForm.permissions">
            <Checkbox v-for="(item,index) in permissions" :label="index" :key="index">
              {{ item.label }}
            </Checkbox>
          </CheckboxGroup>
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
import Input from "@/components/elementUtils/components/element-ui/Input";
import Checkbox from "@/components/elementUtils/components/element-ui/Checkbox";
import CheckboxGroup from "@/components/elementUtils/components/element-ui/CheckboxGroup";

export default {
  name: "roleManage",
  components: {CheckboxGroup, Checkbox, Input},
  data() {
    return {
      tableData: [{
        name: '超级管理员',
        permissions: [1, 3, 9],
        role: 1
      }, {
        name: '管理员',
        permissions: [1, 3, 9],
        role: 2
      },],
      addRoleVisiable: false,
      editRoleVisiable: false,
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
      addForm: {
        name: '',
        permissions: []
      },
      editForm: {
        name: '',
        permissions: []
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
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  padding: 25px;
  align-items: flex-start;

  .table {
    width: 85vw;
    margin-top: 15px;
  }
}
</style>