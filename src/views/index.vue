<template>
  <div class="box row-wrapper">
    <div class="menu">
      <div class="col-wrapper menuTitle">
        <span>学校管理后台</span>
      </div>
      <el-menu active-text-color="#ffffff" class="menuContain" text-color="#ffffff" background-color="#20222A">
        <el-sub-menu class="subMenu" index="1">
          <template #title>
            <img class="icon" src="../assets/static/home/school.svg" alt=""/>
            <span>学校管理</span>
          </template>
          <el-menu-item index="1-1">基础信息</el-menu-item>
          <el-menu-item index="1-2">角色管理</el-menu-item>
          <el-menu-item index="1-3">管理员设置</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2">
          <img src="../assets/static/menu/class.svg" class="icon" alt=""/>
          <span>年级/班级管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <img src="../assets/static/menu/warning.svg" class="icon" alt=""/>
          <span>教务处管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <img src="../assets/static/menu/manageMent.svg" class="icon" alt=""/>
          <span>科目管理</span>
        </el-menu-item>
        <el-sub-menu class="subMenu" index="6">
          <template #title>
            <img class="icon" src="../assets/static/menu/book.svg" alt=""/>
            <span>教师管理</span>
          </template>
          <el-menu-item index="6-1">教师信息</el-menu-item>
          <el-menu-item index="6-2">小组管理</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="6">
          <img src="../assets/static/menu/student.svg" class="icon" alt=""/>
          <span>学生管理</span>
        </el-menu-item>
        <el-menu-item index="7">
          <img src="../assets/static/menu/person.svg" class="icon" alt=""/>
          <span>家长管理</span>
        </el-menu-item>
        <el-menu-item index="7">
          <img src="../assets/static/menu/document.svg" class="icon" alt=""/>
          <span>专家管理</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="contain">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import '../styles/flax.css'

export default {
  name: "home"
}
</script>

<style>
.el-sub-menu:hover {
  background-color: #009688;
}

.el-menu-item:hover {
  background-color: #009688;
}

.el-menu-item.is-active {
  background-color: #009688;
}
</style>
<style lang="less" scoped>
.box {
  height: 100vh;

  .menu {
    height: 100%;
    width: 15%;
    background-color: #20222A;
  }

  .menuContain {
    border: 1px solid #20222A;
  }

  .contain {
  }
}

.menuTitle {
  color: #ffffff;
  padding: 15px;
}

.icon {
  width: 20px;
  height: 20px;
  margin: 5px;
  margin-right: 10px;
}
</style>