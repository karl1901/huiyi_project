<template>
  <div class="main" v-loading="loading01" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="bt">文件管理</div>

    <!-- 查询表单 -->
    <div class="cx">
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="queryInfo.filename" placeholder="文件名模糊查询"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="queryInfo.contentType" placeholder="文件类型模糊查询"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="queryInfo.fileinfo" placeholder="文件描述模糊查询"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="query" icon="el-icon-search" type="primary" round>查询</el-button>
          <el-button @click="reset" icon="el-icon-refresh" type="warning" round>刷新</el-button>
          <el-button @click="toAdd" icon="el-icon-upload" type="success" round>上传</el-button>
        </el-form-item>

        <el-form-item>
          <el-button @click="backindex" type="primary" icon="el-icon-d-arrow-left" round>首页</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 数据表格 -->
    <div>
      <el-table :data="list" height="550px">
        <el-table-column label="文件编号" prop="fid"></el-table-column>
        <el-table-column label="文件名称" prop="filename"></el-table-column>
        <el-table-column label="文件描述" prop="fileinfo"></el-table-column>
        <el-table-column label="文件类型" prop="contentType"></el-table-column>
        <!-- <el-table-column label="文件大小" prop="fileSize"></el-table-column> -->
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.fid | fileurl" alt="" width="130px" height="90px" />
          </template>
        </el-table-column>
        <el-table-column label="上传时间">
          <template slot-scope="scope">
            {{ scope.row.lastupdate | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="download(scope.row.fid)" type="primary" icon="el-icon-download" plain>下载</el-button>
            <el-button v-if="isImage(scope.row)" @click="showImage(scope.row)" type="success" plain>预览</el-button>
            <br />
            <el-button @click="showFileUrl(scope.row.fid)" type="primary" class="el-icon-link" plain>链接</el-button>
            <el-button @click="del(scope.row)" type="danger" icon="el-icon-delete" plain></el-button>
          </template>
        </el-table-column>
      </el-table>
      <page :page="page" @page-change="query" class="pg"></page>
    </div>

    <!-- 预览对话框 -->
    <div>
      <el-dialog top="5.7rem" title="图片预览" :visible.sync="imgDialog">
        <div class="ylimg">
          <img :src="imgUrl" alt="" />
        </div>
      </el-dialog>
    </div>

    <!-- 添加对话框 -->
    <div>
      <el-dialog title="文件上传" :close-on-click-modal="false" @closed="query" :visible.sync="addDialog">
        <div>
          <el-form>
            <el-form-item>
              <el-input v-model="addInfo.fileinfo" placeholder="文件描述"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button @click="openFile">选择文件...</el-button>
              <span v-if="file">{{ file.name }}</span>
            </el-form-item>

            <el-form-item>
              <el-button @click="resetAdd">重置</el-button>
              <el-button @click="upload">上传</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Page from '../../components/Page';
import tools from '../../js/tools';

export default {
  name: 'FileManage',
  components: { Page },
  data() {
    return {
      // 全局加载
      loading01: false,
      page: {
        pageNumber: 1,
        pageSize: 4
      },
      queryInfo: {
        fileinfo: '',
        filename: '',
        contentType: ''
      },
      list: [],
      loading: false,
      imgUrl: '',
      imgDialog: false,
      // 添加相关
      file: null,
      addInfo: {
        fileinfo: ''
      },
      addDialog: false
    };
  },
  methods: {
    // 返回首页路由
    backindex() {
      this.$router.push('/back/backindex');
    },
    // 查看图片链接
    showFileUrl(fid) {
      let app = this;
      app.$message(app.$getDownloadUrl(fid));
    },
    // 删除文件
    del(file) {
      let app = this;
      app
        .$confirm('是否删除文件：' + file.filename, '删除文件')
        .then(function() {
          app.$ajax('/file/delete', { 'tbFile.fid': file.fid }, function(data) {
            app.$message({
              message: data.message,
              onClose: app.query,
              showClose: true
            });
          });
        })
        .cath(function() {});
    },
    // 选择文件
    openFile() {
      let app = this;
      tools.openFile(function(file) {
        app.file = file;
      });
    },
    // 上传文件
    upload() {
      let app = this;
      app.$sendFile(
        '/file/upload',
        app.file,
        {
          'tbFile.fileinfo': this.addInfo.fileinfo
        },
        function(data) {
          app.$message(data.message);
          if (data.success) {
            app.resetAdd();
          }
        }
      );
    },
    // 打开上传对话框
    toAdd() {
      this.resetAdd();
      this.addDialog = true;
    },
    // 重置添加表单
    resetAdd() {
      this.file = null;
      this.addInfo = {
        fileinfo: ''
      };
    },
    // 刷新
    reset() {
      this.page = {
        pageNumber: 1,
        pageSize: 4
      };
      this.queryInfo = {
        fileinfo: '',
        filename: ''
      };
      this.query();
    },
    // 预览图片
    showImage(file) {
      this.imgUrl = this.$getDownloadUrl(file.fid);
      this.imgDialog = true;
    },
    // 判断是否为图片
    isImage(file) {
      return file.contentType.substr(0, 6) == 'image/';
    },
    // 下载图片
    download(fid) {
      console.log('下载的文件id：', fid);
      // 下载是get请求，需要后端服务器完整地址
      // 需要传递请求参数，其中包括文件的id和token
      // 除了id，其他信息都在ajax封装类中可以拿到
      console.log('下载的请求地址：', this.$getDownloadUrl(fid));
      window.open(this.$getDownloadUrl(fid));
    },
    // 查询文件
    query() {
      this.loading = true;
      this.$ajax(
        '/file/query',
        {
          tbFile: this.queryInfo,
          page: this.page
        },
        function(data) {
          this.loading = false;
          if (data.success) {
            this.page = data.resultData.page;
            this.list = data.resultData.list;
            return;
          }
          this.$message.error(data.message);
        }
      );
    },
    // 文件管理界面加载的方法
    queryAll() {
      this.loading01 = true;
      setTimeout(() => {
        this.loading01 = false;
      }, 200);
    }
  },
  created() {
    this.queryAll();
    this.query();
  }
};
</script>

<style scoped>
.main {
  position: absolute;
  top: 0px;
  left: 0px;
  min-width: 100vw;
  min-height: 100vh;
}

.el-dialog img {
  display: block;
  width: 100%;
  height: auto;
}

.bt {
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem;
}

.pg {
  margin-top: 1rem;
  text-align: center;
}

.cx {
  /* text-align: center; */
  display: flex;
  justify-content: flex-end;
  margin: 2rem 3rem;
}
</style>
