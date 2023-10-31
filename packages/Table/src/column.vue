<template>
    <el-table-column 
        v-for="column in columns" 
        :key="column.dataIndex" 
        :prop="column.dataIndex" 
        :label="column.title"
        :width="column.width" 
        :fixed="column.fixed" 
        :sortable="column.sortable" 
        :resizable="column.resizable"
        :align="column.align" 
        :class-name="column['class-name']"
    >
        <template #default="scope" v-if="column.scopedSlots">
            <slot :name="column.scopedSlots" :data="scope"></slot>
        </template>
        <template v-if="column.children && column.children.length">
            <column-list v-if="column.children" :columns="column.children"></column-list>
        </template>
    </el-table-column>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { table_column } from './definitions'
export default defineComponent({
    name: 'column-list',
    props: {
        columns: {
            type: Array as PropType<table_column[]>,
            default: () => []
        }
    },
    setup(props) {
        let { columns } = props

        return {
            columns
        }
    }
})

</script>