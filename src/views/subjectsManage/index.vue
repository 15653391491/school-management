<template>
  <div class="box">
    <el-tabs v-model="selectTab" type="card">
      <el-tab-pane name="primary" label="小学科目设置">
        <div class="form">
          <Button @click="addVisiable=true" :type="'primary'">+新增</Button>
        </div>
        <div class="table">
          <el-table :data="tableData">
            <el-table-column align="center"
                             prop="name"
                             label="科目年级">
            </el-table-column>
            <el-table-column align="center"
                             label="一年级">
              <template #default="scope">
                <span v-show="scope.row.grade.indexOf(1)!==-1">√</span>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="二年级">
              <template #default="scope">
                <span v-show="scope.row.grade.indexOf(2)!==-1">√</span>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="三年级">
              <template #default="scope">
                <span v-show="scope.row.grade.indexOf(3)!==-1">√</span>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="四年级">
              <template #default="scope">
                <span v-show="scope.row.grade.indexOf(4)!==-1">√</span>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="五年级">
              <template #default="scope">
                <span v-show="scope.row.grade.indexOf(5)!==-1">√</span>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="六年级">
              <template #default="scope">
                <span v-show="scope.row.grade.indexOf(6)!==-1">√</span>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="操作">
              <template #default="scope">
                <div class="row-wrapper option">
                  <Button size="small" @click="edit(scope.row)" :type="'success'">修改</Button>
                  <el-popconfirm confirm-button-text="确定"
                                 cancel-button-text="取消"
                                 @confirm="del(scope.row)"
                                 :title="'确认删除'+scope.row.name+'吗?'">
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
      </el-tab-pane>
      <el-tab-pane name="junior" label="初中科目设置">
        <div class="form">
          <Button @click="addVisiable=true" :type="'primary'">+新增</Button>
        </div>
        <div class="table">
          <el-table :data="tableData">
            <el-table-column align="center"
                             prop="name"
                             label="科目年级">
            </el-table-column>
            <el-table-column align="center"
                             label="初一">
              <template #default="scope">
                <span v-show="scope.row.grade.indexOf(1)!==-1">√</span>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="初二">
              <template #default="scope">
                <span v-show="scope.row.grade.indexOf(2)!==-1">√</span>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="初三">
              <template #default="scope">
                <span v-show="scope.row.grade.indexOf(3)!==-1">√</span>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="操作">
              <template #default="scope">
                <div class="row-wrapper option">
                  <Button size="small" @click="edit(scope.row)" :type="'success'">修改</Button>
                  <el-popconfirm confirm-button-text="确定"
                                 cancel-button-text="取消"
                                 @confirm="del(scope.row)"
                                 :title="'确认删除'+scope.row.name+'吗?'">
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
      </el-tab-pane>
      <el-tab-pane name="height" label="高中科目设置">
        <div class="form">
          <Button @click="addVisiable=true" :type="'primary'">+新增</Button>
        </div>
        <div class="table">
          <el-table :data="tableData">
            <el-table-column align="center"
                             prop="name"
                             label="科目年级">
            </el-table-column>
            <el-table-column align="center"
                             label="高一">
              <template #default="scope">
                <span v-show="scope.row.grade.indexOf(1)!==-1">√</span>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="高二(文科)">
              <template #default="scope">
                <span v-show="scope.row.grade.indexOf(2)!==-1">√</span>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="高二(理科)">
              <template #default="scope">
                <span v-show="scope.row.grade.indexOf(3)!==-1">√</span>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="高三(文科)">
              <template #default="scope">
                <span v-show="scope.row.grade.indexOf(2)!==-1">√</span>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="高三(理科)">
              <template #default="scope">
                <span v-show="scope.row.grade.indexOf(3)!==-1">√</span>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="操作">
              <template #default="scope">
                <div class="row-wrapper option">
                  <Button size="small" @click="edit(scope.row)" :type="'success'">修改</Button>
                  <el-popconfirm confirm-button-text="确定"
                                 cancel-button-text="取消"
                                 @confirm="del(scope.row)"
                                 :title="'确认删除'+scope.row.name+'吗?'">
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
      </el-tab-pane>
    </el-tabs>
    <!--  新增弹窗  -->
    <Dialog v-model="addVisiable"
            title="添加科目"
            @close="addVisiable=false">
      <Form>
        <el-form-item label="科目名称">
          <Input v-model="addForm.name"/>
        </el-form-item>
        <el-form-item>
          <CheckboxGroup v-show="selectTab==='primary'" v-model="addForm.grade">
            <Checkbox v-for="item in primaryConfig"
                      checked
                      :key="item.key"
                      :label="item.key">{{ item.label }}
            </Checkbox>
          </CheckboxGroup>
          <CheckboxGroup v-show="selectTab==='junior'" v-model="addForm.grade">
            <Checkbox v-for="item in juniorConfig"
                      checked
                      :key="item.key"
                      :label="item.key">{{ item.label }}
            </Checkbox>
          </CheckboxGroup>
          <CheckboxGroup v-show="selectTab==='height'" v-model="addForm.grade">
            <Checkbox v-for="item in heightConfig"
                      checked
                      :key="item.key"
                      :label="item.key">{{ item.label }}
            </Checkbox>
          </CheckboxGroup>
        </el-form-item>
        <el-form-item>
          <Button :type="'primary'">确定</Button>
          <Button @click="addVisiable=false">取消</Button>
        </el-form-item>
      </Form>
    </Dialog>
    <!--  编辑弹窗  -->
    <Dialog v-model="editVisiable"
            title="修改科目"
            @close="editVisiable=false">
      <Form>
        <el-form-item label="名称">
          <Input v-model="editForm.name"/>
        </el-form-item>
        <el-form-item>
          <CheckboxGroup v-show="selectTab==='primary'" v-model="editForm.grade">
            <Checkbox v-for="item in primaryConfig"
                      :checked="editForm.grade.indexOf(item.key)!==-1"
                      :key="item.key"
                      :label="item.key">{{ item.label }}
            </Checkbox>
          </CheckboxGroup>
          <CheckboxGroup v-show="selectTab==='junior'" v-model="editForm.grade">
            <Checkbox  v-for="item in juniorConfig"
                       :checked="editForm.grade.indexOf(item.key)!==-1"
                      :key="item.key"
                      :label="item.key">{{ item.label }}
            </Checkbox>
          </CheckboxGroup>
          <CheckboxGroup v-show="selectTab==='height'" v-model="editForm.grade">
            <Checkbox v-for="item in heightConfig"
                      :checked="editForm.grade.indexOf(item.key)!==-1"
                      :key="item.key"
                      :label="item.key">{{ item.label }}
            </Checkbox>
          </CheckboxGroup>
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
import CheckboxGroup from "@/components/elementUtils/components/element-ui/CheckboxGroup";
import Checkbox from "@/components/elementUtils/components/element-ui/Checkbox";

