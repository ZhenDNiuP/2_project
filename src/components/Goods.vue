<template>
  <div class="goodsContainer">
    <a-button @click="showAddModal">添加商品</a-button>
    <a-button @click="showEditModal">修改商品</a-button>
    <a-table
      bordered
      :data-source="goodsList"
      rowKey="id"
      :rowSelection="rowSelection"
      :pagination="pagination"
      class="table"
      align="center"
    >
      <a-table-column key="name" title="商品名称" data-index="name" />
      <a-table-column width="300px" key="area" title="产品基地名" data-index="area" />
      <a-table-column key="t" title="填报时间" data-index="t"></a-table-column>
      <a-table-column key="num" title="二维码数量" data-index="num"></a-table-column>
    </a-table>
    <!-- 添加商品的对话框 -->
    <a-model v-model="addModalVisible" title="添加商品" @ok="addOk"></a-model>
    <!-- 修改商品的对话框 -->
    <a-modal v-model="editModalVisible" title="修改商品" @ok="editOk">
      <a-form-model :model="selectedRows" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="商品名称">
          <a-input :value="selectedRows ? selectedRows.name : ''" />
        </a-form-model-item>
      </a-form-model>
      <!-- {{ selectedRows }} -->
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      goodsList: [],
      addModalVisible: false,
      editModalVisible: false,
      selectedRows: []
    }
  },
  created() {
    this.getUsrInfo()
    this.getProduct()
  },
  methods: {
    async getProduct() {
      const res = await this.$http.get('/product', {
        page: 1,
        limit: 10
      })
      console.log(res)
    },
    async getUsrInfo() {
      const res = await this.$http.get('/userInfo')
      console.log(res)
    },
    showAddModal() {
      this.addModalVisible = true
    },
    showEditModal() {
      this.editModalVisible = true
    },
    addOk() {
      this.addModalVisible = false
    },
    editOk() {
      this.editModalVisible = false
    }
  },
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log('selectedRows: ', selectedRows)
          this.selectedRows = selectedRows[0]
        }
      }
    },
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
.goodsContainer .ant-btn {
  width: 92px;
  height: 38px;
  background-color: #009688;
  color: #fff;
  margin: 10px;
}
.goodsContainer .ant-btn:hover,
.goodsContainer .ant-btn:focus {
  color: #fff;
  background-color: #009688;
}
.table {
  width: 900px !important;
}
</style>
