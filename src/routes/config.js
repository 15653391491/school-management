import {createWebHashHistory} from 'vue-router'

export default {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: 'adminSetting',
            component: () => import('../views/index'),
            children: [
                {
                    path: '/adminSetting',
                    name: '管理员账号管理',
                    component: () => import('../views/schoolManage/adminSetting')
                },
                {
                    path: '/role',
                    name: '角色管理',
                    component: () => import('../views/schoolManage/roleManage')
                },
                {
                    path: '/schoolInfo',
                    name: '学校管理',
                    component: () => import('../views/schoolManage/basicInfo')
                },
                {
                    path: '/subjects',
                    name: '学科学段',
                    component: () => import('../views/subjectsManage/index')
                },
                {
                    path: '/gradeClass',
                    name: '班级管理',
                    component: () => import('../views/gradeClassManage/index')
                },
                {
                    path: '/teacher',
                    name: '教师管理',
                    component: () => import('../views/teacherManage/teacherInfo')
                },
                {
                    path: '/student',
                    name: '学生管理',
                    component: () => import('../views/studentManage/index')
                },
                {
                    path: '/parents',
                    name: '家长管理',
                    component: () => import('../views/parentsManage/index')
                },
                {
                    path: '/storage',
                    name: '入库/出库',
                    component: () => import('../views/storage/index')
                },
                {
                    path: '/machineModel',
                    name: '型号管理',
                    component: () => import('../views/machineModel/index')
                },
                {
                    path: '/bind',
                    name: '绑定关系',
                    component: () => import('../views/bind/index')
                },
                {
                    path: '/returnManage',
                    name: '退换货管理',
                    component: () => import('../views/returnManage/index')
                },
                {
                    path: '/inkStorge',
                    name: '笔芯入库/出库',
                    component: () => import('../views/inkStorge/index')
                },
                {
                    path: '/textbookChapters',
                    name: '教材章节',
                    component: () => import('../views/textbookChapters/index')
                },
                {
                    path: '/itemPool',
                    name: '题库',
                    component: () => import('../views/itemPool/index')
                },
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: () => import('../views/NotFound')
        },
    ]
}
