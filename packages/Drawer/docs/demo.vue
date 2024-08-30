<template>
    <el-button type="primary" @click="onShow">弹框</el-button>

    <my-drawer :config="config" :functions="functions" direction="rtl">
        这是内容
    </my-drawer>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Config } from '../src/definitions'

let config = reactive<Config>({
    visible: false,
    width: '30%',
    title: '抽屉组件'
})

let functions = {
    handleCancel: () => {
        config.visible = false
        console.log('关闭')
    }
}

let onShow = () => {
    config.visible = true
}
</script>