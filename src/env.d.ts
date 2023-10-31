declare module 'lodash';
// 国际化声明
declare module 'element-plus/dist/locale/*.mjs'

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module '*.md' {
    import { ComponentOptions } from 'vue'
    const Component: ComponentOptions
    export default Component
}
