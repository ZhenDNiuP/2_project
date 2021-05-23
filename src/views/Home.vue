<template>
  <div class="homePage">
    <a-layout class="layout">
      <a-layout-header class="header">农产品溯源数据采集平台</a-layout-header>
      <a-layout>
        <a-layout-sider class="sider">
          <a-menu theme="dark" :default-selected-keys="['goods']">
            <a-menu-item key="goods" ref="goods" @click="() => this.$router.push('/' + this.$refs.goods.eventKey)">
              <span><img src="../assets/goods.svg" /> 商品管理</span>
            </a-menu-item>
            <a-menu-item key="code" ref="code" @click="() => this.$router.push('/' + this.$refs.code.eventKey)">
              <span><img src="../assets/code.svg" /> 二维码管理</span>
            </a-menu-item>
            <a-menu-item key="person" ref="person" @click="() => this.$router.push('/' + this.$refs.person.eventKey)">
              <span><img src="../assets/person.svg" /> 我的信息</span>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content class="content">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
export default {
  methods: {}
}
</script>
<style>
.homePage,
.layout {
  width: 100%;
  height: 100%;
}
.content {
  background-color: #fff;
}
.layout .header {
  background-color: #393d49;
  color: #fff;
  font-size: 16px;
  line-height: 60px;
  text-align: left;
  padding: 0 20px;
}
.layout .sider {
  background-color: #393d49;
}
.ant-menu.ant-menu-dark .ant-menu-item-selected {
  background-color: #009688 !important;
}
.ant-menu-vertical .ant-menu-item {
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}
.ant-menu-dark {
  background-color: #393d49 !important;
}
</style>
