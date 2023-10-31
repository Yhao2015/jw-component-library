<template>
    <el-form
        @submit.prevent 
        :model="formState" 
        :rules="rulesRef"
        :inline="base.inline" 
        :label-position="base['label-position']" 
        :label-width="base['label-width']" 
        :label-suffix="base['label-suffix']" 
        :hide-required-asterisk="base['hide-required-asterisk']" 
        :require-asterisk-position="base['require-asterisk-position']" 
        :inline-message="base['inline-message']" 
        :status-icon="base['status-icon']" 
        ref="modelRef"
        v-if="isRefresh"
        :style="{ '--itemBottom': base['item-bottom'] }"
    >
        <template v-if="base.inline">
            <el-form-item 
                :class="item.formClassName" 
                v-for="item in configData" 
                :label="item.label" 
                :key="item.code" 
                v-show="!item.type.includes('hidden')" 
                :prop="item.code"
                :label-width="item['label-width']"
            >
                <!-- 插槽 -->
                <slot v-if="item.slot" :name="item.slot" :data="item"></slot>
                <EForm v-else :item="item" :formState="formState" :methods="methods"></EForm>
            </el-form-item>
        </template>
        <template v-else>
            <el-row :align="'middle'" :justify="base.justify" :gutter="((base.gutter) as any)">
                <el-col v-bind="item.grid || base.grid" v-for="item in configData" :key="item.code">
                    <el-form-item 
                        :class="item.formClassName" 
                        :label="item.label" 
                        v-show="!item.type.includes('hidden')" 
                        :prop="item.code"
                        :label-width="item['label-width']"
                    >
                        <!-- 插槽 -->
                        <slot v-if="item.slot" :name="item.slot" :data="item"></slot>
                        <!-- 上传 -->
                        <el-upload 
                            v-else-if="item.type == 'upload'"
                            v-model:file-list="fileList"
                            action="#"
                            :list-type="'picture-card'"
                            :disabled="item.disabled"
                            :accept="item.accept"
                            v-bind="item.extra"
                            :before-upload="(file: any) => methods.beforeUpload(file, item)"
                            :on-preview="methods.handlePictureCardPreview"
                            :class="{ hide: fileList.length >= (item.limit || 3) }"
                        >
                            <el-icon ><Plus /></el-icon> 上传
                        </el-upload>
                        <EForm v-else :item="item" :formState="formState" :methods="methods"></EForm>
                    </el-form-item>
                </el-col>
            </el-row>
        </template>
    </el-form>

    <el-dialog title="" v-model="dialogVisible" class="jw_dialogPreview">
        <img w-full :src="dialogImageUrl" />
    </el-dialog>
</template>

