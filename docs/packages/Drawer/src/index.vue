<template>
    <el-drawer
        v-model="visible"
        :title="baseConfig.title"
        :class="baseConfig.customClass"
        :size="baseConfig.width"
        :before-close="onCancel"
        v-bind="$attrs"
    >
        <slot></slot>
        <template #footer>
            <slot name="footer"></slot>
        </template>
    </el-drawer>
</template>

<script lang="ts" setup>
import { ref, defineProps, watch } from 'vue'
import { Config } from './definitions'
import { merge } from 'lodash-es'

let props = defineProps<{
    config: Config,
    functions: {
        handleCancel: () => void
    }
}>()

let baseConfig = ref<Config>({
    visible: false,
    title: '',
    customClass: '',
    width: '30%'
})

let visible = ref<boolean>(false)

watch(
    () => props.config,
    (value) => {
        baseConfig.value = merge(baseConfig.value, value)
        // 赋值
        visible.value = baseConfig.value.visible as boolean
    },
    {
        immediate: true,
        deep: true
    }
)

let onCancel = () => {
    if(props.functions ?.handleCancel) {
        props.functions.handleCancel()
    }
}
</script>

<style scoped lang="scss"></style>