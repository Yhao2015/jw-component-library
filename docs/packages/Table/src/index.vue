<template>
    <el-table 
        v-loading="baseConfig.loading" 
        ref="tableRef" 
        v-bind="baseConfig.extra" 
        :data="tableData"
        :height="baseConfig.height" 
        :max-height="baseConfig['max-height']" 
        :stripe="baseConfig.stripe"
        :border="baseConfig.border" 
        :size="baseConfig.size" 
        :show-header="baseConfig['show-header']"
        :highlight-current-row="baseConfig['highlight-current-row']" 
        :row-class-name="tableRowClassName" 
        :row-key="baseConfig['row-key']" 
        :empty-text="baseConfig['empty-text']" 
        :show-summary="baseConfig['show-summary']"
        :sum-text="baseConfig['sum-text']" 
        :summary-method="baseConfig['summary-method']"
        :span-method="baseConfig['span-method']" 
        :table-layout="baseConfig['table-layout']"
        :show-overflow-tooltip="baseConfig['show-overflow-tooltip']" 
        :style="{ width: '100%' }"
        @selection-change="handleSelectionChange" 
        @current-change="handleCurrentChange" 
    >
        <el-table-column type="index" :index="indexMethod" width="50" align="center" v-if="baseConfig.index" />
        <template v-if="type">
            <el-table-column type="selection" width="50" align="center" v-if="type == 'checkBox'"></el-table-column>
            <el-table-column width="50" align="center" v-else>
                <template #header></template>
                <template #default="scope">
                    <el-radio :label="scope.row[baseConfig['row-key'] as string]" v-model="radioValue" class="jw_radio">{{
                        ''
                    }}</el-radio>
                </template>
            </el-table-column>
        </template>

        <ColumnList :columns="columns">
            <template v-for="item in slotList" #[item]="scope">
                <slot :name="item" :data="scope.data"></slot>
            </template>
        </ColumnList>
    </el-table>

    <my-pagination 
        :paginationConfig="paginationConfig" 
        :functions="baseConfig.functions" 
        v-if="baseConfig.pagination" 
        :class="['marginT24', baseConfig.paginationClassName]" 
    />
</template>

<script lang="ts" setup>
import { PropType, ref, reactive, watch } from 'vue'
import { merge } from 'lodash-es'
import { table_column, columnProp } from './definitions'
import { paginationProp } from 'packages/Pagination/src/definitions'
import ColumnList from './column.vue'

const props = defineProps({
    tableConfig: {
        type: Object as PropType<columnProp>,
        default: () => { }
    },
    tableData: {
        type: Array,
        default: () => []
    },
    columns: {
        type: Array as PropType<table_column[]>,
        default: () => []
    }
})

let baseConfig: columnProp = {
    loading: false,
    height: null,
    'max-height': null,
    stripe: true,
    border: false,
    size: 'default',
    'show-header': true,
    'highlight-current-row': false,
    'empty-text': '暂无数据',
    'show-summary': false,
    'sum-text': '总计',
    'table-layout': 'fixed',
    'show-overflow-tooltip': false,
    pagination: false,
    currentPage: 1,
    pageSize: 10,
    total: 0,
    background: true,
    functions: {}
}

let slotList = ref<Array<string>>([])

let indexMethod = (index: number) => {
    let { pageSize, currentPage } = baseConfig
    return (pageSize as number) * ((currentPage as number) - 1) + index + 1
}

let paginationConfig = reactive<paginationProp>({})
let type = ref('')

watch(
    () => [props.tableConfig, props.columns],
    (value) => {
        let [ tableConfig, columns ] = value
        baseConfig = merge(baseConfig, tableConfig)
        type.value = baseConfig.type || ''

        // 单选
        if (type.value == 'radio') {
            baseConfig['highlight-current-row'] = true
        }
        if (baseConfig.pagination) {
            let { currentPage, pageSize, total, background, layout } = baseConfig
            paginationConfig.currentPage = currentPage
            paginationConfig.pageSize = pageSize
            paginationConfig.total = total
            paginationConfig.background = background
            paginationConfig.layout = layout
        }

        slotList.value = (columns as table_column[]).filter(el => el.scopedSlots).map(el => el.scopedSlots) as Array<string>
    },
    {
        immediate: true,
        deep: true
    }
)

const tableRef = ref()

const checkBoxValue = ref<Array<any>>([])
const handleSelectionChange = (val: any) => {
    checkBoxValue.value = val
    if (baseConfig.functions['selectChange']) {
        baseConfig.functions['selectChange'](val)
    }
    // tableRef.value!.toggleRowSelection(baseConfig.tableData[2], true)
}

// 单选
const radioValue = ref<any>('')
const handleCurrentChange = (val: any) => {
    if (type.value == 'radio') {
        radioValue.value = val[baseConfig['row-key'] as string]
        if (baseConfig.functions['selectChange']) {
            baseConfig.functions['selectChange'](val)
        }
    }
    // tableRef.value!.setCurrentRow(row)
}

/* let handleRowClick = (row: any) => {
    console.log('rowClick', row)
    if (baseConfig.functions['rowClick']) {
        baseConfig.functions['rowClick'](row)
    }
} */

let tableRowClassName = (row: any) => {
    if (baseConfig.functions['tableRowClassName']) {
        return baseConfig.functions['tableRowClassName'](row)
    } else {
        return baseConfig['row-class-name']
    }
}
</script>

<style lang="less" scoped>
.jw_radio {
    height: auto;
}

.marginT24 {
    margin-top: 24px;
}
</style>