<script setup lang="ts">
import { PropType, ref, reactive, watch } from 'vue'
import EForm from './formItem.vue'
import { cloneDeep, merge } from 'lodash'
import { dataProp, baseProp, formConfigProp } from './definitions'
import type { FormInstance, UploadUserFile, UploadFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
const props = defineProps({
    formConfig: {
        type: Object as PropType<formConfigProp>,
        default: () => { }
    }
})

let base = reactive<baseProp>({
    inline: false,
    'label-position': 'right',
    'label-width': '100px',
    grid: {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 24,
        xl: 24
    },
    justify: 'start',
    'item-bottom': '16px'
})
const modelRef = ref<FormInstance>()
const formState = reactive<any>({})
const rulesRef = reactive<any>({})
let configData = reactive<dataProp[]>([])
let fileList = ref<UploadUserFile[]>([])

const dialogVisible = ref(false)
const dialogImageUrl = ref('')
let isRefresh = ref(true)

watch(
    () => props.formConfig,
    (value: formConfigProp) => {
        let { formConfigData, formConfigBase } = value
        base = merge(base, formConfigBase)
        configData = (cloneDeep(formConfigData) as dataProp[])
        isRefresh.value = false
        setTimeout(() => {
            isRefresh.value = true
        }, 100)

        if(configData ?.length) {
            configData.map((el: dataProp) => {
                if(!el.code) return
                // 赋值
                formState[el.code] = el.defaultValue

                // 必填项
                rulesRef[el.code] = [] as Array<Object>
                if(el.required) {
                    rulesRef[el.code].push({ 
                        required: true,
                        message: el.help || ((el.type == 'input' || el.type == 'number' || el.type == 'password' || el.type == 'textarea' ? '请输入' : '请选择') + el.label),
                        trigger: el.trigger || 'change'
                    })
                }

                // 正则
                if (el.pattern) {
                    rulesRef[el.code].push({
                        // type: 'any',
                        pattern: el.pattern || null,
                        message: el.help || ((el.type == 'input' || el.type == 'number' || el.type == 'password' || el.type == 'textarea' ? '请输入' : '请选择') + el.label)
                    })
                }

                // 自定义校验
                if (el.checkFunName) {
                    rulesRef[el.code].push({
                        // type: 'any',
                        validator: (rule: any, value: any, callback: any) => methods.checkFunction(rule, value, callback, el.checkFunName)
                    })
                }

                // TODO 没有校验的删除
                if (rulesRef[el.code].length == 0) {
                    delete rulesRef[el.code]
                }
            })
        }
    },
    {
        immediate: true,
        deep: true
    }
)

const methods = {
    // 校验
    checkFunction: (rule: any, value: any, callback: any, checkFunName: any) => {
        let functions = props.formConfig.functions
        if(functions ?.[checkFunName]) {
            functions[checkFunName](rule, value, callback)
        }
    },
    // 方法
    formChange(e: any, item: dataProp) {
        let functions = props.formConfig.functions
        if(functions ?.[(item.changeFunName) as any]) {
            functions[(item.changeFunName) as any](e, item)
        }
    },
    formBlur(e: any, item: dataProp) {
        let value = e.target ? e.target.value.trim() : (e as string).trim()
        // 去空判断
        if(item.type == 'input' || item.type == 'textarea') {
            formState[item.code] = value
        }
        let functions = props.formConfig.functions
        if(functions ?.[(item.blurFunName) as any]) {
            functions[(item.blurFunName) as any](value, item)
        }
    },
    formFocus(e: any, item: dataProp) {
        let functions = props.formConfig.functions
        if(functions ?.[(item.focusFunName) as any]) {
            functions[(item.focusFunName) as any](e, item)
        }
    },
    filterNodeMethod: (value: any, data : any) => {
        return data.label.includes(value)
    },
    filterMethod(node: any, keyword: string) {
        return node.label.includes(keyword)
    },
    checkForm() {
        if(!modelRef.value)  return
        return new Promise((resolve) => {
            (modelRef.value as any).validate((valid: any) => {
                resolve(valid ? true : false) 
            })
        })
    },
    resetForm() {
        if (!modelRef.value) return
        modelRef.value.resetFields()
    },
    setFieldsValue(datas: any) {
        for(let key in formState) {
            if(datas.hasOwnProperty(key)) {
                formState[key] = datas[key]
            }
        }
    },
    setFieldValue(key: string, data: any) {
        formState[key] = data[key]
    },
    beforeUpload(file: UploadFile, item: dataProp) {
        let functions = props.formConfig.functions
        if(functions) {
            functions[(item.changeFunName) as any](file, (list: UploadUserFile[]) => {
                fileList.value = [
                    ...fileList.value,
                    ...list
                ]

                isRefresh.value = false
                setTimeout(() => {
                    isRefresh.value = true
                }, 0)
            })
        }
        return false
    },
    handlePictureCardPreview(file: UploadFile) {
        dialogImageUrl.value = file.url!
        dialogVisible.value = true
    }
}


defineExpose({
    fileList,
    formState,
    checkForm: methods.checkForm,
    resetForm: methods.resetForm,
    setFieldsValue: methods.setFieldsValue,
    setFieldValue: methods.setFieldValue
})
</script>

<style lang="less" scoped>
.el-form-item {
    margin-bottom: var(--itemBottom);
}

.el-form--inline .el-form-item {
    margin-right: 8px;
}

:deep(.el-upload--picture-card) {
    display: flex;
    flex-direction: column;
}

// 隐藏上传组件
.hide {
    :deep(.el-upload--picture-card) {
        display: none !important;
    }
}
</style>

<style lang="less">
.jw_dialogPreview {
    .el-dialog__header {
        border-bottom: 0 !important;
        background-color: transparent !important;
    }

    .el-dialog__body {
        display: flex;
        justify-content: center;
    }   
}

.widthP100 {
    width: 100%;
}
</style>