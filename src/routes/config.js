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
                    path: '/baskInfo',
                    name: 'baskInfo',
                    component: () => import('../views/schoolManage/basicInfo')
                },
            ]
        },
        {
            path: '/test',
            name: 'test',
            component: () => import('../views/Test')
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: () => import('../views/NotFound')
        },
    ]
}
