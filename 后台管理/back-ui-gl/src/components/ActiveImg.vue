<template>
  <div>
    <div>
      <!-- <span slot="label"><i class="el-icon-tickets"> 活动信息</i></span> -->
      <div class="classhd">活动图片信息</div>

      <div class="query-btn">
        <div>
          <el-button type="primary" icon="el-icon-refresh-right" round @click="queryNewactivetp">刷新</el-button>
        </div>
      </div>
      <div>
        <el-table :data="activetplist" stripe v-loading="activetploading" height="340">
          <!-- <el-table-column label="活动编号" prop="paid"></el-table-column> -->
          <el-table-column label="图片描述" prop="imgInfo"></el-table-column>
          <el-table-column label="活动图片">
            <template slot-scope="scope">
              <el-tooltip content="点击查看图片" placement="right" effect="light">
                <img :src="scope.row.fid | fileurl" alt="" height="55px" width="110px" @click="ckimg(scope.row)" />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="最后修改时间" sortable prop="lastupdate">
            <template slot-scope="scope">
              {{ scope.row.lastupdate | formatDate('MM:dd hh:mm:ss') }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="medium" plain icon="el-icon-delete" @click="del(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <page :page="activetpPage" @page-change="queryActivetp" v-loading="activetploading" class="pg"></page>
      </div>
    </div>

    <!-- 查看图片的对话框 -->
    <div>
      <el-dialog :append-to-body="true" top="5rem" title="查看图片" :visible.sync="ckfjtp">
        <div class="show-img">
          <img :src="imgfid | fileurl" alt="" />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Page from '../components/Page';
export default {
  components: { Page },
  name: 'Test',
  data() {
    return {
      loading: false,
      activetplist: [],
      activetploading: false,
      activetpPage: {
        pageSize: 4,
        pageNumber: 1
      },
      imgfid: '',
      ckfjtp: false
      // queryInfotp: {
      //   accessKey: this.$accessKey,
      //   paid: ''
      // }
    };
  },
  props: {
    info: {
      default() {
        return {};
      }
    }
  },
  watch: {
    info: function(ov, nv) {
      console.log(ov, nv);
      this.queryActivetp();
    }
  },
  methods: {
    // 查看图片的方法
    ckimg(info) {
      this.ckfjtp = true;
      this.imgfid = info.fid;
    },
    // 删除活动图片
    del(info) {
      this.$confirm('是否删除此活动图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$ajax(
            '/portable/active/imgaes/delete',
            {
              tbPortableActiveImages: {
                accessKey: this.$accessKey,
                paiid: info.paiid
              }
            },
            function(data) {
              if (!data.success) {
                this.$notify.error({
                  title: '失败',
                  message: '删除失败',
                  type: 'success'
                });
                return;
              }
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
              this.queryActivetp();
            }
          );
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 刷新活动图片页面的方法
    queryNewactivetp() {
      this.queryActivetp();
    },
    // 查询班级活动图片的方法
    queryActivetp() {
      this.$ajax(
        '/portable/active/imgaes/queryAllByPaid ',
        {
          tbPortableActiveImages: {
            accessKey: this.$accessKey,
            paid: this.info.paid
          },
          page: this.activetpPage
        },
        function(data) {
          if (!data.success) {
            this.$message.error(data.message);
            return;
          }
          this.activetplist = data.resultData.list;
          this.activetpPage = data.resultData.page;
        }
      );
      this.activetploading = true;
      setTimeout(() => {
        this.activetploading = false;
      }, 200);
    }
  },
  created() {
    this.queryActivetp();
  }
};
</script>
<style>
body {
  overflow: hidden;
}

.main {
  position: absolute;
  top: 0px;
  left: 0px;
  min-width: 100vw;
  min-height: 100vh;
}

.title {
  font-size: 1.6rem;
  text-align: center;
  font-weight: bold;
  color: rgb(255, 255, 255);
  background-image: url('https://th.bing.com/th/id/R5217d816ea5b7dba3fdbd113fe756ad1?rik=vQMr9zA76FEcKA&riu=http%3a%2f%2fwww.zlcool.com%2fd%2ffile%2f2011%2f12%2f26%2f7ada32f473314a771545dd5c334be7ed.jpg&ehk=Uavf0pLAhmZMBZQ85t5XN792LJQjrBIdVlAvBwRSmjw%3d&risl=&pid=ImgRaw');
  background-size: cover;
  padding: 1.5rem;
}

.rt {
  display: flex;
  padding: 1rem 2rem 1rem 0rem;
  border-top: 3px solid rgba(58, 56, 56, 0.575);
}

.rt > div {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.classhd {
  text-align: center;
  padding: 0.5rem;
  font-size: 1.3rem;
}

.query-btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  margin-right: 3rem;
}

.query-btn div {
  padding: 0.5rem;
}

.pg {
  padding: 1rem;
  text-align: center;
}

.ck-info {
  font-size: 1.2rem;
}

.ck-info div {
  margin: 1rem;
}

.show-img img {
  display: flex;
  width: 100%;
  height: auto;
}
</style>
