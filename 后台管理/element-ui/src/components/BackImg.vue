<template>
  <div>
    <div>后台图片组件测试页面</div>
    <div>
      <el-table :data="list">
        <div>
          <el-table-column>
            <template slot-scope="scope">
              <img :src="imgUrl" alt="" :data="img(scope.row.fid)" width="300px" height="300px" />
            </template>
          </el-table-column>
        </div>
      </el-table>
      <page :page="page" @page-change="query"></page>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackImg',
  data() {
    return {
      page: {
        pageNumber: 1,
        pageSize: 8
      },
      list: [],
      imgUrl: ''
    };
  },
  methods: {
    query() {
      this.$ajax(
        '/file/query',
        {
          tbFile: this.queryInfo,
          page: this.page
        },
        function(data) {
          if (data.success) {
            this.page = data.resultData.page;
            this.list = data.resultData.list;
            return;
          }
          this.$message.error(data.message);
        }
      );
    },
    img(fid) {
      this.imgUrl = this.$getDownloadUrl(fid);
    }
  },
  created() {
    this.query();
  }
};
</script>
