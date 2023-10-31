<template>
    <el-dialog
        ref="dialogRef"
        v-model="visible" 
        v-bind="baseDialog.extra"
        :title="baseDialog.title"
        :width="baseDialog.width"
        :fullscreen="baseDialog.fullscreen" 
        :modal="baseDialog.modal" 
        :modal-class="baseDialog['modal-class']" 
        :draggable="baseDialog.draggable" 
        :align-center="baseDialog['align-center']" 
        :destroy-on-close="baseDialog['destroy-on-close']" 
        :z-index="baseDialog['z-index']"
        :custom-class="baseDialog['custom-class']"
        class="jw_dialog" 
        :append-to-body="false"
        :before-close="handleClose"
    >
        <slot name="content"></slot>
        <template #footer v-if="baseDialog.footer">
            <span class="dialog-footer">
                <el-button @click="handleClose"> 取消 </el-button>
                <el-button v-if="baseDialog.type == 'del'" type="danger" @click="handleSave"> 删除 </el-button>
                <el-button v-else type="primary" @click="handleSave"> 确定 </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { PropType, ref, watch } from 'vue'
import { merge } from 'lodash'
import { dialogProp } from './definitions'

const props = defineProps({
    dialogConfig: {
        type: Object as PropType<dialogProp>,
        default: () => {}
    }
})

let baseDialog: dialogProp = {
    visible: false,
    title: '',
    modal: true,
    'show-close': true,
    'align-center': true,
    'z-index': 2001,
    'destroy-on-close': true,
    type: '',
    footer: true
}

const visible = ref(false)
const dialogRef = ref()

watch(
    props.dialogConfig,
    (value) => {
        baseDialog = merge(baseDialog, value)
        visible.value = baseDialog.visible
    }
)

const handleClose = () => {
    if(baseDialog.functions && baseDialog.functions.handleClose) {
        baseDialog.functions.handleClose()
    }
}

const handleSave = () => {
    if(baseDialog.functions && baseDialog.functions.handleSave) {
        baseDialog.functions.handleSave()
    }
}
</script>

<style scoped lang="less">
.jw_dialog {
    background: #232E3A;

    .el-dialog__header {
        border-bottom: 1px solid rgba(120, 201, 255, 0.2);
        margin-right: 0px;
        padding: 16px;
        background-color: rgba(153, 153, 153, 0.1);
        border-radius: 4px 4px 0px 0px;
    }
}
</style>