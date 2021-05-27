<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  data() {
    return {
      locale: zhCN
    }
  }
}
</script>
<style>
#app {
  min-width: 600px;
  width: 100%;
  height: 100%;
}
</style>
