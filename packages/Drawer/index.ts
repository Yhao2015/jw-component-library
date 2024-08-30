import { App, Plugin } from 'vue'
import Drawer from './src/index.vue'

export const DrawerPlugin: Plugin = {
    install(app: App) {
        app.component('my-drawer', Drawer)
    }
}

export { Drawer }
