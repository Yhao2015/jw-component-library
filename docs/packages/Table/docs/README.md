<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
import demo2 from './demo2.vue'
import demo3 from './demo3.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# 表格

用于展示多条结构类似的数据， 可对数据进行排序、筛选、对比或其他自定义操作

## 基础用法

<Preview comp-name="Table" demo-name="demo">
  <demo />
</Preview>

## 用法2 多选/单选

<Preview comp-name="Table" demo-name="demo">
  <demo2 />
</Preview>

## 用法3 多级表头

<Preview comp-name="Table" demo-name="demo">
  <demo3 />
</Preview>

## 属性 tableConfig

|     参数      |   说明   |  类型  | 可选值 | 默认值 | 是否必填 |
| :-----------: | :------: | :----: | :----: | :----: | :------: |
|  `tableData`  | 表格数据 | array  |   -    |  `-`   |    否    |
|   `columns`   |  列数据  | array  |   -    |  `-`   |    是    |
| `tableConfig` |  配置项  | object |   -    |  `-`   |    是    |

## 属性 tableConfig

|   参数    |     说明     |  类型   | 可选值 | 默认值  | 是否必填 |
| :-------: | :----------: | :-----: | :----: | :-----: | :------: |
| `loading` | 是否显示动画 | boolean |   -    | `false` |    否    |
| `extra` | [扩展参数](https://element-plus.gitee.io/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7) | object |   -    |  `-`   |    否    |
| `row-key` | 行数据的 Key，用来优化 Table 的渲染 | string | - | `-` | 否 |
| `height` | Table 的高度， 默认为自动高度 | string / number | - | `-` | 否 |
| `max-height` | Table 的最大高度。 合法的值为数字或者单位为 px 的高度 | string / number | - | `-` | 否 |
| `pagination` | 分页 | boolean | - | `-` | 否 |
| `currentPage` | 分页：当前页 | number | - | `1` | 否 |
| `pageSize` | 分页：条数 | number | - | `10` | 否 |
| `total` | 分页：总条数 | number | - | `0` | 否 |
| `index` | 是否显示索引 | boolean | - | `false` | 否 |
| `stripe` | 是否为斑马纹 table | boolean | - | `true` | 否 |
| `border` | 是否带有纵向边框 | boolean | - | `false` | 否 |
| `size` | Table 的尺寸 | string | large / default /small | `-` | 否 |
| `show-header` | 是否显示表头 | boolean | - | `true` | 否 |
| `highlight-current-row` | 是否要高亮当前行 | boolean | - | `false` | 否 |
| `empty-text` | 空数据时显示的文本内容 | string | - | `-` | 否 |
| `show-summary` | 是否在表尾显示合计行 | boolean | - | `-` | 否 |
| `sum-text` | 显示摘要行第一列的文本 | string | - | `-` | 否 |
| `summary-method` | 自定义的合计计算方法 | function({ columns, data }) | - | `-` | 否 |
| `span-method` | 合并行或列的计算方法 | function({ row, column, rowIndex, columnIndex }) | - | `-` | 否 |
| `table-layout` | 设置表格单元、行和列的布局方式 | string | fixed / auto | `fixed` | 否 |
| `show-overflow-tooltip` | 是否隐藏额外内容并在单元格悬停时使用 Tooltip 显示它们。这将影响全部列的展示 | boolean | - | `-` | 否 |
| `tableRowClassName` | 行添加自定义样式 | function | - | `-` | 否 |

## 属性 columns

|     参数      |                      说明                      |       类型       |          可选值           | 默认值 | 是否必填 |
| :-----------: | :--------------------------------------------: | :--------------: | :-----------------------: | :----: | :------: |
|    `title`    |                   显示的标题                   |      string      |             -             |  `-`   |    否    |
|  `dataIndex`  |                 column 的 key                  |      string      |             -             |  `-`   |    否    |
|    `width`    |                  对应列的宽度                  | string / number  |             -             |  `-`   |    否    |
|    `align`    |                    对齐方式                    |      string      |   left / center / right   | `left` |    否    |
|    `fixed`    | 列是否固定在左侧或者右侧。 true 表示固定在左侧 | string / boolean | `true / 'left' / 'right'` |  `-`   |    否    |
| `scopedSlots` |                   slot 插槽                    |      string      |             -             |  `-`   |    否    |

## 事件

|        事件名         |                   说明                    |        参数列表         |   参数说明    |
| :-------------------: | :---------------------------------------: | :---------------------: | :-----------: | --- |
|    `selectChange`     |                 单选/多选                 |          array          |    object     | -   |
| `handleCurrentChange` | current-page 改变时触发, pagination: true | (value: number) => void | `currentPage` |
|  `handleSizeChange`   |  page-size 改变时触发, pagination: true   | (value: number) => void |  `pageSize`   |
