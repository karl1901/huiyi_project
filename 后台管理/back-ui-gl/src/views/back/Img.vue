<template>
  <div class="main" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="title">更多图片展示管理</div>
    <div class="rt">
      <div><el-button type="info" icon="el-icon-back" @click="rtindex">返回</el-button></div>
    </div>

    <!-- 数据表格部分 -->
    <el-tabs type="card">
      <!-- 展示图片 -->
      <el-tab-pane label="展示图片">
        <span slot="label"><i class="el-icon-picture"></i> 展示图片</span>
        <div class="classhd">展示图片</div>

        <div class="query-btn">
          <div>
            <el-button type="success" icon="el-icon-plus" @click="openaddfjtp = true">添加</el-button>
          </div>
          <div>
            <el-button type="primary" icon="el-icon-refresh-right" round @click="queryNewfjtp">刷新</el-button>
          </div>
        </div>
        <div>
          <el-table :data="fjtplist" stripe v-loading="fjtploading" height="420">
            <!-- <el-table-column label="文件编号" prop="fid"></el-table-column>
            <el-table-column label="文件名称" prop="filename"></el-table-column> -->
            <el-table-column label="文件描述" prop="fileinfo"></el-table-column>
            <el-table-column label="展示的风景图片">
              <template slot-scope="scope">
                <el-tooltip content="点击查看图片" placement="right" effect="light">
                  <img :src="scope.row.fid | fileurl" alt="" height="55px" width="110px" @click="showfjtp(scope.row)" />
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="最后修改时间" sortable prop="lastupdate">
              <template slot-scope="scope">
                {{ scope.row.lastupdate | formatDate }}
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="socpe">
                <el-button type="success" plain icon="el-icon-search" v-if="isImage(socpe.row)" @click="showfjtp(socpe.row)">预览</el-button>
                <el-button type="primary" plain icon="el-icon-download" @click="downloadfjtp(socpe.row)"></el-button>
                <el-button type="danger" plain icon="el-icon-delete" @click="delfjtp(socpe.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <page :page="fjtpPage" @page-change="queryFjtp" v-loading="fjtploading" class="pg"></page>
        </div>
      </el-tab-pane>
      <!-- 图片展示文字 -->
      <el-tab-pane label="图片展示文字">
        <span slot="label"><i class="el-icon-document"> 图片展示文字</i></span>
        <!-- <div class="classhd">图片展示文字</div> -->

        <div class="query-btn">
          <div>
            <el-button type="success" icon="el-icon-plus" @click="openaddfjtpxx = true">添加</el-button>
          </div>
          <div>
            <el-button type="primary" icon="el-icon-refresh-right" round @click="queryNewfjtpxx">刷新</el-button>
          </div>
        </div>
        <div>
          <el-table :data="fjtpxxlist" stripe v-loading="fjtpxxloading" height="505">
            <!-- <el-table-column label="信息分组" prop="messageGroup"></el-table-column>
            <el-table-column label="信息关键词" prop="messageKey"></el-table-column> -->
            <el-table-column label="对应的展示图片">
              <template slot-scope="socpe">
                <el-tooltip content="点击查看图片" placement="right" effect="light">
                  <img :src="getUrl(socpe.row)" alt="" height="75px" width="120px" @click="ckimg(socpe.row)" />
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="展示的文字">
              <template slot-scope="socpe">
                <span v-html="socpe.row.message"></span>
              </template>
            </el-table-column>
            <el-table-column label="最后修改时间" sortable prop="lastupdate">
              <template slot-scope="scope">
                {{ scope.row.lastupdate | formatDate }}
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="socpe">
                <!-- <el-button type="success" size="medium" plain icon="el-icon-search" @click="ckfjtpxx(socpe.row)">查看</el-button> -->
                <el-button type="primary" size="medium" plain icon="el-icon-edit" @click="showupdatefjtpxx(socpe.row)">编辑</el-button>
                <el-button type="danger" size="medium" plain icon="el-icon-delete" @click="delfjtpxx(socpe.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <page :page="fjtpxxPage" @page-change="queryFjtpxx" class="pg" v-loading="fjtpxxloading"></page>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 添加风景图片的对话框 -->
    <div>
      <el-dialog :visible.sync="openaddfjtp" :close-on-click-modal="false" title="添加展示图片">
        <el-form>
          <el-form-item label="文件描述：">
            <br />
            <div>例如：<span style="color: #1E90FF;">展示图片01/展示图片02....</span></div>
            <el-input v-model="addInfofjtp.fileinfo" placeholder="文件描述："></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="openFile">选择文件...</el-button>
            <span v-if="file">&nbsp;{{ file.name }}</span>
            <br />
            <span style="color:	#FFA500;">提示：文件大小不能超过2M！</span>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="addfjtp">添加</el-button>
            <el-button @click="resetaddfjtp">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 预览风景图片的对话框 -->
    <div>
      <el-dialog top="5rem" title="展示风景图片预览" :visible.sync="ckfjtp">
        <div class="show-img">
          <img :src="imgUrl" alt="" />
        </div>
      </el-dialog>
    </div>

    <!-- 添加图片信息的对话框 -->
    <div>
      <el-dialog :visible.sync="openaddfjtpxx" :close-on-click-modal="false" title="添加图片展示文字">
        <el-form>
          <!-- <el-form-item label="信息分组：">
            <el-input v-model="addInfofjtpxx.messageGroup" placeholder="信息分组"></el-input>
          </el-form-item> -->
          <el-form-item label="所属图片：">
            <!-- <el-input v-model="addInfofjtpxx.messageKey" placeholder="信息关键词" clearable></el-input>
          </el-form-item>
          <el-form-item label="选择文件："> -->
            <div v-if="addInfofjtpxx.messageKey != ''">
              <img :src="addInfofjtpxx.messageKey | fileurl" width="190px" height="130px" alt="" />
            </div>
            <div class="choose-btn">
              <el-button type="info" plain @click="fileVisible03 = true">选择图片</el-button>
            </div>
          </el-form-item>
          <el-form-item label="内容描述：">
            <el-button type="primary" plain @click="Visibleadd = true">添加内容</el-button>
            <!-- <el-input v-model="addInfofjtpxx.message" placeholder="信息内容" type="textarea" autosize clearable></el-input> -->
            <div class="update-html">
              <span v-html="addInfofjtpxx.message"></span>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="addfjtpxx">添加</el-button>
            <el-button @click="resetaddfjtpxx">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 浏览文件选择文件的对话框 -->
    <div>
      <el-dialog top="3rem" :close-on-click-modal="false" :visible.sync="fileVisible03" title="文件选择对话框">
        <div>
          <file-zs-choose @file-selected="fileSelected01"></file-zs-choose>
        </div>
      </el-dialog>
    </div>

    <!-- 添加内容的对话框 -->
    <div>
      <el-dialog title="添加内容编辑框" :close-on-click-modal="false" :visible.sync="Visibleadd">
        <div>
          <my-editor :upmessage.sync="addInfofjtpxx.message" @data-change="editorChange"></my-editor>
        </div>
        <div>
          <el-button type="primary" @click="Visibleadd = false">确定</el-button>
          <el-button @click="editorqx">取消</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 修改图片信息的对话框 -->
    <div>
      <el-dialog :visible.sync="openupdatefjtpxx" :close-on-click-modal="false" title="编辑图片展示文字">
        <div>
          <el-form>
            <!-- <el-form-item label="信息分组：">
              <el-input v-model="updateInfofjtpxx.messageGroup" placeholder="信息分组" clearable></el-input>
            </el-form-item> -->
            <el-form-item label="所属图片：">
              <!-- <el-input v-model="updateInfofjtpxx.messageKey" placeholder="信息关键词" type="textarea" autosize clearable></el-input>
            </el-form-item>
            <el-form-item label="选择文件："> -->
              <div>
                <img :src="updateInfofjtpxx.messageKey | fileurl" width="190px" height="130px" alt="" />
              </div>
              <div class="choose-btn">
                <el-button type="info" plain @click="fileVisible04 = true">选择图片</el-button>
              </div>
            </el-form-item>
            <el-form-item label="信息内容：">
              <!-- <br /> -->
              <!-- <my-editor :upmessage.sync="updateInfofjtpxx.message" @data-change="editorChange01"></my-editor> -->
              <el-button type="primary" plain @click="Visibleupdate = true">编辑内容</el-button>
              <!-- <el-input v-model="updateInfofjtpxx.message" placeholder="信息内容" type="textarea" autosize clearable></el-input> -->
              <div class="update-html">
                <span v-html="updateInfofjtpxx.message"></span>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="updatefjtpxx">保存</el-button>
              <el-button @click="openupdatefjtpxx = false">关闭</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>

    <!-- 浏览文件选择文件的对话框 -->
    <div>
      <el-dialog top="3rem" :close-on-click-modal="false" :visible.sync="fileVisible04" title="文件选择对话框">
        <div>
          <file-zs-choose @file-selected="fileSelected02"></file-zs-choose>
        </div>
      </el-dialog>
    </div>

    <!-- 编辑内容的对话框 -->
    <div>
      <el-dialog title="编辑内容编辑框" :close-on-click-modal="false" :visible.sync="Visibleupdate">
        <div>
          <my-editor :upmessage.sync="updateInfofjtpxx.message" @data-change="editorChange01"></my-editor>
        </div>
        <div>
          <el-button type="primary" @click="Visibleupdate = false">确定</el-button>
          <el-button @click="Visibleupdate = false">取消</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 查看图片信息的对话框 -->
    <div>
      <el-dialog :visible.sync="openckfjtpxx" :close-on-click-modal="false" title="查看图片信息">
        <div>
          <el-form>
            <el-form-item label="信息分组：">
              <span>{{ ckfjtpxxlist.messageGroup }}</span>
            </el-form-item>
            <el-form-item label="信息关键词：">
              <span>{{ ckfjtpxxlist.messageKey }}</span>
            </el-form-item>
            <el-form-item label="信息内容：">
              <el-input v-model="ckfjtpxxlist.message" placeholder="信息内容" type="textarea" autosize clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>

    <!-- 查看图片的对话框 -->
    <div>
      <el-dialog top="5rem" title="查看图片" :visible.sync="ckfjtp01">
        <div class="show-img">
          <img :src="imgUrl02" alt="" />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Page from '../../components/Page';
