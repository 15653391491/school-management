<template>
  <div class="box">
    <!--  查询  -->
    <div class="form">
      <Form inline>
        <el-form-item label="入学年份">
          <el-date-picker v-model="form.schoolYear" type="year" placeholder="选择入学年份">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="学段">
          <el-select v-model="form.stage">
            <el-option value="1" label="全部"></el-option>
            <el-option value="2" label="小学"></el-option>
            <el-option value="3" label="初中"></el-option>
            <el-option value="4" label="高中"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <Button :type="'success'">搜索</Button>
          <Button :type="'primary'" @click="add">新增</Button>
        </el-form-item>
        <el-form-item>
          <Button :type="'warning'">数据导出</Button>
        </el-form-item>
      </Form>
    </div>
    <!--  表格  -->
    <div class="table">
      <el-table border :data="tableData">
        <el-table-column align="center"
                         width="120"
                         type="index"
                         label="序号">
        </el-table-column>
        <el-table-column align="center"
                         prop="schoolYear"
                         sortable
                         label="入学年份">
        </el-table-column>
        <el-table-column align="center"
                         prop="stage"
                         sortable
                         label="学段">
        </el-table-column>
        <el-table-column align="center"
                         prop="grade"
                         sortable
                         label="年级名称">
        </el-table-column>
        <el-table-column align="center"
                         prop="class"
                         sortable
                         label="班级名称">
        </el-table-column>
        <el-table-column align="center"
                         prop="subject" label="文理科"></el-table-column>
        <el-table-column align="center"
                         prop="model" label="手写板型号"></el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <div class="row-wrapper option">
              <Button size="small" @click="edit(scope.row)" :type="'success'">修改</Button>
              <el-popconfirm confirm-button-text="确定"
                             cancel-button-text="取消"
                             @confirm="del(scope.row)"
                             :title="'确认删除'+scope.row.deptName+'吗?'">
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
            title="新增年级"
            @close="addVisiable=false">
      <el-checkbox-group @change="checkboxChange" v-model="addForm.grade">
        <el-divider content-position="left">小学</el-divider>
        <el-checkbox class="checkbox-item" v-for="(item,index) in gradeConfig"
                     :key="index" :label="item">
          <div class="row-wrapper">
            <div>{{ item.gradeName }}</div>
            <Input class="littleInput" placeholder="班级数量" v-model="item.classNum"/>
            <div class="littleInput">
              <el-date-picker v-model="item.schoolYear"
                              :prefix-icon="customPrefix" placeholder="入学年份"
                              value-format="YYYY"
                              type="year">
              </el-date-picker>
            </div>
          </div>
        </el-checkbox>
        <Form>
          <el-form-item label="手写板型号">
            <el-select v-model="addForm.primaryMachineModel">
              <el-option value="1" label="T9y"></el-option>
            </el-select>
          </el-form-item>
        </Form>
        <el-divider content-position="left">初中</el-divider>
        <el-checkbox class="checkbox-item" v-for="(item,index) in JuniorGradeConfig"
                     :key="index" :label="item">
          <div class="row-wrapper">
            <div>{{ item.gradeName }}</div>
            <Input class="littleInput" placeholder="班级数量" v-model="item.classNum"/>
            <div class="littleInput">
              <el-date-picker v-model="item.schoolYear" placeholder="入学年份"
                              :prefix-icon="customPrefix"
                              value-format="YYYY"
                              type="year">
              </el-date-picker>
            </div>
          </div>
        </el-checkbox>
        <Form>
          <el-form-item label="手写板型号">
            <el-select v-model="addForm.juniorMachineModel">
              <el-option value="1" label="T9y"></el-option>
            </el-select>
          </el-form-item>
        </Form>
        <el-divider content-position="left">高中</el-divider>
        <el-checkbox class="checkbox-item" v-for="(item,index) in heightGradeConfig"
                     :key="index" :label="item">
          <div class="row-wrapper">
            <div>{{ item.gradeName }}</div>
            <Input placeholder="班级数量" class="littleInput" v-model="item.classNum"/>
            <div class="littleInput">
              <el-date-picker v-model="item.schoolYear" placeholder="入学年份"
                              :prefix-icon="customPrefix"
                              value-format="YYYY"
                              type="year">
              </el-date-picker>
            </div>
          </div>
        </el-checkbox>
        <Form>
          <el-form-item label="手写板型号">
            <el-select v-model="addForm.heightMachineModel">
              <el-option value="1" label="T9y"></el-option>
            </el-select>
          </el-form-item>
        </Form>
      </el-checkbox-group>

    </Dialog>
    <!--  编辑弹窗  -->
    <Dialog title="编辑" v-model="editVisiable" @close="editVisiable=false">
      <Form>
        <el-form-item label="入学年份">
          <Input v-model="editForm.schoolYear"/>
        </el-form-item>
        <el-form-item label="年级名称">
          <Input v-model="editForm.grade"/>
        </el-form-item>
        <el-form-item label="年级排序号">
          <Input v-model="editForm.gradeNum"/>
        </el-form-item>
        <el-form-item label="班级名称">
          <Input v-model="editForm.class"/>
        </el-form-item>
        <el-form-item label="班级排序号">
          <Input v-model="editForm.classNum"/>
        </el-form-item>
        <el-form-item label="手写板型号">
          <el-select v-model="editForm.model">
            <el-option value="1" label="T9y"></el-option>
            <el-option value="2" label="T9W-B-KZ"></el-option>
          </el-select>
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
import {shallowRef, h} from 'vue'
import Dialog from "@/components/elementUtils/components/element-ui/Dialog";
import Form from "@/components/elementUtils/components/element-ui/Form";
import Input from "@/components/elementUtils/components/element-ui/Input";

