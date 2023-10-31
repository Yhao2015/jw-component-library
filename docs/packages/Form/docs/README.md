<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
import demo2 from './demo2.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# 表单

表单包含 输入框, 单选框, 下拉选择, 多选框 等用户输入的组件

## 基础用法

<Preview comp-name="Form" demo-name="demo">
  <demo />
</Preview>

## 基础用法

<Preview comp-name="Form" demo-name="demo">
  <demo2 />
</Preview>

## 属性 formConfig

|       参数       |   说明   |  类型  | 可选值 | 默认值 | 是否必填 |
| :--------------: | :------: | :----: | :----: | :----: | :------: |
| `formConfigData` | 数据集合 | array  |   -    |   -    |    否    |
| `formConfigBase` | 基础配置 | object |   -    |   -    |    否    |
|   `functions`    | 事件集合 | string |   -    |   -    |    否    |

## 属性 formConfigData

|      参数       |    说明    |  类型   | 可选值 | 默认值  | 是否必填 |
| :-------------: | :--------: | :-----: | :----: | :-----: | :------: |
|     `type`      |    类型    | string  |   -    |   ``    |    是    |
|     `show`      | 显示 隐藏  | boolean |   -    |   ``    |    是    |
|     `code`      | 唯一 code  | string  |   -    |   ``    |    否    |
|   `required`    |  必填校验  | boolean |   -    | `false` |    否    |
|  `placeholder`  |    占位    | string  |   -    |   ``    |    否    |
|     `label`     |   标签名   | string  |   -    |   ``    |    否    |
|  `label-width`  | 标签名宽度 | number  |   -    |   ``    |    否    |
| `defaultValue`  |   默认值   |   any   |   -    |   ``    |    否    |
|   `clearable`   |   是否显示清除按钮，只有当 type 不是 textarea时生效   |   boolean   |   -    |   `false`    |    否    |
|   `disabled`    |   是否禁用   |   boolean   |   -    |   `false`    |    否    |
|  `dataFormat`   |   枚举值   |   array   |   -    |   ``    |    否    |
|   `fieldName`   |   枚举值隐射, 配合dataFormat使用   |   object   |   -    |   ``    |    否    |
|     `slot`      |   插槽   |   any   |   -    |   ``    |    否    |
|   `multiple`    |   是否多选， type `treeSelect` `select` `cascader`  |   boolean   |   -    |   `false`    |    否    |
| `show-checkbox` |   节点是否可被选择 type `treeSelect`   |   any   |   -    |   ``    |    否    |
|    `trigger`    |   验证逻辑的触发方式   |   string   |   'blur' / 'change'    |   `change`    |    否    |
|    `pattern`    |   正则   |   string   |   -    |   ``    |    否    |
|     `help`      |   校验失败的提示信息   |   string   |   -    |   ``    |    否    |
|    `accept`     |   允许上传的类型 type `upload`   |   string   |   -    |   ``    |    否    |
|     `limit`     |   最多附件个数 type `upload`  |   number   |   -    |   ``    |    否    |
|     `extra`     |   扩展属性   |   any   |   -    |   ``    |    否    |
| `formClassName` |   自定义class样式   |   any   |   -    |   ``    |    否    |

## 属性 formConfigBase

|            参数             |    说明    |  类型  | 可选值 |  默认值   | 
| :-------------------------: | :--------: | :----: | :----: | :-------: | 
|          `inline`           | 行内表单模式 | boolean |   -    | `false` |    
|      `label-position`       | 表单域标签的位置, 当设置为 left 或 right 时，则也需要设置 label-width 属性 | string |   `left, right, top`    | `right` |    
|        `label-width`        | 标签的长度 | string / number |   -    | `100px` |   
|       `label-suffix`        | 表单域标签的后缀 | string |   -    | `` |    
|  `hide-required-asterisk`   | 是否隐藏必填字段标签旁边的红色星号 | boolean |   -    | `false` |    
| `require-asterisk-position` | 星号的位置 | 'left' / 'right' |   -    | `left` |    
|      `inline-message`       | 是否以行内形式展示校验信息 | boolean |   -    | `false` |    
|        `status-icon`        | 是否在输入框中显示校验结果反馈图标 | boolean |   -    | `false` |    
|          `gutter`           | 栅格间隔 | number |   -    | `0` |    
|           `grid`            | 响应式布局 | string |   -    | `{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }` |    
|        `item-bottom`        | 表单之间间距 | string |   -    | `16px` |    


## 方法 functions
|            参数             |    说明    |  类型  | 可选值 |  默认值   | 
| :-------------------------: | :--------: | :----: | :----: | :-------: | 
| `checkFunName`  |   校验方式   |   Function   |   -    |   ``    |    否    |
| `changeFunName`  |   change事件   |   Function   |   -    |   ``    |    否    |
| `blurFunName`  |   blur事件   |   Function   |   -    |   ``    |    否    |
| `focusFunName`  |   focus事件   |   Function   |   -    |   ``    |    否    |