<template>
  <div class="main" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <!-- 数据表格部分 -->
    <div>
      <div class="classhd">门户信息管理</div>

      <div class="query-btn">
        <div>
          <el-input v-model="queryInfo.messageGroup" placeholder="信息分组查询"></el-input>
        </div>
        <div>
          <el-button @click="queryYxh" icon="el-icon-search" type="primary" round>查询</el-button>
        </div>
        <div>
          <el-button type="success" icon="el-icon-plus" @click="openaddyxh = true">添加</el-button>
        </div>
        <div>
          <el-button type="warning" icon="el-icon-refresh-right" round @click="queryNewyxh">刷新</el-button>
        </div>
        <div>
          <el-button @click="backindex" type="primary" icon="el-icon-d-arrow-left" round>首页</el-button>
        </div>
      </div>
      <div>
        <el-table :data="yxhlist" stripe v-loading="yxhloading" height="360">
          <el-table-column label="主键" prop="pmid"></el-table-column>
          <el-table-column label="信息分组" prop="messageGroup"></el-table-column>
          <el-table-column label="信息关键词" prop="messageKey"></el-table-column>
          <el-table-column label="最后修改时间" sortable prop="lastupdate">
            <template slot-scope="scope">
              {{ scope.row.lastupdate | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="socpe">
              <el-button type="success" plain icon="el-icon-search" @click="ckyxh(socpe.row)">查看</el-button>
              <el-button type="primary" plain icon="el-icon-edit" @click="showupdateyxh(socpe.row)">编辑</el-button>
              <el-button type="danger" plain icon="el-icon-delete" @click="delyxh(socpe.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <page :page="yxhPage" @page-change="queryYxh" class="pg" v-loading="yxhloading"></page>
      </div>
    </div>

    <!-- 添加门户信息的对话框 -->
    <div>
      <el-dialog :visible.sync="openaddyxh" :close-on-click-modal="false" title="添加门户信息">
        <el-form>
          <el-form-item label="信息分组：">
            <el-input v-model="addInfoyxh.messageGroup" placeholder="信息分组"></el-input>
          </el-form-item>
          <el-form-item label="信息关键字：">
            <el-input v-model="addInfoyxh.messageKey" placeholder="信息关键词" clearable></el-input>
          </el-form-item>
          <el-form-item label="内容描述：">
            <el-input v-model="addInfoyxh.message" placeholder="信息内容" type="textarea" autosize clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="addyxh">添加</el-button>
            <el-button @click="resetaddyxh">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 修改门户信息的对话框 -->
    <div>
      <el-dialog :visible.sync="openupdateyxh" :close-on-click-modal="false" title="修改门户信息">
        <div>
          <el-form>
            <el-form-item>
              <el-input v-model="updateInfoyxh.messageGroup" placeholder="信息分组" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="updateInfoyxh.messageKey" placeholder="信息关键词" type="textarea" autosize clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="updateInfoyxh.message" placeholder="信息内容" type="textarea" autosize clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="updateyxh">保存</el-button>
              <el-button @click="openupdateyxh = false">关闭</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>

    <!-- 查看门户信息的对话框 -->
    <div>
      <el-dialog :visible.sync="openckyxh" :close-on-click-modal="false" title="查看门户信息">
        <div>
          <el-form>
            <el-form-item label="信息分组：">
              <span>{{ ckyxhlist.messageGroup }}</span>
            </el-form-item>
            <el-form-item label="信息关键词：">
              <span>{{ ckyxhlist.messageKey }}</span>
            </el-form-item>
            <el-form-item label="信息内容：">
              <el-input v-model="ckyxhlist.message" placeholder="信息内容" type="textarea" autosize clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Page from '../../components/Page';
export default {
  components: { Page },
  name: 'Protable',
  data() {
    return {
      // 全局loading
      loading: false,
      yxhlist: [],
      yxhPage: {
        pageSize: 4,
        pageNumber: 1
      },
      yxhloading: false,
      openaddyxh: false,
      addInfoyxh: {
        accessKey: this.$accessKey,
        messageGroup: '',
        messageKey: '',
        message: ''
      },
      openckyxh: false,
      ckyxhlist: {},
      openupdateyxh: false,
      updateInfoyxh: {},
      queryInfo: {
        accessKey: this.$accessKey,
        messageGroup: ''
      }
    };
  },
  methods: {
    // 返回首页路由
    backindex() {
      this.$router.push('/back/backindex');
    },
    // 刷新门户信息页面的方法
    queryNewyxh() {
      this.queryInfo = {
        accessKey: this.$accessKey,
        messageGroup: ''
      };
      this.yxhPage = {
        pageSize: 4,
        pageNumber: 1
      };
      this.queryYxh();
    },
    // 获取门户信息修改数据的方法
    showupdateyxh(info) {
      this.openupdateyxh = true;
      this.updateInfoyxh = JSON.parse(JSON.stringify(info));
    },
    // 修改门户信息的方法
    updateyxh() {
      this.$ajax(
        '/portable/message/update',
        {
          tbPortableMessage: this.updateInfoyxh
        },
        function(data) {
          if (!data.success) {
            this.$notify.error({
              title: '失败',
              message: '修改失败，' + data.message,
              type: 'success'
            });
            return;
          }
          this.openupdateyxh = false;
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success'
          });
          this.queryYxh();
        }
      );
      this.queryYxh();
    },
    // 删除门户信息的方法
    delyxh(info) {
      this.$confirm('是否删除此项门户信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$ajax(
            '/portable/message/delete',
            {
              tbPortableMessage: {
                accessKey: this.$accessKey,
                pmid: info.pmid
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
              this.queryYxh();
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
    // 查看门户信息的方法
    ckyxh(info) {
      this.openckyxh = true;
      this.ckyxhlist = JSON.parse(JSON.stringify(info));
    },
    // 重置门户信息添加表单的方法
    resetaddyxh() {
      this.addInfoyxh = {
        accessKey: this.$accessKey,
        messageGroup: '',
        messageKey: '',
        message: ''
      };
    },
    // 添加门户信息的方法
    addyxh() {
      if (this.addInfoyxh.messageGroup == '') {
        this.$message({
          message: '信息分组必须填写!',
          type: 'warning'
        });

        return;
      }
      if (this.addInfoyxh.messageKey == '') {
        this.$message({
          message: '信息关键词必须填写!',
          type: 'warning'
        });
        return;
      }
      if (this.addInfoyxh.message == '') {
        this.$message({
          message: '内容描述必须填写!',
          type: 'warning'
        });
        return;
      }
      this.$ajax(
        '/portable/message/add',
        {
          tbPortableMessage: this.addInfoyxh
        },
        function(data) {
          if (!data.success) {
            this.$notify.error({
              title: '失败',
              message: '添加失败，同一个分组信息关键词不能相同！！！',
              type: 'success'
            });
            return;
          }
          this.openaddyxh = false;
          this.$notify({
            title: '成功',
            message: '添加成功',
            type: 'success'
          });
          this.addInfoyxh = {
            accessKey: this.$accessKey,
            messageGroup: '',
            messageKey: '',
            message: ''
          };
          this.queryYxh();
        }
      );
    },
    // 查询门户信息的方法
    queryYxh() {
      this.$ajax(
        '/portable/message/queryAll',
        {
          tbPortableMessage: this.queryInfo,
          page: this.yxhPage
        },
        function(data) {
          if (!data.success) {
            this.$message.error(data.message);
            return;
          }
          this.yxhlist = data.resultData.list;
          this.yxhPage = data.resultData.page;
        }
      );
      this.yxhloading = true;
      setTimeout(() => {
        this.yxhloading = false;
      }, 200);
    },
    // 门户信息管理界面加载的方法
    queryAll() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 200);
    }
  },
  created() {
    this.queryAll();
    this.queryYxh();
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
  padding: 0.2rem 4rem 0.2rem 0rem;
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
  font-size: 1.8rem;
  font-weight: bold;
}

.query-btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  margin: 2rem 3rem 2rem 0rem;
}

.query-btn div {
  margin: 0rem 0.35rem;
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
