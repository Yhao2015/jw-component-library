<template>
	<el-pagination 
		v-model:current-page="baseConfig.currentPage" 
		v-model:page-size="baseConfig.pageSize"
		:background="baseConfig.background" 
		:layout="baseConfig.layout" 
		:total="baseConfig.total"
		@current-change="handleCurrentChange" 
		@size-change="handleSizeChange" 
	/>
</template>

<script lang="ts" setup>
import { PropType, reactive, watch } from 'vue'
import { paginationProp } from "./definitions";

const props = defineProps({
	paginationConfig: {
		type: Object as PropType<paginationProp>,
		default: () => { }
	},
	functions: {
		type: Object,
		default: () => { }
	}
})

let baseConfig: paginationProp = reactive({
	currentPage: 1,
	pageSize: 10,
	total: 0,
	background: true,
	layout: 'total, sizes, prev, pager, next, jumper'
})

watch(
	props.paginationConfig,
	(value) => {
		let { currentPage, pageSize, total, background, layout } = value
		baseConfig.currentPage = currentPage || 1
		baseConfig.pageSize = pageSize || 10
		baseConfig.total = total || 0
		baseConfig.background = background || true
		baseConfig.layout = layout || baseConfig.layout
	},
	{
		immediate: true,
		deep: true
	}
)

const handleCurrentChange = (val: number) => {
	if (props.functions && props.functions.handleCurrentChange) {
		props.functions.handleCurrentChange(val)
	}
}

const handleSizeChange = (val: number) => {
	if (props.functions && props.functions.handleCurrentChange) {
		props.functions.handleSizeChange(val)
	}
}
</script>

<style scoped>
.my-pagination {}
</style>