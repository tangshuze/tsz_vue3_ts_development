<template>
  <div class="login-form">
    <form-create :rule="rule" :option="option" @submit="onSubmit"></form-create>
  </div>
</template>

<script lang="ts" setup>
const rule = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
const option = {
  formItem: {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  },
  submitBtn: {
    render: {
      type: 'primary',
      size: 'large',
      children: '登录'
    }
  }
}
const onSubmit = (formData: any) => {
  // 表单提交事件
  if (formData.valid) {
    // 表单验证通过，执行登录逻辑
    console.log('登录成功');
  } else {
    console.log('表单验证失败');
  }
}
</script>

<style scoped>
.login-form {
  width: 400px;
  margin: 0 auto;
}
</style>
