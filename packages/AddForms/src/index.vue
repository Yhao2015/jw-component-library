<template>
    <div class="my-add-forms">
        <div class="my-flex" v-for="item in lists" :key="item.id">
            <div class="my-bordered" :style="{ 'border-color': !borderColor ? 'transparent' : borderColor }">
                <my-form :formConfig="item.formConfig" :ref="(el: any) => setRefMap(el, item)"></my-form>
            </div>

            <el-button :icon="Minus" type="danger" :style="{ 'margin-left': '12px' }" @click="methods.del(item)" />
        </div>

        <slot name="content"></slot>
        <div class="flex-center"><el-button round :icon="Plus" type="primary" :style="{ width: '100%' }" @click="methods.add">新增</el-button></div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Plus, Minus } from '@element-plus/icons-vue'
import { cloneDeep } from 'lodash-es'
import { ElMessage } from 'element-plus'
let getUuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

let refMap = <any>{}, refCode = ref<string>('ref')
let setRefMap = (el: any, item: any) => {
    if (el) {
        refMap[`${refCode.value}_${item.id}`] = el
    }
}

let lists = ref<any>([])
let methods = {
    add: () => {
        let id = getUuid()
        let formConfig = cloneDeep(prop.formConfig)
        formConfig.formConfigData.forEach((el: any) => el.pid = id)

        let ans = {
            formConfig,
            id
        }

        lists.value.push(ans)
    },
    del: (item: any) => {
        if(lists.value.length == 1) {
            ElMessage({
                message: '不能删除最后一条记录！',
                type: 'warning'
            })
            return
        }
        lists.value = lists.value.filter((el: any) => el.id != item.id)
    },
    onSave: () => {
        return new Promise((resolve) => {
            let count = 0, total = lists.value.length
            let ans = <any>[]
            lists.value.map((el: any) => {
                ;(refMap[`ref_${el.id}`] as any).checkForm().then((flag:Boolean) => {
                    if (flag) {
                        count += 1
                        let formState = (refMap[`ref_${el.id}`] as any).formState
                        ans.push(formState)
                        if(total == count) {
                            resolve(ans)
                        }
                    }
                })
            })
        })
    },
    setFieldsValue: (data: any) => {
        if(!data || data.length == 0 || !Array.isArray(data)) {
            return
        }
        data.map(() => methods.add())

        setTimeout(() => {
            lists.value.map((el:any, index: number) => {
                refMap[`${refCode.value}_${el.id}`].setFieldsValue(data[index])
            })
        }, 100)
    },
    getValue: (pid: string) => {
        if(!pid) {
            pid = lists[0].id
        }
        return (refMap[`ref_${pid}`] as any).formState
    },
    getValues() {
        let ans = <any>[]
        lists.value.map((el: any) => {
            let formState = (refMap[`ref_${el.id}`] as any).formState
            ans.push(formState)
        })

        return ans
    },
    setFieldValue({ pid, key, value }: any) {
        if(!pid) {
            pid = lists[0].id
        }
        (refMap[`ref_${pid}`] as any).formState[key] = value
    },
    onReset() {
        lists.value = []
    }
}

let prop = defineProps({
    formConfig: {
        type: Object,
        default: () => []
    },
    borderColor: {
        type: String,
        default: ''
    }
})

defineExpose({
    add: methods.add,
    del: methods.del,
    save: methods.onSave,
    setValues: methods.setFieldsValue,
    getValue: methods.getValue,
    getValues: methods.getValues,
    setValue: methods.setFieldValue,
    onReset: methods.onReset
})
</script>

<style scoped lang="less">
.my-bordered {
    padding: 12px 16px;
    width: calc(100% - 50px);
    border: 1px solid;
}

.my-flex {
    display: flex;
    align-items: center;
}

.my-flex + .my-flex {
    margin-top: 16px;
}

.flex-center {
    width: 100%;
    justify-content: center;
    display: flex;
    margin-top: 16px;
}
</style>
