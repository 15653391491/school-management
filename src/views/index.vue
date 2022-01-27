<template>
  <div class="minbox row-wrapper">
    <div class="menu">
      <div class="col-wrapper menuTitle">
        <div v-show="!isMenuExpand" class="col-wrapper">
          <span>学校管理后台</span>
        </div>
        <Menu v-show="isMenuExpand"/>
      </div>
      <el-menu active-text-color="#ffffff"
               class="menuContain"
               text-color="#ffffff"
               :default-active="defaultTab"
               :collapse="isMenuExpand"
               :collapse-transition="true"
               @select="selectMenu"
               background-color="#20222A">
        <el-sub-menu class="subMenu" index="1">
          <template #title>
            <img class="icon" src="../assets/static/home/school.svg" alt=""/>
            <span class="menuItem">学校管理</span>
          </template>
          <el-menu-item index="/baskInfo">基础信息</el-menu-item>
          <el-menu-item index="/role">角色管理</el-menu-item>
          <el-menu-item index="/adminSetting">管理员设置</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/gradeClass">
          <img src="../assets/static/menu/class.svg" class="icon" alt=""/>
          <span class="menuItem">年级/班级管理</span>
        </el-menu-item>
        <el-menu-item index="/dept">
          <img src="../assets/static/menu/warning.svg" class="icon" alt=""/>
          <span class="menuItem">教务处管理</span>
        </el-menu-item>
        <el-menu-item index="/subjects">
          <img src="../assets/static/menu/manageMent.svg" class="icon" alt=""/>
          <span class="menuItem">科目管理</span>
        </el-menu-item>
        <el-sub-menu class="subMenu" index="6">
          <template #title>
            <img class="icon" src="../assets/static/menu/book.svg" alt=""/>
            <span class="menuItem">教师管理</span>
          </template>
          <el-menu-item index="/teacher">教师信息</el-menu-item>
          <el-menu-item index="/team">小组管理</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/student">
          <img src="../assets/static/menu/student.svg" class="icon" alt=""/>
          <span class="menuItem">学生管理</span>
        </el-menu-item>
        <el-menu-item index="/parents">
          <img src="../assets/static/menu/person.svg" class="icon" alt=""/>
          <span class="menuItem">家长管理</span>
        </el-menu-item>
        <el-menu-item index="/experts">
          <img src="../assets/static/menu/document.svg" class="icon" alt=""/>
          <span class="menuItem">专家管理</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="contain col-wrapper">
      <div class="header row-wrapper">
        <!--    左侧图标    -->
        <div class="row-wrapper">
          <div class="iconContent" v-show="isMenuExpand" @click="expandMenu">
            <Expand class="icon iconHover"/>
          </div>
          <div class="iconContent" v-show="!isMenuExpand" @click="expandMenu">
            <Fold class="icon iconHover"/>
          </div>
          <div class="iconContent">
            <RefreshLeft class="icon iconHover"/>
          </div>
        </div>
        <!--    右侧图标    -->
        <div class="row-wrapper">
          <!--     打开/关闭全屏     -->
          <div class="iconContent">
            <div @click="fullScreen" class="iconHover" v-show="!isFullScreen">
              <img src="../assets/static/menu/fullScreen.svg" class="icon" alt="全屏"/>
            </div>
            <div @click="fullScreen" class="iconHover" v-show="isFullScreen">
              <img src="../assets/static/menu/cancelFullScreen.svg" class="icon" alt="全屏"/>
            </div>
          </div>
          <!--    退出登录      -->
          <el-popover ref="popover"
                      popper-class="popper"
                      placement="bottom"
                      trigger="hover">
            <template #reference>
              <div @mousemove="isTop=true" @mouseout="isTop=false" class="iconContent row-wrapper">
                <span>管理员</span>
                <CaretTop v-show="isTop" class="icon"/>
                <CaretBottom v-show="!isTop" class="icon"/>
              </div>
            </template>
            <template #default>
              <div style="width:100%" class="col-wrapper">
                <el-button>退出</el-button>
              </div>
            </template>
          </el-popover>
        </div>
      </div>
      <div class="view">
        <el-tabs v-model="defaultTab"
                 @tab-remove="removeTab"
                 closable
                 type="card">
          <el-tab-pane v-for="item in editableTabs"
                       :label="item.title"
                       :key="item.name"
                       :name="item.name">
          </el-tab-pane>
        </el-tabs>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import '../styles/flax.css'

