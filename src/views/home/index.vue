<template>
  <div>
    <form-create :rule="rule" v-model:api="fApi" :option="options" />
    <el-button class="">提交</el-button>
  </div>
</template>

<script setup lang="ts">
let fApi = reactive({})
const options = reactive({
  onSubmit: (formData: object) => {
    console.log('formData:', formData);
  },
  resetBtn: true
})
const rule = reactive([
  {
    type: 'input',
    field: 'goods_name',
    title: '商品名称',
    value: 'form-create'
  },
  {
    type: 'checkbox',
    field: 'label',
    title: '标签',
    value: [0, 1, 2, 3],
    options: [
      { label: '好用', value: 0 },
      { label: '快速', value: 1 },
      { label: '高效', value: 2 },
      { label: '全能', value: 3 },
    ]
  },
  {
    type: 'a-button',
    title: '自定义按钮',
    native: false,
    on: {
      click() {
        alert('点击了按钮')
      }
    },
    children: ['按钮']
  },
  {
    type: "InputNumber",
    field: "price",
    title: "价格",
    value: 1,
    props: {
      precision: 2
    },
  },
  {
    type: "DatePicker",
    field: "section_day",
    title: "活动日期",
    value: ['2018-02-20', '2021-02-15'],
    props: {
      type: "datetimerange",
      format: "yyyy-MM-dd HH:mm:ss",
      placeholder: "请选择活动日期",
    }
  },
  {
    "type": "slider",
    "field": "F5u25z9g1ecl8",
    "title": "滑块",
    "info": "ttt",
    "props": {
      "min": 0,
      "max": 100
    },
    "_fc_drag_tag": "slider",
    "hidden": false,
    "display": true,
    "value": 0
  }
])
</script>