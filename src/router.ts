/* eslint-disable prettier/prettier */

/**
 * !--------- FBI WARNING ----------!
 *
 * 根据 /packages 目录下的组件所生成的组件类侧边导航栏配置，请勿手动修改
 */

import { createRouter, createWebHistory, RouterOptions } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: {
            name: 'Table'
        }
    },
    {
        title: '表格',
        name: 'Table',
        path: '/Table',
        component: () => import('packages/Table/docs/README.md')
    },
    {
        title: '弹框',
        name: 'Dialog',
        path: '/Dialog',
        component: () => import('packages/Dialog/docs/README.md')
    },
    {
        title: '弹框',
        name: 'Drawer',
        path: '/Drawer',
        component: () => import('packages/Drawer/docs/README.md')
    },
    {
        title: '分页',
        name: 'Pagination',
        path: '/Pagination',
        component: () => import('packages/Pagination/docs/README.md')
    },
    {
        title: '表单',
        name: 'Form',
        path: '/Form',
        component: () => import('packages/Form/docs/README.md')
    },
    {
        title: '新增表单组',
        name: 'AddForms',
        path: '/AddForms',
        component: () => import('packages/AddForms/docs/README.md')
    }
]

const routerConfig = {
    history: createWebHistory(),
    routes,
    scrollBehavior(to: any, from: any) {
        if (to.path !== from.path) {
            return { top: 0 }
        }
    }
}

const router = createRouter(routerConfig as RouterOptions)

export default router
