<template>
  <div class="goodsContainer">
    <a-button @click="showAddModal">添加商品</a-button>

    <a-table bordered :data-source="goodsList" :pagination="pagination" class="table" align="center">
      <a-table-column key="p_name" title="商品名称" data-index="p_name" />
      <a-table-column width="200px" key="origin" title="产地" data-index="origin" />
      <a-table-column key="infotime" title="填报日期" data-index="infotime" />
      <a-table-column key="storage" title="存储方式" data-index="storage" />
      <a-table-column key="transport" title="运输方式" data-index="transport" />
      <a-table-column>
        <template slot-scope="row">
          <a-button @click="toView(row)">查看</a-button>
          <a-button style="margin: 0 20px" @click="showEditModal(row)">修改</a-button>
          <a-button @click="toqrCode(row)">生成二维码</a-button>
        </template>
      </a-table-column>
    </a-table>
    <!-- 查看商品信息的对话框 -->
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
    <!-- 添加商品的对话框 -->
    <a-modal v-model="addModalVisible" title="添加商品" @ok="addOk" @cancel="addCancel">
      <a-form-model
        :rules="addRules"
        ref="addProductRef"
        :model="addProductForm"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="商品名称" prop="p_name">
          <a-input v-model="addProductForm.p_name" />
        </a-form-model-item>
        <a-form-model-item label="产地" prop="origin">
          <a-input v-model="addProductForm.origin" />
        </a-form-model-item>
        <a-form-model-item label="存储方式" prop="storage">
          <a-input v-model="addProductForm.storage" />
        </a-form-model-item>
        <a-form-model-item label="运输方式" prop="transport">
          <a-input v-model="addProductForm.transport" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- 修改商品的对话框 -->
    <a-modal v-model="editModalVisible" title="修改商品" @ok="editOk">
      <a-form-model :model="productInfo" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="商品id">
          <a-input disabled :value="productInfo.p_id" />
        </a-form-model-item>
        <a-form-model-item label="商品名称">
          <a-input v-model="productInfo.p_name" />
        </a-form-model-item>
        <a-form-model-item label="产地">
          <a-input v-model="productInfo.origin" />
        </a-form-model-item>
        <a-form-model-item label="填报时间">
          <a-input disabled :value="productInfo.infotime" />
        </a-form-model-item>
        <a-form-model-item label="存储方式">
          <a-input v-model="productInfo.storage" />
        </a-form-model-item>
        <a-form-model-item label="运输方式">
          <a-input v-model="productInfo.transport" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import format from '../api/format'
export default {
  data() {
    return {
      userId: '',
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      goodsList: [],
      productInfo: {},
      addProductForm: {
        p_name: '',
        origin: '',
        storage: '',
        transport: ''
      },
      addModalVisible: false,
      editModalVisible: false,
      viewModalVisible: false,
      addRules: {
        p_name: [{ trigger: 'blur', required: true, message: '请输入商品名称' }],
        origin: [{ trigger: 'blur', required: true, message: '请输入产地' }],
        storage: [{ trigger: 'blur', required: true, message: '请输入存储方式' }],
        transport: [{ trigger: 'blur', required: true, message: '请输入运输方式' }]
      }
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    async getProduct() {
      this.userId = window.sessionStorage.getItem('userId')
      const res = await this.$http.post('/api/product/selectProductU', {
        upid: this.userId
      })
      if (res.data.length) {
        console.log(res)
        res.data.forEach((item, index) => {
          item.key = index
          item.infotime = format(item.infotime)
        })
        this.goodsList = res.data
      }
      console.log(this.goodsList)
    },
    // 展示查看信息的对话框
    async toView(row) {
      const res = await this.$http.post('/api/product/selectProductP', {
        pid: row.p_id
      })
      if (res.data) {
        res.data[0].infotime = format(res.data[0].infotime)
        this.productInfo = res.data[0]
        this.viewModalVisible = true
      }
    },
    // 展示添加商品的对话框
    showAddModal() {
      this.addModalVisible = true
    },
    // 展示修改商品的对话框
    async showEditModal(row) {
      const res = await this.$http.post('/api/product/selectProductP', {
        pid: row.p_id
      })
      if (res.data) {
        res.data[0].infotime = format(res.data[0].infotime)
        this.productInfo = res.data[0]
        this.editModalVisible = true
      }
    },
    async addOk() {
      const params = {
        upid: this.userId,
        pname: this.addProductForm.p_name,
        origin: this.addProductForm.origin,
        storage: this.addProductForm.storage,
        transport: this.addProductForm.transport
      }
      const res = await this.$http.post('/api/product/addProduct', params)
      console.log(res)
      this.getProduct()
      this.$refs.addProductRef.resetFields()
      this.addModalVisible = false
    },
    async editOk() {
      const res = await this.$http.post('/api/product/updateProduct', {
        pid: this.productInfo.p_id,
        pname: this.productInfo.p_name,
        origin: this.productInfo.origin,
        storage: this.productInfo.storage,
        transport: this.productInfo.transport
      })
      if (res.data) {
        this.getProduct()
        this.editModalVisible = false
      }
    },
    // editCancel() {
    //   this.$refs.editProductRef.resetFields()
    // },
    // viewCancel() {
    //   this.$refs.viewProductRef.resetFields()
    // },
    addCancel() {
      this.$refs.addProductRef.resetFields()
    },
    // 生成二维码
    async toqrCode(row) {
      const res = await this.$http.get('/api/code/qrcode?pid=' + row.p_id)
      if (res.data) {
        console.log(res.data)
      }
    }
  },
  computed: {
    pagination() {
      return {
        'show-size-changer': true,
        total: this.goodsList.length,
        showQuickJumper: true
      }
    }
  }
}
</script>
<style>
.goodsContainer > .ant-btn {
  width: 92px;
  height: 38px;
  background-color: #009688;
  color: #fff;
  margin: 10px;
}
.goodsContainer > .ant-btn:hover,
.goodsContainer > .ant-btn:focus {
  color: #fff;
  background-color: #009688;
}
.table {
  padding-left: 10px;
  width: 1100px !important;
}
</style>
