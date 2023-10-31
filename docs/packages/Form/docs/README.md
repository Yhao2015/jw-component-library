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
参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必填
:-: | :-: | :-: | :-: | :-: | :-:
`formConfigData` | 数据集合 | array | - | - | 否 
`formConfigBase` | 基础配置 | object | - | - | 否
`functions` | 事件集合 | string | - | - | 否


## 属性 formConfigData
参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必填
:-: | :-: | :-: | :-: | :-: | :-:
`type` | 类型 | string | - | `` | 是 
`show` | 显示 隐藏 | boolean | - | `` | 是 
`code` | 唯一code | string | - | `` | 是

## 属性 formConfigBase
参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必填
:-: | :-: | :-: | :-: | :-: | :-:
`inline` | 第一个参数 | string | - | `default` | 否 
`label-position` | 第二个参数 | string | - | `default` | 否
`label-width` | 第二个参数 | string | - | `default` | 否
