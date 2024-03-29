<template>
    <div>
        <my-add-forms :formConfig="formConfig" ref="addFormsRef"/>

        <el-button type="primary" @click="onSave" :style="{ width: '100%', 'margin-top': '16px' }">保存</el-button>
        <el-button type="primary" @click="onSets" :style="{ width: '100%', 'margin-top': '16px' }">赋值</el-button>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

let formConfig = reactive({
    formConfigData: [
        {
            label: '充电桩编号',
            code: 'dceCode',
            type: 'input',
            show: true,
            required: false,
            disabled: true
        },
        {
            label: '设备类型',
            code: 'electricityType',
            type: 'select',
            show: true,
            required: true,
            dataFormat: [
                {
                    label: '直流',
                    value: 1
                },
                {
                    label: '交流',
                    value: 2
                }
            ]
        },
        {
            label: '设备型号',
            code: 'deviceModel',
            type: 'input',
            show: true,
            required: true
        },
        {
            label: '额定功率(kW)',
            code: 'ratedP',
            type: 'number',
            show: true,
            required: true,
            'label-width': 120
        },
        {
            label: '输出电压(V)',
            code: 'ratedVoltage',
            type: 'input',
            show: true,
            required: true
        },
        {
            label: '输出电流(A)',
            code: 'ratedElectricity',
            type: 'input',
            show: true,
            required: true
        },
        {
            label: '设备厂家',
            code: 'cmSource',
            type: 'select',
            show: true,
            required: false,
            fieldName: {
                value: 'code',
                label: 'desc'
            }
        }
    ],
    formConfigBase: {
        'label-width': 100,
        grid: {
            xs: 8,
            sm: 8,
            md: 8,
            lg: 8,
            xl: 8
        }
    },
    functions: {}
})

let addFormsRef = ref()
let onSave = () => {
    addFormsRef.value.save().then((data: any) => {
        console.log(data)
    })
}

let onSets = () => {
    let data = [
        {
            dceCode: '11111111',
            electricityType:  1,
            deviceModel: '2313',
            ratedP: 100,
            ratedVoltage: 10,
            ratedElectricity: 20,
            cmSource: null
        },
        {
            dceCode: '2222222',
            electricityType: 2,
            deviceModel: '2313',
            ratedP: 100,
            ratedVoltage: 10,
            ratedElectricity: 20,
            cmSource: null
        },
        {
            dceCode: '3333333',
            electricityType:  1,
            deviceModel: '2313',
            ratedP: 100,
            ratedVoltage: 10,
            ratedElectricity: 20,
            cmSource: null
        }
    ]
    addFormsRef.value.setValues(data)
}
</script>
