<template>
  <div class="container">
    <a-table bordered :data-source="codeInfo" :pagination="pagination" class="table" align="center">
      <a-table-column key="cp_id" title="商品ID" data-index="cp_id" />
      <a-table-column key="cp_name" title="商品名称" data-index="cp_name" />
      <a-table-column key="codetime" title="生成时间" data-index="codetime" />
      <a-table-column>
        <template slot-scope="row">
          <a-button @click="toView(row)">查看二维码</a-button>
        </template>
      </a-table-column>
    </a-table>

    <!-- 查看二维码的对话框 -->
    <a-modal :footer="null" v-model="qrCodeVisible" title="查看二维码" width="380px">
      <img :src="codeID" alt="" />
    </a-modal>
  </div>
</template>

<script>
import format from '../api/format'
export default {
  data() {
    return {
      codeInfo: [],
      codeID: '',
      qrCodeVisible: false
    }
  },
  created() {
    this.getCode()
  },
  computed: {
    pagination() {
      return {
        'show-size-changer': true,
        total: this.codeInfo.length,
        showQuickJumper: true
      }
    }
  },
  methods: {
    async getCode() {
      this.userId = window.sessionStorage.getItem('userId')
      const res = await this.$http.post('/api/code/selectCode', {
        cuid: this.userId
      })
      if (res.data.length) {
        console.log(res)
        res.data.forEach((item, index) => {
          item.key = index
          item.codetime = format(item.codetime)
        })
        this.codeInfo = res.data
      }
    },
    // 展示二维码的对话框
    async toView(row) {
      this.codeID = 'http://localhost:8081/' + row.cp_id + '.png'
      console.log(this.codeID)
      this.qrCodeVisible = true
    }
  }
}
</script>

<style>
.container {
  margin-top: 20px;
}
</style>
