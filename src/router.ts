/* eslint-disable prettier/prettier */

/** 
 * !--------- FBI WARNING ----------!
 * 
 * 根据 /packages 目录下的组件所生成的组件类侧边导航栏配置，请勿手动修改
 */

import { createRouter, createWebHistory, RouterOptions } from 'vue-router'

const routes = [{
        path: '/',
        redirect: {
            name: 'Table'
        }
    },{
                title: '表格',
                name: 'Table',
                path: '/components/Table',
                component: () => import('packages/Table/docs/README.md'),
            },{
                title: '弹框',
                name: 'Dialog',
                path: '/components/Dialog',
                component: () => import('packages/Dialog/docs/README.md'),
            },{
                title: '分页',
                name: 'Pagination',
                path: '/components/Pagination',
                component: () => import('packages/Pagination/docs/README.md'),
            },{
                title: '表单',
                name: 'Form',
                path: '/components/Form',
                component: () => import('packages/Form/docs/README.md'),
            },{
                title: '图表',
                name: 'Chart',
                path: '/components/Chart',
                component: () => import('packages/Chart/docs/README.md'),
            },{
                title: '函数集合',
                name: 'Funs',
                path: '/components/Funs',
                component: () => import('packages/Funs/docs/README.md'),
            }];

const routerConfig = {
    history: createWebHistory(),
        routes,
        scrollBehavior(to: any, from: any) {
            if (to.path !== from.path) {
            return { top: 0 };
        }
    },
};

const router = createRouter(routerConfig as RouterOptions);

export default router;