export default {
  name: "home",
  data() {
    return {
      isFullScreen: false,
      isTop: false, // 退出登录图标
      // --- menu ---
      isMenuExpand: false,
      // --- tabs ---
      editableTabs: [{
        title: '基础信息',
        name: '/baskInfo',
      }],
      tabNames: ['/baskInfo'],
      defaultTab: '/baskInfo'
    }
  },
  methods: {
    /**
     * 获取tab的title
     * @param index
     * @returns {string}
     */
    getMenuItemTitle(index) {
      switch (index) {
        case '/baskInfo':
          return '基础信息'
        case '/role':
          return '角色管理'
        case '/adminSetting':
          return '管理员设置'
        case '/gradeClass':
          return '年级/班级管理'
        case '/dept':
          return '教务处管理'
        case '/subjects':
          return '科目管理'
        case '/teacher':
          return '教师信息'
        case '/team':
          return '小组管理'
        case '/student':
          return '学生管理'
        case '/parents':
          return '家长管理'
        case '/experts':
          return '专家管理'
        default:
          break
      }
    },
    // --- 事件 ---
    /**
     * 展开/收起菜单
     */
    expandMenu() {
      this.isMenuExpand = !this.isMenuExpand
    },
    /**
     * 打开/关闭全屏
     */
    fullScreen() {
      this.isFullScreen = !this.isFullScreen
    },
    /**
     * 菜单激活
     * @param index
     */
    selectMenu(index) {
      this.defaultTab = index
      if (this.tabNames.indexOf(index) === -1) {
        this.editableTabs.push({
          name: index,
          title: this.getMenuItemTitle(index)
        })
        this.tabNames.push(index)
      }
    },
    /**
     * 关闭标签页
     * @param index
     */
    removeTab(index) {
      if (this.tabNames.length === 1) {
        return 1
      }
      let i = this.tabNames.indexOf(index)
      this.editableTabs.splice(i, 1)
      this.tabNames.splice(i, 1)
      if (this.defaultTab === index) {
        if (i === 0) {
          this.defaultTab = this.tabNames[0]
          return 1
        }
        this.defaultTab = this.tabNames[i - 1]
      }
    }
  },
  watch: {
    /**
     * 打开/关闭全屏
     * @param val
     */
    isFullScreen(val) {
      if (val) {
        document.documentElement.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    },
    /**
     * 路由跳转
     * @param val
     */
    defaultTab(val) {
      this.$router.push({path: val})
    }
  }
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
  background-color: #017267;
}

.el-sub-menu__title:hover {
  background-color: #009688 !important;
}
</style>
<style lang="less" scoped>
.minbox {
  height: 100vh;

  .menu {
    height: 100%;
    background-color: #20222A;
  }

  .menuContain {
    border: 1px solid #20222A;
  }

  .contain {
    justify-content: flex-start;
    height: 100%;
    width: 100%;

    .header {
      width: 100%;
      height: 50px;
      justify-content: space-between;
    }
  }
}

.menuTitle {
  color: #ffffff;
  padding: 15px;

  div {
    width: 180px;
  }
}

.menuItem {
  margin-left: 15px;
}

.icon {
  width: 20px;
  height: 20px;
}

.iconHover:hover {
  cursor: pointer;
}

.iconContent {
  padding: 10px 15px;
  transition: all .5s;

  span {
    line-height: 24px;
  }

  .icon {
    margin-left: 5px;
  }
}

.iconContent:hover {
  border-bottom: 2px solid;
}

.popper {
  width: 80px;
}

.view {
  align-self: stretch;
  padding: 0 15px;
}
</style>