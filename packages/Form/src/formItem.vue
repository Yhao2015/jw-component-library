<template>
    <!-- 文本输入 -->
    <el-input
        class="widthP100" 
        v-if="item.type == 'input' || item.type == 'hidden'" 
        v-model="formState[item.code]"
        :placeholder="item.placeholder || '请输入'"
        :clearable="item.clearable" 
        :disabled="item.disabled"
        v-bind="item.extra"
        @change="(value: string | number) => methods.formChange(value, item)"
        @input="(value: string | number) => methods.formChange(value, item)"
        @blur="(event: FocusEvent) => methods.formBlur(event, item)"
        @focus="(event: FocusEvent) => methods.formFocus(event, item)"
    >
        <template #prefix v-if="item.extra && item.extra.prefix">{{ item.extra.prefix }}</template>
        <template #suffix v-if="item.extra && item.extra.suffix">{{ item.extra.suffix }}</template>
    </el-input>

    <el-input-number
        class="widthP100"  
        v-else-if="item.type == 'number' || item.type == 'numberhidden'"
        v-model="formState[item.code]"
        :placeholder="item.placeholder || '请输入'"
        :disabled="item.disabled"
        v-bind="item.extra"
        @change="(value: number | undefined) => methods.formChange(value, item)"
        @blur="(event: FocusEvent) => methods.formBlur(event, item)"
        @focus="(event: FocusEvent) => methods.formFocus(event, item)"
    />

    <el-input
        class="widthP100"  
        v-else-if="item.type == 'textarea'"
        v-model="formState[item.code]" 
        type="textarea"
        :placeholder="item.placeholder || '请输入'"
        :disabled="item.disabled"
        v-bind="item.extra"
        @change="(value: string | number) => methods.formChange(value, item)"
        @input="(value: string | number) => methods.formChange(value, item)"
        @blur="(event: FocusEvent) => methods.formBlur(event, item)"
        @focus="(event: FocusEvent) => methods.formFocus(event, item)"
    />

    <el-input
        class="widthP100"
        v-else-if="item.type == 'password'"
        v-model="formState[item.code]" 
        type="password"
        :placeholder="item.placeholder || '请输入'"
        :disabled="item.disabled"
        :clearable="item.clearable" 
        v-bind="item.extra"
        @change="(value: string | number) => methods.formChange(value, item)"
        @input="(value: string | number) => methods.formChange(value, item)"
        @blur="(event: FocusEvent) => methods.formBlur(event, item)"
        @focus="(event: FocusEvent) => methods.formFocus(event, item)"
    />

    <!-- 选择类 -->
    <el-radio-group 
        v-else-if="item.type == 'radio'" 
        v-model="formState[item.code]"
        :disabled="item.disabled"
        v-bind="item.extra"
        @change="(value: string | number | boolean) => methods.formChange(value, item)"
    >
        <el-radio 
            v-for="dataFormat in item.dataFormat" 
            :disabled="dataFormat.disabled" 
            :label="dataFormat[item.fieldName ? (item.fieldName.value || 'value') : 'value']"
        >
            {{ dataFormat[item.fieldName ? (item.fieldName.label || 'label') : 'label'] }}
        </el-radio>
    </el-radio-group>

    <el-checkbox-group 
        v-else-if="item.type == 'checkbox'" 
        v-model="formState[item.code]"
        :disabled="item.disabled"
        v-bind="item.extra"
        @change="(value: /* string[] | number[] | */ any[]) => methods.formChange(value, item)"
    >
        <el-checkbox 
            v-for="dataFormat in item.dataFormat"
            :disabled="dataFormat.disabled" 
            :label="dataFormat[item.fieldName ? (item.fieldName.value || 'value') : 'value']"
        >
            {{ dataFormat[item.fieldName ? (item.fieldName.label || 'label') : 'label'] }}
        </el-checkbox>
    </el-checkbox-group>

    <el-select
        class="widthP100"
        v-else-if="item.type == 'select'"  
        v-model="formState[item.code]"
        :multiple="item.multiple"
        collapse-tags
        collapse-tags-tooltip
        :placeholder="item.placeholder || '请选择'"
        :disabled="item.disabled"
        :clearable="item.clearable" 
        v-bind="item.extra"
        @change="(val: any) => methods.formChange(val, item)" 
    >
        <el-option
            v-for="dataFormat in item.dataFormat"
            :key="dataFormat[item.fieldName ? (item.fieldName.value || 'value') : 'value']"
            :label="dataFormat[item.fieldName ? (item.fieldName.label || 'label') : 'label']"
            :value="dataFormat[item.fieldName ? (item.fieldName.value || 'value') : 'value']"
            :disabled="dataFormat.disabled"
        />
    </el-select>

    <el-tree-select
        class="widthP100"
        v-else-if="item.type == 'treeSelect'"
        v-model="formState[item.code]"
        :multiple="item.multiple"
        :show-checkbox="item['show-checkbox']"
        :data="item.dataFormat"
        :render-after-expand="false"
        :check-strictly="true"
        :check-on-click-node="item['show-checkbox']"
        filterable
        :filter-node-method="methods.filterNodeMethod"
        v-bind="item.extra"
    />

    <el-cascader
        class="widthP100" 
        v-else-if="item.type == 'cascader'"
        v-model="formState[item.code]"
        :options="item.dataFormat"
        :props="{ multiple: item.multiple }"
        :placeholder="item.placeholder || '请选择'"
        :disabled="item.disabled"
        :clearable="item.clearable" 
        filterable
        :filter-method="methods.filterMethod"
        v-bind="item.extra"
        @change="(val: any) => methods.formChange(val, item)" 
    />

    <el-switch 
        v-else-if="item.type == 'switch'" 
        v-model="formState[item.code]" 
        v-bind="item.extra"
        @change="(val: any) => methods.formChange(val, item)" 
    />

    <!-- 时间 -->
    <el-date-picker
        class="widthP100I"
        v-else-if="item.type == 'datetime' || item.type == 'date' || item.type == 'week' || item.type == 'month' || item.type == 'year' || item.type == 'dates'"
        v-model="formState[item.code]"
        :type="item.type"
        :placeholder="item.placeholder || '请选择'"
        :disabled="item.disabled"
        :clearable="item.clearable" 
        @change="(val: any) => methods.formChange(val, item)" 
        @blur="(event: FocusEvent) => methods.formBlur(event, item)"
        @focus="(event: FocusEvent) => methods.formFocus(event, item)"
    />

    <el-date-picker
        class="widthP100I"
        v-else-if="item.type == 'daterange' || item.type == 'monthrange' || item.type == 'datetimerange'"
        v-model="formState[item.code]"
        :type="item.type"
        :range-separator="item.extra && item.extra['range-separator'] || '至'"
        :start-placeholder="item.extra && item.extra['start-placeholder'] || '开始时间'"
        :end-placeholder="item.extra && item.extra['end-placeholder'] || '结束时间'"
        :placeholder="item.placeholder || '请选择'"
        :disabled="item.disabled"
        :clearable="item.clearable"
        @change="(val: any) => methods.formChange(val, item)" 
        @blur="(event: FocusEvent) => methods.formBlur(event, item)"
        @focus="(event: FocusEvent) => methods.formFocus(event, item)"
    />

    <el-time-picker
        class="widthP100I"
        v-else-if="item.type == 'time'"
        v-model="formState[item.code]"
        :placeholder="item.placeholder || '请选择'"
        :disabled="item.disabled"
        :clearable="item.clearable" 
        @change="(val: any) => methods.formChange(val, item)"
    />

    <el-time-picker
        class="widthP100I"
        v-else-if="item.type == 'timeRange'"
        v-model="formState[item.code]"
        is-range
        :range-separator="item.extra && item.extra['range-separator'] || '至'"
        :start-placeholder="item.extra && item.extra['start-placeholder'] || '开始时间'"
        :end-placeholder="item.extra && item.extra['end-placeholder'] || '结束时间'"
        :placeholder="item.placeholder || '请选择'"
        :disabled="item.disabled"
        :clearable="item.clearable" 
        @change="(val: any) => methods.formChange(val, item)"
    />

    <el-time-select
        class="widthP100I"
        v-else-if="item.type == 'timeSelect'"
        v-model="formState[item.code]"
        :start="item.extra && item.extra.start || '00:00'"
        :step="item.extra && item.extra.step || '00:15'"
        :end="item.extra && item.extra.end || '23:59'"
        :placeholder="item.placeholder || '请选择'"
        :disabled="item.disabled"
        :clearable="item.clearable" 
        @change="(val: string) => methods.formChange(val, item)"
    />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { dataProp } from './definitions'
export default defineComponent({
    props: {
        item: {
            type: Object as PropType<dataProp>,
            default: () => {}
        },
        formState: {
            type: Object,
            default: () => {}
        },
        methods: {
            type: Object,
            default: () => {}
        }
    },
    setup(props) {
        let { item, formState, methods } = props 
        return {
            item, formState, methods
        }
    }
}) 
</script>

<style lang="less">
.widthP100I {
    width: 100% !important;
}
</style>