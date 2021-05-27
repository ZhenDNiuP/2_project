<template>
  <div class="container">
    <a-row>
      <a-col :offset="1">
        <a-table bordered :data-source="codeList" :pagination="pagination" class="table" align="center">
          <a-table-column key="cp_name" title="商品名称" data-index="cp_name" />
          <a-table-column key="codetime" title="填报时间" data-index="codetime"></a-table-column>
          <!-- <a-table-column key="num" title="二维码数量" data-index="num"></a-table-column> -->
          <!-- <a-table-column key="num" data-index="num">
            <a-button>查看</a-button>
            <a-button>下载</a-button>
            <a-button>修改</a-button>
          </a-table-column> -->
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import format from '../api/format'
export default {
  data() {
    return {
      codeList: [],
      userId: ''
    }
  },
  computed: {
    pagination() {
      return {
        'show-size-changer': true,
        total: this.codeList.length,
        showQuickJumper: true
      }
    }
  },
  created() {
    this.getCodeList()
  },
  methods: {
    async getCodeList() {
      this.userId = window.sessionStorage.getItem('userId')
      const res = await this.$http.post('/api/user/selectCode', { cpid: this.userId })
      if (res.data.length !== 0) {
        res.data.forEach((item, index) => {
          item.key = index
          item.codetime = format(item.codetime)
        })
        this.codeList = res.data
      }
      console.log(res)
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 20px;
}
</style>
