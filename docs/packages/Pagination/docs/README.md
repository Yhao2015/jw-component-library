<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# 分页

当数据量过多时，使用分页分解数据

## 基础用法

<Preview comp-name="Pagination" demo-name="demo">
  <demo />
</Preview>

## 属性 paginationConfig

|     参数      |           说明           |  类型   | 可选值 | 默认值 | 是否必填 |
| :-----------: | :----------------------: | :-----: | :----: | :----: | :------: |
| `currentPage` |        当前页数        | number  |   -    |  `1`   |    否    |
|  `pageSize`   |        每页显示条目个数        | number  |   -    |  `10`  |    否    |
|    `total`    |        总条目数        | number  |   -    |  `0`   |    否    |
| `background`  | 是否为分页按钮添加背景色 | boolean |   -    | `true` |    否    |
|   `layout`    | 组件布局，子组件名用逗号分隔 | string  | `total, sizes, prev, pager, next, jumper` | `total, sizes, prev, pager, next, jumper` |    否    |

## 事件 functions

|        事件名         |          说明           |        参数列表         |   参数说明    |
| :-------------------: | :---------------------: | :---------------------: | :-----------: |
| `handleCurrentChange` | current-page 改变时触发 | (value: number) => void | `currentPage` |
|  `handleSizeChange`   |  page-size 改变时触发   | (value: number) => void |  `pageSize`   |
