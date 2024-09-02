<template>
    <div>
        <my-pagination :paginationConfig="paginationConfig" :functions="functions" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { paginationProp } from '../src/definitions'
let paginationConfig = ref<paginationProp>({
    currentPage: 1,
    pageSize: 10,
    total: 100,
    background: true,
    layout: 'total, sizes, prev, pager, next, jumper'
})

let functions = ref({
    handleCurrentChange: (val: number) => { console.log('currentPage', val ) },
    handleSizeChange: (val: number) => { console.log('pageSize', val )}
})
</script>