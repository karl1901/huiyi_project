<template>
  <div>
    <!-- 查询表单 -->
    <div class="cx">
      <el-form :inline="true">
        <!-- <el-form-item>
          <el-input v-model="queryInfo.filename" placeholder="文件名模糊查询"></el-input>
        </el-form-item> -->

        <!-- <el-form-item>
          <el-input v-model="queryInfo.fileinfo" placeholder="文件描述查询"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="queryInfo.contentType" placeholder="文件类型查询"></el-input>
        </el-form-item> -->

        <!-- <el-form-item> -->
        <!-- <el-button @click="query" icon="el-icon-search" type="primary" round>查询</el-button> -->
        <div class="sx">
          <el-button @click="toAdd" size="medium" icon="el-icon-upload" type="success" round>上传</el-button>
          <el-button @click="reset" size="medium" icon="el-icon-refresh" type="warning" round>刷新</el-button>
        </div>
        <!-- </el-form-item> -->
      </el-form>
    </div>

    <!-- 数据表格 -->
    <div>
      <el-table :data="list">
        <!-- <el-table-column label="文件编号" prop="fid"></el-table-column> -->
        <!-- <el-table-column label="文件名称" prop="filename"></el-table-column> -->
        <el-table-column label="文件描述" prop="fileinfo"></el-table-column>
        <el-table-column label="文件类型/图片预览">
          <template slot-scope="scope">
            <img v-if="isImage(scope.row)" :src="scope.row.fid | fileurl" height="80px" />
            <span v-else>
              {{ scope.row.contentType }}
            </span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="文件大小" prop="fileSize"></el-table-column> -->
        <el-table-column label="上传时间">
          <template slot-scope="scope">
            {{ scope.row.lastupdate | formatDate('MM-dd hh:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="medium" @click="selectFile(scope.row)">选择文件</el-button>
            <!-- <el-button v-if="isImage(scope.row)">预览</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <page :page="page" @page-change="query" class="pg"></page>
    </div>

    <!-- 添加对话框 -->
    <div>
      <el-dialog :append-to-body="true" title="文件上传" :close-on-click-modal="false" @closed="query" :visible.sync="addDialog">
        <div>
          <el-form>
            <el-form-item label="文件描述：">
              <br />
              <div>例如：<span style="color: #1E90FF;">展示图片01/展示图片02....</span></div>
              <el-input v-model="addInfo.fileinfo" placeholder="文件描述"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button size="medium" @click="openFile">选择文件...</el-button>
              <span v-if="file">{{ file.name }}</span>
              <br />
              <span style="color:	#FFA500;">提示：文件大小不能超过2M！</span>
            </el-form-item>

            <el-form-item>
              <el-button size="medium" @click="resetAdd">重置</el-button>
              <el-button size="medium" @click="upload">上传</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Page from '../components/Page';
import tools from '../js/tools';
export default {
  components: { Page },
  name: 'FileChoose',
  data() {
    return {
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
        fileinfo: '展示图片'
      },
      addDialog: false
    };
  },
  methods: {
    selectFile(file) {
      this.$emit('file-selected', file);
    },
    openFile() {
      let app = this;
      tools.openFile(function(file) {
        app.file = file;
      });
    },
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
    toAdd() {
      // this.resetAdd();
      this.addDialog = true;
    },
    resetAdd() {
      this.file = null;
      this.addInfo = {
        fileinfo: ''
      };
    },
    reset() {
      this.page = {
        pageNumber: 1,
        pageSize: 4
      };
      // this.queryInfo = {
      //   fileinfo: '风景',
      //   filename: ''
      // };
      this.query();
    },
    isImage(file) {
      return file.contentType.substr(0, 6) == 'image/';
    },
    query() {
      this.loading = true;
      this.$ajax(
        '/file/query',
        {
          tbFile: {
            fileinfo: '展示'
          },
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
    }
  },
  created() {
    this.query();
  }
};
</script>

<style scoped>
.pg {
  margin-top: 1rem;
  text-align: center;
}

/* 刷新按钮 */
.sx {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}
</style>
