<template>
  <div class="loginContainer">
    <div class="logos">
      <img class="title" src="../assets/title.png" alt="" />
    </div>
    <a-input-search class="ipt" enter-button="一键溯源" size="large" />
    <div class="btn">
      <a-button class="btn1" type="primary" @click="login">登录</a-button>
      <a-button>注册</a-button>
    </div>
    <!-- 登录的对话框 -->
    <a-modal
      @cancel="handleCancel"
      okText="登录"
      cancelText="取消"
      centered
      v-model="visible"
      title="登录"
      @ok="handleOk"
    >
      <a-form-model
        ref="loginFormRef"
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :rules="loginRules"
      >
        <a-form-model-item label="手机号" prop="phone">
          <a-input v-model="form.phone" />
        </a-form-model-item>
        <a-form-model-item label="密码" prop="password">
          <a-input type="password" v-model="form.password" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      form: {
        phone: '16657279868',
        password: '111111'
      },
      loginRules: {
        phone: [{ trigger: 'blur' }],
        password: [{ trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 展示登录的对话框
    login() {
      this.visible = true
    },
    // 点击确定登录
    async handleOk() {
      this.visible = false
      // const res = await this.$http.post('/api/user/addUser', {
      //   uname: '2jh',
      //   phone: '13535353535',
      //   idcard: '330424222222222222'
      // })

      // const res = await this.$http.post('/api/user/selectUser', {
      //   phone: '15858585858'
      // })
      // console.log(res)

      // const res = await this.$http.post('/api/user/selectProductU', {
      //   upid: '0000000001'
      // })
      // console.log(res)

      // const res = await this.$http.post('/api/user/selectProductP', {
      //   pid: '1000000001'
      // })
      // console.log(res)

      // const res = await this.$http.post('/api/user/addProduct', {
      //   pname: '椰子',
      //   origin: '海南',
      //   storage: '冷藏',
      //   transport: '空运',
      //   upid: '0000000001'
      // })
      // console.log(res)

      const res = await this.$http.post('/api/user/updateProduct', {
        pid: '1000000001',
        pname: '苹果',
        origin: '山西',
        storage: '冷冻',
        transport: '水运'
      })
      console.log(res)

      if (res.data.status === 200) {
        window.sessionStorage.setItem('token', new Date().getTime())
        // this.$router.push('/goods')
      }
    },
    // 监听登录对话框关闭的事件
    handleCancel() {
      this.$refs.loginFormRef.resetFields()
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