export default {
  name: "index",
  components: {Input, Form, Dialog},
  data() {
    return {
      page: {
        page: 1,
        limit: 10,
        total: 100
      },
      tableData: [
        {
          schoolYear: '2019',
          stage: '小学',
          grade: '二年级',
          gradeNum: '2',
          class: '一班',
          classNum: '1',
          subject: '文科',
          model: 'T9W-B-KZ',
          modelNum: '2'
        }
      ],
      form: {
        schoolYear: '',
        stage: '1'
      },
      //   --- 弹窗 ---
      addVisiable: false,
      addForm: {
        grade: [],
        primaryMachineModel: '1',
        juniorMachineModel: '1',
        heightMachineModel: '1'
      },
      gradeConfig: [
        {
          stage: '1', // 1-小学 2-初中 3-高中
          grade: '1',
          gradeName: '一年级',
          schoolYear: '',
          classNum: undefined
        },
        {
          stage: '1', // 1-小学 2-初中 3-高中
          grade: '2',
          gradeName: '二年级',
          schoolYear: '',
          classNum: undefined
        },
        {
          stage: '1', // 1-小学 2-初中 3-高中
          grade: '3',
          gradeName: '三年级',
          schoolYear: '',
          classNum: undefined
        },
        {
          stage: '1', // 1-小学 2-初中 3-高中
          grade: '4',
          gradeName: '四年级',
          schoolYear: '',
          classNum: undefined
        },
        {
          stage: '1', // 1-小学 2-初中 3-高中
          grade: '5',
          gradeName: '五年级',
          schoolYear: '',
          classNum: undefined
        },
        {
          stage: '1', // 1-小学 2-初中 3-高中
          grade: '6',
          gradeName: '六年级',
          schoolYear: '',
          classNum: undefined
        },
      ], // 小学
      JuniorGradeConfig: [
        {
          stage: '2', // 1-小学 2-初中 3-高中
          grade: '1',
          gradeName: '初一',
          schoolYear: '',
          classNum: undefined
        },
        {
          stage: '2', // 1-小学 2-初中 3-高中
          grade: '2',
          gradeName: '初二',
          schoolYear: '',
          classNum: undefined
        },
        {
          stage: '2', // 1-小学 2-初中 3-高中
          grade: '3',
          gradeName: '初三',
          schoolYear: '',
          classNum: undefined
        },
      ], // 初中
      heightGradeConfig: [
        {
          stage: '3', // 1-小学 2-初中 3-高中
          grade: '1',
          gradeName: '高一',
          schoolYear: '',
          classNum: undefined
        },
        {
          stage: '3', // 1-小学 2-初中 3-高中
          grade: '2',
          gradeName: '高二',
          schoolYear: '',
          classNum: undefined
        },
        {
          stage: '3', // 1-小学 2-初中 3-高中
          grade: '3',
          gradeName: '高三',
          schoolYear: '',
          classNum: undefined
        },
      ], //高中
      // --- 编辑 ---
      editForm: {},
      editVisiable: false
    }
  },
  computed: {
    customPrefix() {
      return shallowRef({
        render() {
          return h('p', 'pre')
        }
      })
    }
  },
  methods: {
    /**
     * 选择要增加的年级
     */
    checkboxChange() {
      console.log(this.addForm.grade)
    },
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
<style>
.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: unset;
}

.el-input--prefix .el-input__inner {
  padding-left: 5px;
  padding-right: 0;
}
</style>
<style lang="less" scoped>
.box {
  .form {
    padding: 0 15px;
  }

  .table {
    padding: 15px;
    width: 100%;
  }

  .pagination {
    justify-content: center;
    width: 100%;
  }
}

.option {
  justify-content: center;
}

.littleInput {
  width: 80px;
  margin-left: 5px;
}

.checkbox-item {
  margin: 5px 0;
}
</style>