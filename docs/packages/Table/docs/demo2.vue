<template>
    <div class="my-table">
        <el-radio-group v-model="type" @change="onChange">
            <el-radio label="checkBox">多选</el-radio>
            <el-radio label="radio">单选</el-radio>
        </el-radio-group>

        <my-table :tableConfig="tableConfig" :tableData="tableData" :columns="columns" >
            <template #action>
                <span class="jw_line">曲线详情</span>
            </template>
            <template #rangTime="scope">
                {{ scope.data.row.startTime + '至' + (scope.data.row.endTime || '———') }}
            </template>
            <template #status="scope">
                <span :style="{ 'color': getMapColorName(scope.data.row.status).color }">{{ getMapColorName(scope.data.row.status).name }}</span>
            </template>
        </my-table>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
let getMapColorName = (status: number = 0) => {
    let map: any = {
        3: { color: '#A55E60', name: '停止中' },
        2: { color: '#B28955', name: '充电中' },
        4: { color: '#3C9EEB', name: '已结束' },
        1: { color: '#357F7A', name: '启动中' },
        5: { color: '#9A9DA4', name: '未知' }
    }

    return map[status]
}

let type = ref('checkBox')

let onChange = (value: any) => {
    tableConfig.type = value
}

let tableConfig = reactive({
    loading: false,
    'row-key': 'orderNo',
    'max-height': 400,
    pagination: true,
    currentPage: 1,
    pageSize: 10,
    total: 0,
    index: true,
    type: 'checkBox',
    functions: {
        handleCurrentChange: (val: number) => {
            tableConfig.currentPage = val
            console.log('currentPage', val)
        },
        handleSizeChange: (val: number) => {
            tableConfig.pageSize = val
            console.log('pageSize', val)
        },
        selectChange: (val: Array<object> | object) => {
            console.log('selectChange', val)
        }
    }
})

let tableData = ref<Array<any>>([])

let columns = ref([
    {
        title: '订单时间',
        dataIndex: 'startTime',
        width: '400',
        align: 'center',
        scopedSlots: 'rangTime'
    },
    {
        title: '订单编号',
        dataIndex: 'orderNo',
        width: '400',
        align: 'center'
    },
    {
        title: '充电时长(h)',
        dataIndex: 'chargeHourStr',
        width: '200',
        align: 'center'
    },
    {
        title: '充电电量(kWh)',
        dataIndex: 'totalPower',
        width: '200',
        align: 'center'
    },
    {
        title: '开始时SOC(%)',
        dataIndex: 'beginSoc',
        width: '200',
        align: 'center'
    },
    {
        title: '结束时SOC(%)',
        dataIndex: 'endSoc',
        width: '200',
        align: 'center'
    },
    {
        title: '状态',
        dataIndex: 'status',
        fixed: 'right',
        width: '150',
        align: 'center',
        scopedSlots: 'status'
    },
    {
        title: '操作',
        dataIndex: 'action',
        fixed: 'right',
        width: '150',
        align: 'center',
        scopedSlots: 'action'
    }
])

let getTableData = () => {
    tableConfig.loading = true
    setTimeout(() => {
        tableConfig.loading = false
        tableConfig.total = 100
        tableData.value = [
            {
                "startTime": "2023-10-27 12:48:49",
                "orderNo": "395815801202310270500146815",
                "status": 4,
                "endTime": "2023-10-27 13:11:51",
                "chargeHour": "0.38",
                "totalPower": "23.70",
                "beginSoc": "71.00",
                "endSoc": "84.00",
                "chargeHourStr": "00:23:02"
            },
            {
                "startTime": "2023-10-27 11:43:50",
                "orderNo": "395815801202310270500120874",
                "status": 4,
                "endTime": "2023-10-27 12:15:39",
                "chargeHour": "0.53",
                "totalPower": "9.33",
                "beginSoc": "79.00",
                "endSoc": "99.00",
                "chargeHourStr": "00:31:48"
            },
            {
                "startTime": "2023-10-26 15:16:18",
                "orderNo": "395815801202310260500178124",
                "status": 4,
                "endTime": "2023-10-26 15:59:58",
                "chargeHour": "0.73",
                "totalPower": "27.99",
                "beginSoc": "36.00",
                "endSoc": "97.00",
                "chargeHourStr": "00:43:40"
            },
            {
                "startTime": "2023-10-23 16:51:12",
                "orderNo": "395815801202310230500201397",
                "status": 4,
                "endTime": "2023-10-23 17:23:22",
                "chargeHour": "0.54",
                "totalPower": "22.04",
                "beginSoc": "53.00",
                "endSoc": "96.00",
                "chargeHourStr": "00:32:10"
            },
            {
                "startTime": "2023-10-23 15:42:20",
                "orderNo": "395815801202310230500186460",
                "status": 4,
                "endTime": "2023-10-23 16:17:05",
                "chargeHour": "0.58",
                "totalPower": "15.35",
                "beginSoc": "75.00",
                "endSoc": "98.00",
                "chargeHourStr": "00:34:45"
            },
            {
                "startTime": "2023-10-23 06:48:01",
                "orderNo": "395815801202310230500056484",
                "status": 4,
                "endTime": "2023-10-23 07:18:54",
                "chargeHour": "0.51",
                "totalPower": "9.76",
                "beginSoc": "75.00",
                "endSoc": "99.00",
                "chargeHourStr": "00:30:53"
            },
            {
                "startTime": "2023-10-23 06:23:59",
                "orderNo": "395815801202310230500052130",
                "status": 4,
                "endTime": "2023-10-23 06:46:07",
                "chargeHour": "0.37",
                "totalPower": "15.27",
                "beginSoc": "39.00",
                "endSoc": "74.00",
                "chargeHourStr": "00:22:08"
            },
            {
                "startTime": "2023-10-22 16:41:01",
                "orderNo": "395815801202310220500206443",
                "status": 4,
                "endTime": "2023-10-22 17:41:49",
                "chargeHour": "1.01",
                "totalPower": "22.55",
                "beginSoc": "37.00",
                "endSoc": "99.00",
                "chargeHourStr": "01:00:47"
            },
            {
                "startTime": "2023-10-22 15:51:30",
                "orderNo": "395815801202310220500194655",
                "status": 4,
                "endTime": "2023-10-22 16:10:27",
                "chargeHour": "0.32",
                "totalPower": "10.02",
                "beginSoc": "37.00",
                "endSoc": "64.00",
                "chargeHourStr": "00:18:56"
            },
            {
                "startTime": "2023-10-22 11:09:00",
                "orderNo": "395815801202310220500112607",
                "status": 4,
                "endTime": "2023-10-22 11:44:18",
                "chargeHour": "0.59",
                "totalPower": "54.06",
                "beginSoc": "23.00",
                "endSoc": "81.00",
                "chargeHourStr": "00:35:17"
            }
        ]
    }, 1000)
}

getTableData()
</script>

<style lang="less" scoped>
.my-table {
    margin: 16px;
    width: calc(100% - 32px);
}
</style>