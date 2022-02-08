<template>
  <div class="minbox row-wrapper" @click="contextMenuData.show=false">
    <div class="menu">
      <div class="col-wrapper menuTitle">
        <div v-show="!isMenuExpand"
             class="col-wrapper">
          <span>建享一板通</span>
          <span style="margin-top: 5px">
            管理平台
          </span>
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
        <el-sub-menu class="subMenu"
                     index="用户管理">
          <template #title>
            <img class="icon"
                 src="../assets/static/home/school.svg"
                 alt=""/>
            <span class="menuItem">
              用户管理
            </span>
          </template>
          <el-menu-item index="/adminSetting">
            管理员账号管理
          </el-menu-item>
          <el-menu-item index="/role">
            角色管理
          </el-menu-item>
          <el-menu-item index="/schoolInfo">
            学校管理
          </el-menu-item>
          <el-menu-item index="/subjects">
            学科学段
          </el-menu-item>
          <el-menu-item index="/gradeClass">
            班级管理
          </el-menu-item>
          <el-menu-item index="/teacher">教师管理</el-menu-item>
          <el-menu-item index="/student">学生管理</el-menu-item>
          <el-menu-item index="/parents">家长管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu class="subMenu" index="手写板管理">
          <template #title>
            <img class="icon" src="../assets/static/home/school.svg" alt=""/>
            <span class="menuItem">
              手写板管理
            </span>
          </template>
          <el-menu-item index="/storage">入库/出库</el-menu-item>
          <el-menu-item index="/machineModel">型号管理</el-menu-item>
          <el-menu-item index="/bind">绑定关系</el-menu-item>
          <el-menu-item index="/returnManage">退换货管理</el-menu-item>
          <el-menu-item index="/inkStorge">笔芯入库/出库</el-menu-item>
        </el-sub-menu>
        <el-sub-menu class="subMenu"
                     index="教材管理">
          <template #title>
            <img class="icon"
                 src="../assets/static/home/school.svg"
                 alt=""/>
            <span class="menuItem">
              教材管理
            </span>
          </template>
          <el-menu-item index="/textbookChapters">
            教材章节
          </el-menu-item>
          <el-menu-item index="/itemPool">
            题库
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="contain col-wrapper">
      <div class="header row-wrapper">
        <!--    左侧图标    -->
        <div class="row-wrapper">
          <div class="iconContent"
               v-show="isMenuExpand"
               @click="expandMenu">
            <Expand class="icon iconHover"/>
          </div>
          <div class="iconContent"
               v-show="!isMenuExpand"
               @click="expandMenu">
            <Fold class="icon iconHover"/>
          </div>
          <div class="iconContent">
            <RefreshLeft class="icon iconHover"/>
          </div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in breadCrumb"
                                :key="item">
              {{ getMenuItemTitle(item) }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!--    右侧图标    -->
        <div class="row-wrapper">
          <!--     打开/关闭全屏     -->
          <div class="iconContent">
            <div @click="fullScreen"
                 class="iconHover"
                 v-show="!isFullScreen">
              <img src="../assets/static/menu/fullScreen.svg"
                   class="icon"
                   alt="全屏"/>
            </div>
            <div @click="fullScreen"
                 class="iconHover"
                 v-show="isFullScreen">
              <img src="../assets/static/menu/cancelFullScreen.svg"
                   class="icon"
                   alt="全屏"/>
            </div>
          </div>
          <!--    退出登录      -->
          <el-popover ref="popover"
                      popper-class="popper"
                      placement="bottom"
                      trigger="hover">
            <template #reference>
              <div @mousemove="isTop=true"
                   @mouseout="isTop=false"
                   class="iconContent row-wrapper">
                <span>管理员</span>
                <CaretTop v-show="isTop"
                          class="icon"/>
                <CaretBottom v-show="!isTop"
                             class="icon"/>
              </div>
            </template>
            <template #default>
              <div style="width:100%"
                   class="col-wrapper">
                <el-button>
                  退出
                </el-button>
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
            <template #label>
              <span @contextmenu="e=>{onContextMenu(e,item)}">{{ item.title }}</span>
            </template>
          </el-tab-pane>
        </el-tabs>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <div :style="{left:contextMenuData.x+'px',top:contextMenuData.y+'px'}"
         v-show="contextMenuData.show"
         class="contextMenu col-wrapper">
      <div class="row-wrapper context-item" @click="closeOther">关闭其他</div>
      <div class="row-wrapper context-item" @click="closeRight">关闭右侧</div>
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
      editableTabs: [],
      tabNames: [],
      breadCrumb: [],
      defaultTab: '/baskInfo',
      //  --- 右键菜单 ---
      contextMenuData: {
        x: 0,
        y: 0,
        show: false
      },
      tabInfo: {}
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
        case '/adminSetting':
          return '管理员设置'
        case '/role':
          return '角色管理'
        case '/schoolInfo':
          return '学校管理'
        case '/subjects':
          return '学科学段'
        case '/gradeClass':
          return '班级管理'
        case '/teacher':
          return '教师管理'
        case '/student':
          return '学生管理'
        case '/parents':
          return '家长管理'
        case '/storage':
          return '入库/出库'
        case '/machineModel':
          return '型号管理'
        case '/bind':
          return '绑定关系'
        case '/returnManage':
          return '退换货管理'
        case '/inkStorge':
          return '笔芯入库/出库'
        case '/textbookChapters':
          return '教材章节'
        case '/itemPool':
          return '题库'
        default:
          return index
      }
    },
    // --- 事件 ---
    closeRight() {
      console.log(this.editableTabs.indexOf(this.tabInfo))
      this.editableTabs = this.editableTabs.slice(0, this.editableTabs.indexOf(this.tabInfo)+1)
      this.tabNames = this.tabInfo.name
      this.defaultTab = this.tabInfo.name
    },
    /**
     * 关闭其他
     */
    closeOther() {
      this.editableTabs = [this.tabInfo]
      this.tabNames = this.tabInfo.name
      this.defaultTab = this.tabInfo.name
    },
    /**
     * 打开右键菜单
     * @param e
     * @param info
     */
    onContextMenu(e, info) {
      e.preventDefault()
      this.contextMenuData.show = true
      this.contextMenuData.x = e.clientX
      this.contextMenuData.y = e.clientY
      this.tabInfo = info
    },
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
     * @param indexPath
     */
    selectMenu(index, indexPath) {
      this.defaultTab = index
      if (this.tabNames.indexOf(index) === -1) {
        this.editableTabs.push({
          name: index,
          title: this.getMenuItemTitle(index)
        })
        this.tabNames.push(index)
        this.breadCrumb = indexPath
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
  },
  created() {
    this.defaultTab = this.$route.path
    this.editableTabs.push({
      title: this.getMenuItemTitle(this.defaultTab),
      name: this.defaultTab,
    })
    this.tabNames.push(this.defaultTab)
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

.contextMenu {
  background-color: #FFFFFF;
  border-radius: 4px;
  position: absolute;
  z-index: 100;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
}

.context-item {
  font-size: 12px;
  font-weight: 400;
  padding: 5px 15px;
  transition: all .5s;
}

.context-item:hover {
  cursor: pointer;
  background-color: #eee;
}
</style>