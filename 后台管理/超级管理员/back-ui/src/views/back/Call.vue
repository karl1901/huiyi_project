<template>
  <div class="main" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="title">联系页管理</div>
    <div class="rt">
      <div><el-button type="info" icon="el-icon-d-arrow-left" @click="rtindex">返回</el-button></div>
    </div>

    <!-- 数据表格部分 -->
    <el-tabs type="card">
      <!-- 联系信息管理 -->
      <el-tab-pane label="联系信息管理">
        <span slot="label"><i class="el-icon-phone"></i> 联系信息管理</span>
        <div class="classhd">联系信息管理</div>

        <div class="query-btn">
          <div>
            <el-button type="success" icon="el-icon-plus" @click="openaddyxh = true">添加</el-button>
          </div>
          <div>
            <el-button type="primary" icon="el-icon-refresh-right" round @click="queryNewyxh">刷新</el-button>
          </div>
        </div>
        <div>
          <el-table :data="yxhlist" stripe v-loading="yxhloading" height="380">
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
      </el-tab-pane>
      <!-- 二维码管理 -->
      <el-tab-pane label="二维码">
        <span slot="label"><i class="el-icon-s-grid"></i> 二维码管理</span>
        <div class="classhd">二维码管理</div>

        <div class="query-btn">
          <div>
            <el-button type="success" icon="el-icon-plus" @click="openaddfjtpxx = true">添加</el-button>
          </div>
          <div>
            <el-button type="primary" icon="el-icon-refresh-right" round @click="queryNewfjtpxx">刷新</el-button>
          </div>
        </div>
        <div>
          <el-table :data="fjtpxxlist" stripe v-loading="fjtpxxloading" height="370">
            <el-table-column label="信息分组" prop="messageGroup"></el-table-column>
            <el-table-column label="信息关键词" prop="messageKey"></el-table-column>
            <el-table-column label="对应的二维码">
              <template slot-scope="socpe">
                <el-tooltip content="点击查看图片" placement="right" effect="light">
                  <img :src="getUrl(socpe.row)" alt="" height="70px" width="90px" @click="ckimg(socpe.row)" />
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
                <el-button type="success" size="medium" plain icon="el-icon-search" @click="ckfjtpxx(socpe.row)">查看</el-button>
                <el-button type="primary" size="medium" plain icon="el-icon-edit" @click="showupdatefjtpxx(socpe.row)">编辑</el-button>
                <el-button type="danger" size="medium" plain icon="el-icon-delete" @click="delfjtpxx(socpe.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <page :page="fjtpxxPage" @page-change="queryFjtpxx" class="pg" v-loading="fjtpxxloading"></page>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 添加联系信息的对话框 -->
    <div>
      <el-dialog :visible.sync="openaddyxh" :close-on-click-modal="false" title="添加联系信息">
        <el-form>
          <el-form-item label="信息分组：">
            <el-input v-model="addInfoyxh.messageGroup" placeholder="信息分组"></el-input>
          </el-form-item>
          <el-form-item label="信息关键字：">
            <el-input v-model="addInfoyxh.messageKey" placeholder="信息关键词" clearable></el-input>
          </el-form-item>
          <el-form-item label="内容描述：">
            <el-button type="primary" plain @click="Visibleadd01 = true">添加内容</el-button>
            <el-input v-model="addInfoyxh.message" placeholder="信息内容" type="textarea" autosize></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="addyxh">添加</el-button>
            <el-button @click="resetaddyxh">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 添加联系信息内容的对话框 -->
    <div>
      <el-dialog title="添加内容编辑框" :close-on-click-modal="false" :visible.sync="Visibleadd01">
        <div>
          <my-editor @data-change="editorChange02"></my-editor>
        </div>
        <div>
          <el-button type="primary" @click="Visibleadd01 = false">确定</el-button>
          <el-button @click="editorqx01">取消</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 修改联系信息的对话框 -->
    <div>
      <el-dialog :visible.sync="openupdateyxh" :close-on-click-modal="false" title="修改联系信息">
        <div>
          <el-form>
            <el-form-item label="信息分组：">
              <el-input v-model="updateInfoyxh.messageGroup" placeholder="信息分组" clearable></el-input>
            </el-form-item>
            <el-form-item label="信息关键词：">
              <el-input v-model="updateInfoyxh.messageKey" placeholder="信息关键词" clearable></el-input>
            </el-form-item>
            <el-form-item label="信息内容：">
              <el-button type="primary" plain @click="Visibleupdate01 = true">编辑内容</el-button>
              <el-input v-model="updateInfoyxh.message" placeholder="信息内容" type="textarea" autosize></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="updateyxh">保存</el-button>
              <el-button @click="openupdateyxh = false">关闭</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>

    <!-- 编辑联系信息内容的对话框 -->
    <div>
      <el-dialog title="编辑内容编辑框" :close-on-click-modal="false" :visible.sync="Visibleupdate01">
        <div>
          <my-editor :upmessage.sync="updateInfoyxh.message" @data-change="editorChange03"></my-editor>
        </div>
        <div>
          <el-button type="primary" @click="Visibleupdate01 = false">确定</el-button>
          <el-button @click="Visibleupdate01 = false">取消</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 查看联系信息的对话框 -->
    <div>
      <el-dialog :visible.sync="openckyxh" :close-on-click-modal="false" title="查看联系信息">
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
              <spanl v-html="ckyxhlist.message"></spanl>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>

    <!-- 添加二维码信息的对话框 -->
    <div>
      <el-dialog :visible.sync="openaddfjtpxx" :close-on-click-modal="false" title="添加二维码信息">
        <el-form>
          <el-form-item label="信息分组：">
            <el-input v-model="addInfofjtpxx.messageGroup" placeholder="信息分组"></el-input>
          </el-form-item>
          <el-form-item label="信息关键字：">
            <el-input v-model="addInfofjtpxx.messageKey" placeholder="信息关键词" clearable></el-input>
          </el-form-item>
          <el-form-item label="选择文件：">
            <el-button type="info" plain @click="fileVisible03 = true">浏览文件</el-button>
          </el-form-item>
          <el-form-item label="内容描述：">
            <el-button type="primary" plain @click="Visibleadd = true">添加内容</el-button>
            <el-input v-model="addInfofjtpxx.message" placeholder="信息内容" type="textarea" autosize clearable></el-input>
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
          <file-choose @file-selected="fileSelected01"></file-choose>
        </div>
      </el-dialog>
    </div>

    <!-- 添加二维码信息内容的对话框 -->
    <div>
      <el-dialog title="添加内容编辑框" :close-on-click-modal="false" :visible.sync="Visibleadd">
        <div>
          <my-editor @data-change="editorChange"></my-editor>
        </div>
        <div>
          <el-button type="primary" @click="Visibleadd = false">确定</el-button>
          <el-button @click="editorqx">取消</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 修改二维码信息的对话框 -->
    <div>
      <el-dialog :visible.sync="openupdatefjtpxx" :close-on-click-modal="false" title="修改二维码信息">
        <div>
          <el-form>
            <el-form-item label="信息分组：">
              <el-input v-model="updateInfofjtpxx.messageGroup" placeholder="信息分组" clearable></el-input>
            </el-form-item>
            <el-form-item label="信息关键词：">
              <el-input v-model="updateInfofjtpxx.messageKey" placeholder="信息关键词" type="textarea" autosize clearable></el-input>
            </el-form-item>
            <el-form-item label="选择文件：">
              <el-button type="info" plain @click="fileVisible04 = true">浏览文件</el-button>
            </el-form-item>
            <el-form-item label="信息内容：">
              <!-- <br /> -->
              <!-- <my-editor :upmessage.sync="updateInfofjtpxx.message" @data-change="editorChange01"></my-editor> -->
              <el-button type="primary" plain @click="Visibleupdate = true">编辑内容</el-button>
              <el-input v-model="updateInfofjtpxx.message" placeholder="信息内容" type="textarea" autosize clearable></el-input>
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
          <file-choose @file-selected="fileSelected02"></file-choose>
        </div>
      </el-dialog>
    </div>

    <!-- 编辑二维码信息内容的对话框 -->
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

    <!-- 查看二维码信息的对话框 -->
    <div>
      <el-dialog :visible.sync="openckfjtpxx" :close-on-click-modal="false" title="查看二维码信息">
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
      <el-dialog top="0rem" title="查看图片" :visible.sync="ckfjtp01">
        <div class="show-img">
          <img :src="imgUrl02" alt="" />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Page from '../../components/Page';
