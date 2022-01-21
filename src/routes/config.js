import {createWebHashHistory} from 'vue-router'

export default {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: 'home',
            component: () => import('../views/index'),
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: () => import('../views/home/home')
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
