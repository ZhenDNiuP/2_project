<template>
  <div class="container">
    <a-table bordered :data-source="goodsList" rowKey="id" :pagination="pagination" class="table" align="center">
      <a-table-column key="name" title="商品名称" data-index="name" />
      <a-table-column key="t" title="填报时间" data-index="t"></a-table-column>
      <a-table-column key="num" title="二维码数量" data-index="num"></a-table-column>
      <a-table-column key="num" data-index="num">
        <a-button>查看</a-button>
        <a-button>下载</a-button>
        <a-button>修改</a-button>
      </a-table-column>
    </a-table>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.container {
  margin-top: 20px;
}
</style>
