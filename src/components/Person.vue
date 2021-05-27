<template>
  <div class="info">
    <div>
      <div class="label"><label>用 户 I D </label></div>
      <div class="input"><a-input disabled :value="info.u_id" /></div>
    </div>
    <div>
      <div class="label"><label>用户姓名</label></div>
      <div class="input"><a-input disabled :value="info.u_name" /></div>
    </div>
    <div>
      <div class="label"><label>手机号码</label></div>
      <div class="input"><a-input disabled :value="info.phone" /></div>
    </div>
    <div>
      <div class="label"><label>身份证号</label></div>
      <div class="input"><a-input disabled :value="info.idcard" /></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: []
    }
  },
  created() {
    this.getPerson()
  },
  methods: {
    async getPerson() {
      this.userId = window.sessionStorage.getItem('userId')
      const res = await this.$http.post('/api/user/selectUserInfo', {
        uid: this.userId
      })
      console.log(res.data)
      this.info = res.data[0]
    }
  }
}
</script>
<style>
.info {
  font-size: 18px;
  float: left;
}
.info .label {
  float: left;
  padding: 20px 20px 10px 20px;
}
.input {
  float: left;
  padding: 20px 20px 10px 0px;
  width: 600px;
  font-size: 16px;
}
</style>
