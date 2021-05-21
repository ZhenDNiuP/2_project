<template>
  <div class="info">
    <div>
      <div class="label"><label>用户类型</label></div>
      <div class="input"><a-input /></div>
    </div>
    <div>
      <div class="label"><label>手机号码</label></div>
      <div class="input"><a-input /></div>
    </div>
    <div>
      <div class="label"><label>公司名称</label></div>
      <div class="input"><a-input /></div>
    </div>
    <div>
      <div class="label">
        <label>社会统一<br />信用代码</label>
      </div>
      <div class="input"><a-input /></div>
    </div>
  </div>
</template>
<script>
export default {}
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
