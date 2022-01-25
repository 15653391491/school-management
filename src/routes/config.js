import {createWebHashHistory} from 'vue-router'

export default {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: 'baskInfo',
            component: () => import('../views/index'),
            children: [
                {
                    path: '/dept',
                    name: 'dept',
                    component: () => import('../views/deptManage/index')
                },
                {
                    path: '/experts',
                    name: 'experts',
                    component: () => import('../views/expertsManage/index')
                },
                {
                    path: '/gradeClass',
                    name: 'gradeClass',
                    component: () => import('../views/gradeClassManage/index')
                },
                {
                    path: '/parents',
                    name: 'parents',
                    component: () => import('../views/parentsManage/index')
                },
                {
                    path: '/adminSetting',
                    name: 'adminSetting',
                    component: () => import('../views/schoolManage/adminSetting')
                },
                {
                    path: '/baskInfo',
                    name: 'baskInfo',
                    component: () => import('../views/schoolManage/basicInfo')
                },
                {
                    path: '/role',
                    name: 'role',
                    component: () => import('../views/schoolManage/roleManage')
                },
                {
                    path: '/student',
                    name: 'student',
                    component: () => import('../views/studentManage/index')
                },
                {
                    path: '/subjects',
                    name: 'subjects',
                    component: () => import('../views/subjectsManage/index')
                },
                {
                    path: '/teacher',
                    name: 'teacher',
                    component: () => import('../views/teacherManage/teacherInfo')
                },
                {
                    path: '/team',
                    name: 'team',
                    component: () => import('../views/teacherManage/teamManage')
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