import FileChoose from '../../components/FileChoose';
import MyEditor from '../../components/MyEditor';
export default {
  name: 'Call',
  components: { Page, FileChoose, MyEditor },
  data() {
    return {
      // 全局loading
      loading: false,
      // 联系信息
      yxhlist: [],
      yxhPage: {
        pageSize: 4,
        pageNumber: 1
      },
      yxhloading: false,
      openaddyxh: false,
      addInfoyxh: {
        accessKey: this.$accessKey,
        messageGroup: 'callinfo',
        messageKey: '',
        message: ''
      },
      openckyxh: false,
      ckyxhlist: {},
      openupdateyxh: false,
      updateInfoyxh: {},
      Visibleadd01: false,
      Visibleupdate01: false,
      // 二维码信息
      fjtpxxlist: [],
      fjtpxxPage: {
        pageSize: 4,
        pageNumber: 1
      },
      fjtpxxloading: false,
      openaddfjtpxx: false,
      addInfofjtpxx: {
        accessKey: this.$accessKey,
        messageGroup: 'callewm',
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
      this.resetaddfjtpxx();
    },
    // 获取富文本编辑器的内容给添加表单的方法
    editorChange(info) {
      this.addInfofjtpxx.message = info;
    },
    // 修改二维码信息选择文件的方法
    fileSelected02(file) {
      this.updateInfofjtpxx.messageKey = file.fid;
      this.fileVisible04 = false;
    },
    // 添加二维码信息选择文件的方法
    fileSelected01(file) {
      this.addInfofjtpxx.messageKey = file.fid;
      this.fileVisible03 = false;
    },
    // 刷新二维码信息页面的方法
    queryNewfjtpxx() {
      this.fjtpxxPage = {
        pageSize: 4,
        pageNumber: 1
      };
      this.queryFjtpxx();
    },
    // 获取二维码信息修改数据的方法
    showupdatefjtpxx(info) {
      this.openupdatefjtpxx = true;
      this.updateInfofjtpxx = JSON.parse(JSON.stringify(info));
    },
    // 修改二维码信息的方法
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
    // 删除二维码信息的方法
    delfjtpxx(info) {
      this.$confirm('是否删除此项二维码信息?', '提示', {
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
    // 查看二维码信息的方法
    ckfjtpxx(info) {
      this.openckfjtpxx = true;
      this.ckfjtpxxlist = JSON.parse(JSON.stringify(info));
    },
    // 重置二维码信息添加表单的方法
    resetaddfjtpxx() {
      this.addInfofjtpxx = {
        accessKey: this.$accessKey,
        messageGroup: 'callewm',
        messageKey: '',
        message: ''
      };
    },
    // 添加二维码信息的方法
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
          message: '信息关键词必须填写!',
          type: 'warning'
        });
        return;
      }
      if (this.addInfofjtpxx.message == '') {
        this.$message({
          message: '内容描述必须填写!',
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
            messageGroup: 'callewm',
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
    // 查询二维码信息的方法
    queryFjtpxx() {
      this.$ajax(
        '/portable/message/queryAll',
        {
          tbPortableMessage: {
            accessKey: this.$accessKey,
            messageGroup: 'callewm'
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
    // 获取富文本编辑器的内容给修改的内容
    editorChange03(info) {
      this.updateInfoyxh.message = info;
    },
    // 取消添加内容的方法
    editorqx01() {
      this.Visibleadd01 = false;
      this.resetaddyxh();
    },
    // 获取富文本编辑器的内容给添加表单的方法
    editorChange02(info) {
      this.addInfoyxh.message = info;
    },
    // 刷新联系信息页面的方法
    queryNewyxh() {
      this.yxhPage = {
        pageSize: 4,
        pageNumber: 1
      };
      this.queryYxh();
    },
    // 获取联系信息修改数据的方法
    showupdateyxh(info) {
      this.openupdateyxh = true;
      this.updateInfoyxh = JSON.parse(JSON.stringify(info));
    },
    // 修改联系信息的方法
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
              message: '修改失败',
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
    // 删除联系信息的方法
    delyxh(info) {
      this.$confirm('是否删除此项信息?', '提示', {
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
    // 查看联系信息的方法
    ckyxh(info) {
      this.openckyxh = true;
      this.ckyxhlist = JSON.parse(JSON.stringify(info));
    },
    // 重置联系信息添加表单的方法
    resetaddyxh() {
      this.addInfoyxh = {
        accessKey: this.$accessKey,
        messageGroup: 'callinfo',
        messageKey: '',
        message: ''
      };
    },
    // 添加联系信息的方法
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
            messageGroup: 'callinfo',
            messageKey: '',
            message: ''
          };
          this.queryYxh();
        }
      );
    },
    // 查询联系信息的方法
    queryYxh() {
      this.$ajax(
        '/portable/message/queryAll',
        {
          tbPortableMessage: {
            accessKey: this.$accessKey,
            messageGroup: 'callinfo'
          },
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
    // 联系页管理界面加载的方法
    queryAll() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 200);
    },
    // 返回的路由
    rtindex() {
      this.$router.push('/back/backindex');
    }
  },
  created() {
    this.queryAll();
    this.queryYxh();
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
</style>