export default {
  name: "index",
  components: {Checkbox, CheckboxGroup},
  data() {
    return {
      selectTab: 'primary',
      tableData: [
        {
          name: '语文',
          grade: [1, 2, 3, 4, 5, 6],
        },
        {
          name: '英语',
          grade: [1, 2, 5, 6],
        },
      ],
      page: {
        page: 1,
        limit: 10,
        total: 100
      },
      primaryConfig: [
        {
          label: '一年级',
          key: 1
        }, {
          label: '二年级',
          key: 2
        }, {
          label: '三年级',
          key: 3
        }, {
          label: '四年级',
          key: 4
        }, {
          label: '五年级',
          key: 5
        }, {
          label: '六年级',
          key: 6
        },
      ], // 小学
      juniorConfig: [
        {
          label: '初一',
          key: 1
        }, {
          label: '初二',
          key: 2
        }, {
          label: '初三',
          key: 3
        }
      ], // 初中
      heightConfig: [
        {
          label: '高一',
          key: 1
        }, {
          label: '高二(文科)',
          key: 2
        }, {
          label: '高二(理科)',
          key: 3
        }, {
          label: '高三(文科)',
          key: 4
        }, {
          label: '高三(理科)',
          key: 5
        }
      ], // 初中
      //  --- 新增弹窗 ---
      addVisiable: false,
      addForm: {
        name: '',
        grade: [],
      },
      //  --- 编辑弹窗 ---
      editVisiable: false,
      editForm: {
        name: '',
        grade: [],
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

</style>