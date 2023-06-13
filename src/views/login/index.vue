<template>
  <div>
    <div class="login-box">
      <el-form ref="formRef" :model="dynamicValidateForm" label-width="120px" class="demo-dynamic">
        <el-form-item prop="email" label="Email" :rules="[
          {
            required: true,
            type: 'text',
            message: 'Please input username',
            trigger: 'blur',
          },
        ]">
          <el-input v-model="dynamicValidateForm.username" />
        </el-form-item>
        <el-form-item prop="password" label="Password" :rules="[
          {
            required: true,
            message: 'Please input password',
            trigger: 'blur',
          },
        ]">
          <el-input v-model="dynamicValidateForm.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef as any)">Submit</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang='ts' setup>
  import { FormInstance } from 'element-plus'
  import userStore from "@/store/modules/user";
  const dynamicValidateForm = reactive({
    username: '',
    password: ''
  })
  let formRef = ref(null)
  const router = useRouter()
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        userStore().login(dynamicValidateForm)
        router.push('/')
      } else {
        ElMessage.error('error submit!')
        return false
      }
    })
  }
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

.login-box {
  height: 100%;
  width: 100%;
}
</style>