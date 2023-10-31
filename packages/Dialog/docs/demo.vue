<template>
    <div>
        <el-button type="primary" @click="onShow">弹框</el-button>

        <my-dialog :dialogConfig="dialogConfig"> 
            <template #content>
                这是内容slot
            </template>
        </my-dialog>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
let dialogConfig = reactive({
    type: '',
    visible: false,
    title: '',
    width: 480,
    functions: {
        handleClose: () => {
            dialogConfig.visible = false
            console.log('handleClose')
        },
        handleSave: () => {
            dialogConfig.visible = false
            console.log('handleSave')
        }
    }
})

let onShow = () => {
    dialogConfig.type = 'add'
    dialogConfig.visible = true
    dialogConfig.title = '新增'
}
</script>