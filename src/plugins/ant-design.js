import Vue from 'vue'
import { Button, Input, Modal, FormModel, Layout, Menu, Table, Checkbox, ConfigProvider, message } from 'ant-design-vue'
Vue.use(Button)
Vue.use(Input)
Vue.use(Modal)
Vue.use(FormModel)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Table)
Vue.use(Checkbox)
Vue.use(ConfigProvider)
// Vue.use(Message)
Vue.prototype.$message = message