import tools from '../../js/tools';
import FileZsChoose from '../../components/FileZsChoose .vue';
import MyEditor from '../../components/MyEditor';
export default {
  components: { Page, FileZsChoose, MyEditor },
  name: 'Img',
  data() {
    return {
      // 全局loading
      loading: false,
      // 风景图片
      fjtplist: [],
      fjtploading: false,
      fjtpPage: {
        pageSize: 4,
        pageNumber: 1
      },
      queryInfofjtp: {
        fileinfo: '展示',
        filename: '',
        contentType: ''
      },
      openaddfjtp: false,
      file: null,
      addInfofjtp: {
        fileinfo: '展示图片'
      },
      imgUrl: '',
      ckfjtp: false,
      // 风景图片信息
      fjtpxxlist: [],
      fjtpxxPage: {
        pageSize: 4,
        pageNumber: 1
      },
      fjtpxxloading: false,
      openaddfjtpxx: false,
      addInfofjtpxx: {
        accessKey: this.$accessKey,
        messageGroup: 'imgfjtpxx',
        messageKey: '',
        message: ''
      },
      openckfjtpxx: false,
      ckfjtpxxlist: {},
      imgUrl02: '',
      ckfjtp01: false,
      openupdatefjtpxx: false,
      updateInfofjtpxx: {},
      fileVisible03: false,
      fileVisible04: false,
      Visibleadd: false,
      Visibleupdate: false
    };
  },
  methods: {
    // 获取富文本编辑器的内容给修改的内容
    editorChange01(info) {
      this.updateInfofjtpxx.message = info;
    },
    // 取消添加内容的方法
    editorqx() {
      this.Visibleadd = false;
      // this.resetaddfjtpxx();
      this.addInfofjtpxx.message = '';
    },
    // 获取富文本编辑器的内容给添加表单的方法
    editorChange(info) {
      this.addInfofjtpxx.message = info;
    },
    // 修改风景图片信息选择文件的方法
    fileSelected02(file) {
      this.updateInfofjtpxx.messageKey = file.fid;
      this.fileVisible04 = false;
    },
    // 添加风景图片信息选择文件的方法
    fileSelected01(file) {
      this.addInfofjtpxx.messageKey = file.fid;
      this.fileVisible03 = false;
    },
    // 刷新风景图片信息页面的方法
    queryNewfjtpxx() {
      this.fjtpxxPage = {
        pageSize: 4,
        pageNumber: 1
      };
      this.queryFjtpxx();
    },
    // 获取风景图片信息修改数据的方法
    showupdatefjtpxx(info) {
      this.openupdatefjtpxx = true;
      this.updateInfofjtpxx = JSON.parse(JSON.stringify(info));
    },
    // 修改风景图片信息的方法
    updatefjtpxx() {
      this.$ajax(
        '/portable/message/update',
        {
          tbPortableMessage: this.updateInfofjtpxx
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
          this.openupdatefjtpxx = false;
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success'
          });
          this.queryFjtpxx();
        }
      );
      this.queryFjtpxx();
    },
    // 删除风景图片信息的方法
    delfjtpxx(info) {
      this.$confirm('是否删除此图片信息?', '提示', {
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
              this.queryFjtpxx();
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
    // 查看风景图片信息的方法
    ckfjtpxx(info) {
      this.openckfjtpxx = true;
      this.ckfjtpxxlist = JSON.parse(JSON.stringify(info));
    },
    // 重置风景图片信息添加表单的方法
    resetaddfjtpxx() {
      this.addInfofjtpxx = {
        accessKey: this.$accessKey,
        messageGroup: 'imgfjtpxx',
        messageKey: '',
        message: ''
      };
    },
    // 添加风景图片信息的方法
    addfjtpxx() {
      if (this.addInfofjtpxx.messageGroup == '') {
        this.$message({
          message: '信息分组必须填写!',
          type: 'warning'
        });
        return;
      }
      if (this.addInfofjtpxx.messageKey == '') {
        this.$message({
          message: '必须选择一个图片!',
          type: 'warning'
        });
        return;
      }
      if (this.addInfofjtpxx.message == '') {
        this.$message({
          message: '内容描述不能为空!',
          type: 'warning'
        });
        return;
      }
      this.$ajax(
        '/portable/message/add',
        {
          tbPortableMessage: this.addInfofjtpxx
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
          this.openaddfjtpxx = false;
          this.$notify({
            title: '成功',
            message: '添加成功',
            type: 'success'
          });
          this.addInfofjtpxx = {
            accessKey: this.$accessKey,
            messageGroup: 'imgfjtpxx',
            messageKey: '',
            message: ''
          };
          this.queryFjtpxx();
        }
      );
    },
    // 查看图片的方法
    ckimg(info) {
      this.ckfjtp01 = true;
      this.imgUrl02 = this.$getDownloadUrl(info.messageKey);
    },
    // 获取图片连接的方法
    getUrl(info) {
      return this.$getDownloadUrl(info.messageKey);
    },
    // 查询风景图片信息的方法
    queryFjtpxx() {
      this.$ajax(
        '/portable/message/queryAll',
        {
          tbPortableMessage: {
            accessKey: this.$accessKey,
            messageGroup: 'imgfjtpxx'
          },
          page: this.fjtpxxPage
        },
        function(data) {
          if (!data.success) {
            this.$message.error(data.message);
            return;
          }
          this.fjtpxxlist = data.resultData.list;
          this.fjtpxxPage = data.resultData.page;
        }
      );
      this.fjtpxxloading = true;
      setTimeout(() => {
        this.fjtpxxloading = false;
      }, 200);
    },
    // 删除图片的方法
    delfjtp(file) {
      this.$confirm('是否删除：' + file.fileinfo + ' ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$ajax(
            '/file/delete',
            {
              'tbFile.fid': file.fid
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
              this.queryFjtp();
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
    // 判断是否是图片的方法
    isImage(file) {
      return file.contentType.substr(0, 6) == 'image/';
    },
    // 查看风景图片的方法
    showfjtp(file) {
      this.ckfjtp = true;
      this.imgUrl = this.$getDownloadUrl(file.fid);
    },
    // 下载风景图片的方法
    downloadfjtp(info) {
      window.open(this.$getDownloadUrl(info.fid));
    },
    // 重置风景图片添加表单的方法
    resetaddfjtp() {
      this.addInfofjtp = {
        fileinfo: '展示图片'
      };
      this.file = null;
    },
    // 获取风景图片的文件的方法
    openFile() {
      let app = this;
      tools.openFile(function(file) {
        app.file = file;
      });
    },
    // 添加风景图片的方法
    addfjtp() {
      let app = this;
      if (this.addInfofjtp.fileinfo == '') {
        app.$message({
          message: '文件描述必须填写!',
          type: 'warning'
        });
        return;
      }
      if (app.file == null) {
        app.$message({
          message: '必须选择一个文件!',
          type: 'warning'
        });
        return;
      }
      app.$sendFile(
        '/file/upload',
        app.file,
        {
          'tbFile.fileinfo': this.addInfofjtp.fileinfo
        },
        function(data) {
          // app.$message(data.message);
          if (!data.success) {
            app.$notify.error({
              title: '失败',
              message: '添加失败,' + data.message,
              type: 'success'
            });
            app.resetaddfjtp();
            return;
          }
          app.$message(data.message);
          app.openaddfjtp = false;
          app.$notify({
            title: '成功',
            message: '添加成功',
            type: 'success'
          });
          app.resetaddfjtp();
          app.queryFjtp();
        }
      );
    },
    // 刷新风景图片页面的方法
    queryNewfjtp() {
      this.fjtpPage = {
        pageSize: 4,
        pageNumber: 1
      };
      this.queryFjtp();
    },
    // 查询风景图片的方法
    queryFjtp() {
      this.$ajax(
        '/file/query',
        {
          tbFile: this.queryInfofjtp,
          page: this.fjtpPage
        },
        function(data) {
          if (!data.success) {
            this.$message.error(data.message);
            return;
          }
          this.fjtplist = data.resultData.list;
          this.fjtpPage = data.resultData.page;
        }
      );
      this.fjtploading = true;
      setTimeout(() => {
        this.fjtploading = false;
      }, 200);
    },
    // 返回首页路由
    rtindex() {
      this.$router.push('/back/backindex');
    },
    // 图片展示管理界面加载的方法
    queryAll() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 200);
    }
  },
  created() {
    this.queryAll();
    this.queryFjtp();
    this.queryFjtpxx();
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

/* 修改图片信息选择图片按钮 */
.choose-btn {
  display: flex;
  margin-left: 5.3rem;
}

/* 修改图片信息展示的html片段 */
.update-html {
  display: flex;
  margin-left: 5.3rem;
}
</style>
