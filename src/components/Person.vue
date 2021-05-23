<template>
  <div class="info">
    <div>
      <div class="label"><label>用户ID</label></div>
      <div class="input"><a-input /></div>
    </div>
    <div>
      <div class="label"><label>用户姓名</label></div>
      <div class="input"><a-input /></div>
    </div>
    <div>
      <div class="label"><label>手机号码</label></div>
      <div class="input"><a-input /></div>
    </div>
    <div>
      <div class="label">
        <label>身份证号</label>
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
