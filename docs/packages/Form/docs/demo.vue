<template>
    <div>
        <my-form :formConfig="formConfig" ref="formRef">
            <template #btn>
                <el-button :icon="Search" type="primary" @click="onSearch">查询</el-button>
            </template>
        </my-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
let formRef = ref()
let onChange = () => {
    let temp = (formConfig.value.formConfigData.find(el => el.code == 'pileDceName') as any)
    temp.type = temp.type == 'hidden' ? 'input' : 'hidden'
}

let formConfig = ref({
    formConfigData: [
        {
            code: 'stationName',
            label: '站点名称',
            type: 'select',
            dataFormat: [],
            fieldName: {
                value: 'stationCode',
                label: 'stationName'
            },
            changeFunName: 'onChange'
        },
        {
            code: 'pileDceName',
            label: '充电桩编号',
            type: 'input'
        },
        {
            label: '查询时间',
            code: 'dateRange',
            type: 'daterange',
            formClassName: 'jw_daterange'
        },
        {
            code: '',
            slot: 'btn',
            type: '',
            formClassName: 'pull-right'
        }
    ],
    formConfigBase: {
        inline: true,
        'label-width': 90
    },
    functions: {
        onChange: onChange
    }
})

let getEnum = () => {
    setTimeout(() => {
        (formConfig.value.formConfigData.find(el => el.code == 'stationName') as any).dataFormat = [
            {
                "stationCode": "02300001",
                "stationName": "杭州炬华科技股份有限公司123",
                "addr": "开元曼居酒店停车场",
                "chargePileCount": null,
                "status": 1,
                "longitude": "119.7",
                "latitude": "30.64",
                "stationImage": "http://test-oss.zjepd.com/energyops/IMG/2023/10/515e6383-88ad-49ce-add2-0da55f120aea.png?Expires=1698683219&OSSAccessKeyId=LTAI5tHfAxQYyk7G4b1QUk2B&Signature=lSnzTHhVq89vx1MVT8ogxoucDiU%3D"
            },
            {
                "stationCode": "04500002",
                "stationName": "小鱼站123",
                "addr": "时代的",
                "chargePileCount": null,
                "status": 1,
                "longitude": "116.4224009776628",
                "latitude": "39.93482727239599",
                "stationImage": null
            },
            {
                "stationCode": "04200006",
                "stationName": "测试电压等级修改1",
                "addr": "寄过来肯德基高考啦",
                "chargePileCount": null,
                "status": 1,
                "longitude": "120.82504144983139",
                "latitude": "27.86766390241107",
                "stationImage": null
            },
            {
                "stationCode": "04700001",
                "stationName": "炬华科技股份有限公司",
                "addr": "仓前街道",
                "chargePileCount": null,
                "status": 1,
                "longitude": "120.01625605346752",
                "latitude": "30.289167375561437",
                "stationImage": null
            },
            {
                "stationCode": "04800001",
                "stationName": "新的项目1112",
                "addr": "详细地址",
                "chargePileCount": null,
                "status": 1,
                "longitude": "119.98588694926113",
                "latitude": "30.280405065311427",
                "stationImage": null
            },
            {
                "stationCode": "04900001",
                "stationName": "0712项目",
                "addr": "111",
                "chargePileCount": null,
                "status": 1,
                "longitude": "120.20428990179938",
                "latitude": "30.232618187567876",
                "stationImage": null
            },
            {
                "stationCode": "05000002",
                "stationName": "中国移动杭研站",
                "addr": "中国移动余杭研发中心",
                "chargePileCount": null,
                "status": 1,
                "longitude": "119.99432239732204",
                "latitude": "30.28192256470706",
                "stationImage": null
            },
            {
                "stationCode": "04200007",
                "stationName": "测试充电站122",
                "addr": "单极开关来得及离开",
                "chargePileCount": null,
                "status": 1,
                "longitude": "123.03548413861611",
                "latitude": "41.156116121101775",
                "stationImage": null
            },
            {
                "stationCode": "04200010",
                "stationName": "测试充电站1",
                "addr": "佛挡杀佛",
                "chargePileCount": null,
                "status": 1,
                "longitude": "117.25841295306803",
                "latitude": "39.134487325955114",
                "stationImage": null
            }
        ]
    }, 100)
}

getEnum()

let onSearch = () => { }
</script>

<style lang="less" scoped>
:deep(.jw_daterange) {
    width: 400px !important;
}

:deep(.pull-right) {
    float: right;
}
</style>