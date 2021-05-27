<template>
  <div class="loginContainer">
    <div class="logos">
      <img class="title" src="../assets/title.png" alt="" />
    </div>
    <a-input-search class="ipt" enter-button="一键溯源" size="large" @search="onSearch" />
    <div class="btn">
      <a-button class="btn1" type="primary" @click="login">登录</a-button>
      <a-button @click="registered">注册</a-button>
    </div>
    <!-- 登录的对话框 -->
    <a-modal
      @cancel="handleCancel"
      okText="登录"
      cancelText="取消"
      centered
      v-model="loginVisible"
      title="登录"
      @ok="handleOk"
    >
      <a-form-model
        ref="loginFormRef"
        :model="loginForm"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :rules="loginRules"
      >
        <a-form-model-item label="手机号" prop="phone">
          <a-input v-model="loginForm.phone" />
        </a-form-model-item>
        <a-form-model-item label="密码" prop="password">
          <a-input type="password" v-model="loginForm.password" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- 注册的对话框 -->
    <a-modal
      @cancel="registeredCancel"
      okText="注册"
      cancelText="取消"
      centered
      v-model="registeredVisible"
      title="注册"
      @ok="registeredOk"
    >
      <a-form-model
        ref="registeredFormRef"
        :model="registeredForm"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :rules="registeredRules"
      >
        <a-form-model-item label="姓名" prop="name">
          <a-input v-model="registeredForm.name" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="手机号" prop="phone">
          <a-input v-model="registeredForm.phone" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="密码" prop="password">
          <a-input type="password" v-model="registeredForm.password" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="确认密码" prop="checkPassword">
          <a-input type="password" v-model="registeredForm.checkPassword" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="身份证" prop="idCard">
          <a-input v-model="registeredForm.idCard" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- 查看产品信息的对话框 -->
    <a-modal
      v-model="viewModalVisible"
      title="查看商品"
      @ok="
        () => {
          this.viewModalVisible = false
        }
      "
    >
      <a-form-model :model="productInfo" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="商品id">
          <a-input disabled :value="productInfo.p_id" />
        </a-form-model-item>
        <a-form-model-item label="商品名称">
          <a-input disabled :value="productInfo.p_name" />
        </a-form-model-item>
        <a-form-model-item label="产地">
          <a-input disabled :value="productInfo.origin" />
        </a-form-model-item>
        <a-form-model-item label="填报时间">
          <a-input disabled :value="productInfo.infotime" />
        </a-form-model-item>
        <a-form-model-item label="存储方式">
          <a-input disabled :value="productInfo.storage" />
        </a-form-model-item>
        <a-form-model-item label="运输方式">
          <a-input disabled :value="productInfo.transport" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import format from '../api/format'
export default {
  data() {
    let phoneCheckPending
    let idCardCheckPending
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registeredForm.checkPassword !== '') {
          this.$refs.registeredFormRef.validateField('checkPassword')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码'))
      } else if (value !== this.registeredForm.password) {
        callback(new Error('两次输入的密码不一致！'))
      } else {
        callback()
      }
    }
    let validatePhone = (rule, value, callback) => {
      clearTimeout(phoneCheckPending)
      if (value === '') {
        callback(new Error('请输入手机号'))
      }
      phoneCheckPending = setTimeout(() => {
        const phoneReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
        if (!phoneReg.test(value)) {
          callback(new Error('请输入正确的手机号'))
        }
        callback()
      }, 1000)
    }
    let validateIdCard = (rule, value, callback) => {
      clearTimeout(idCardCheckPending)
      if (value === '') {
        callback(new Error('请输入您的身份证'))
      }
      idCardCheckPending = setTimeout(() => {
        const idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (!idCardReg.test(value)) {
          callback(new Error('请输入正确的身份证号码'))
        }
        callback()
      }, 1000)
    }
    return {
      productInfo: {},
      viewModalVisible: false,
      loginVisible: false,
      registeredVisible: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      loginForm: {
        phone: '15858585858',
        password: '111111'
      },
      registeredForm: {
        name: '',
        phone: '',
        checkPassword: '',
        password: '',
        idCard: ''
      },
      loginRules: {
        phone: [{ trigger: 'blur', required: true, message: '请输入手机号' }],
        password: [{ trigger: 'blur', required: true, message: '请输入密码' }]
      },
      registeredRules: {
        name: [{ trigger: 'blur', message: '请输入姓名', required: true }],
        phone: [{ validator: validatePhone, trigger: 'blur', required: true }],
        password: [{ validator: validatePass, trigger: 'change', required: true }],
        checkPassword: [{ validator: validatePass2, trigger: 'change', required: true }],
        idCard: [{ validator: validateIdCard, trigger: 'change', required: true }]
      }
    }
  },
  methods: {
    async onSearch(val) {
      if (val.trim()) {
        const res = await this.$http.post('/api/product/selectProductP', {
          pid: val
        })
        if (res.data) {
          res.data[0].infotime = format(res.data[0].infotime)
          this.productInfo = res.data[0]
          this.viewModalVisible = true
        }
      } else {
        this.$message.warning('请输入产品序列号')
      }
    },
    // 展示登录的对话框
    login() {
      this.loginVisible = true
    },
    // 点击注册的对话框
    registered() {
      this.registeredVisible = true
    },
    // 点击确定登录
    async handleOk() {
      const res = await this.$http.post('/api/user/selectUser', this.loginForm)
      console.log(res)

      if (res.data.length === 0) {
        this.$message.warning('请输入正确的手机号或密码！')
      } else {
        window.sessionStorage.setItem('token', new Date().getTime())
        window.sessionStorage.setItem('userId', res.data[0].u_id)
        this.$router.push('/goods')
        this.$message.success('登录成功！')
        this.loginVisible = false
      }
    },
    // 点击注册添加用户
    registeredOk() {
      this.$refs.registeredFormRef.validate(async valid => {
        if (valid) {
          const res = await this.$http.post('/api/user/addUser', {
            uname: this.registeredForm.name,
            phone: this.registeredForm.phone,
            password: this.registeredForm.password,
            idcard: this.registeredForm.idCard
          })
          if (res.status === 200) {
            console.log(res)
            this.$message.success('注册成功！')
            this.$refs.registeredFormRef.resetFields()
            this.registeredVisible = false
          }
        } else {
          this.$message.warning('请完善您的信息！')
        }
      })
    },
    // 监听登录对话框关闭的事件
    handleCancel() {
      this.$refs.loginFormRef.resetFields()
    },
    // 监听注册对话框关闭的事件
    registeredCancel() {
      this.$refs.registeredFormRef.resetFields()
    }
  }
}
</script>

<style>
.loginContainer {
  width: 100%;
  height: 100%;
  background-image: url(../assets/bg.jpg);
  position: relative;
}
.btn {
  position: absolute;
  top: 366px;
  right: 45%;
}
.logos {
  position: absolute;
  width: 480px;
  height: 80px;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: 215px auto;
}
.title {
  width: 460px;
  height: 60px;
}
.ipt {
  position: absolute;
  width: 501px !important;
  top: 105px;
  bottom: 0;
  right: 0;
  left: 0;
  margin: 185px auto;
}
.btn1 {
  margin-right: 15px;
}
</style>
