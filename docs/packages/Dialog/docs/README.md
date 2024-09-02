<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# 弹框

在保留当前页面状态的情况下，告知用户并承载相关操作

## 基础用法

<Preview comp-name="Dialog" demo-name="demo">
  <demo />
</Preview>

## 属性

|    参数     |            说明             |  类型   | 可选值 | 默认值  | 是否必填 |
| :---------: | :-------------------------: | :-----: | :----: | :-----: | :------: |
|   `type`    |            类型             | string  |   -    |  `''`   |    是    |
|  `visible`  |       是否显示 Dialog       | boolean |   -    | `false` |    是    |
|   `title`   | Dialog 对话框 Dialog 的标题 | string  |   -    |  `''`   |    否    |
|   `width`   |        对话框的宽度         | number  |   -    |  `480`  |    否    |
| `functions` |          事件集合           | object  |   -    |  `{}`   |    否    |

## 事件 functions

|    事件名     |   说明   | 参数列表 | 参数说明 |
| :-----------: | :------: | :------: | :------: |
| `handleClose` | 取消事件 |    -     |    -     |
| `handleSave`  | 确定事件 |    -     |    -     |

## Slot

|  事件名   |        说明        | 参数列表 | 参数说明 |
| :-------: | :----------------: | :------: | :------: |
| `content` | 弹框主题，内容部分 |    -     |    -     |
