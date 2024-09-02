/* eslint-disable */

/**
 * !--------- FBI WARNING ----------!
 *
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import { App, Plugin } from 'vue'

import { TablePlugin } from './Table'
import { DialogPlugin } from './Dialog'
import { DrawerPlugin } from './Drawer'
import { PaginationPlugin } from './Pagination'
import { FormPlugin } from './Form'
import { AddFormsPlugin } from './AddForms'

const MYUiPlugin: Plugin = {
    install(app: App) {
        TablePlugin.install?.(app)
        DialogPlugin.install?.(app)
        DrawerPlugin.install?.(app)
        PaginationPlugin.install?.(app)
        FormPlugin.install?.(app)
        AddFormsPlugin.install?.(app)
    }
}

export default MYUiPlugin

export * from './Table'
export * from './Dialog'
export * from './Drawer'
export * from './Pagination'
export * from './Form'
export * from './AddForms'
