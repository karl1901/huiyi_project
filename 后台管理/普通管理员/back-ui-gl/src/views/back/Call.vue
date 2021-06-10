<template>
  <div class="main" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="title">联系我们管理</div>
    <div class="rt">
      <div><el-button type="primary" size="medium" plain icon="el-icon-back" @click="rtindex">返回</el-button></div>
    </div>

    <!-- 数据表格部分 -->
    <el-tabs type="card">
      <!-- 联系信息管理 -->
      <el-tab-pane label="联系信息">
        <span slot="label"><i class="el-icon-phone"></i> 联系信息</span>
        <div class="classhd">联系信息</div>

        <div class="query-btn">
          <div>
            <el-button type="success" size="medium" icon="el-icon-plus" @click="openTjyxh">添加</el-button>
          </div>
          <div>
            <el-button type="primary" size="medium" icon="el-icon-refresh-right" round @click="queryNewyxh">刷新</el-button>
          </div>
        </div>
        <div>
          <el-table :data="yxhlist" stripe v-loading="yxhloading" height="410">
            <!-- <el-table-column label="信息分组" prop="messageGroup"></el-table-column> -->
            <el-table-column label="所属分类" prop="messageKey">
              <template slot-scope="scope">
                {{ scope.row.messageKey | isCallMessagekey }}
              </template>
            </el-table-column>
            <el-table-column label="内容">
              <template slot-scope="scope">
                <span v-html="scope.row.message"></span>
              </template>
            </el-table-column>
            <el-table-column label="最后修改时间" sortable prop="lastupdate">
              <template slot-scope="scope">
                {{ scope.row.lastupdate | formatDate }}
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="socpe">
                <!-- <el-button type="success" plain icon="el-icon-search" @click="ckyxh(socpe.row)">查看</el-button> -->
                <el-button type="primary" size="medium" plain icon="el-icon-edit" @click="showupdateyxh(socpe.row)">编辑</el-button>
                <el-button type="danger" size="medium" plain icon="el-icon-delete" @click="delyxh(socpe.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <page :page="yxhPage" @page-change="queryYxh" class="pg" v-loading="yxhloading"></page>
        </div>
      </el-tab-pane>
      <!-- 页面设计人员 -->
      <el-tab-pane label="页面设计人员">
        <span slot="label"><i class="el-icon-user"></i> 页面设计人员</span>
        <div>
          <el-tabs :tab-position="(tabPosition = 'left')" style="height: 640px;">
            <!-- 设计人员信息 -->
            <el-tab-pane label="设计人员信息">
              <span slot="label"><i class="el-icon-postcard"></i> 人员信息</span>
              <div class="classhd">页面设计人员信息</div>

              <div class="query-btn">
                <div>
                  <el-button type="success" size="medium" icon="el-icon-plus" @click="openaddfjtpxx = true">添加</el-button>
                </div>
                <div>
                  <el-button type="primary" size="medium" icon="el-icon-refresh-right" round @click="queryNewfjtpxx">刷新</el-button>
                </div>
              </div>
              <div>
                <el-table :data="fjtpxxlist" stripe v-loading="fjtpxxloading" height="420">
                  <!-- <el-table-column label="信息分组" prop="messageGroup"></el-table-column>
            <el-table-column label="信息关键词" prop="messageKey"></el-table-column> -->
                  <el-table-column label="二维码">
                    <template slot-scope="socpe">
                      <el-tooltip content="点击查看图片" placement="right" effect="light">
                        <img :src="getUrl(socpe.row)" alt="" height="55px" width="90px" @click="ckimg(socpe.row)" />
                      </el-tooltip>
                    </template>
                  </el-table-column>
                  <el-table-column label="人员信息">
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
            <!-- 二维码管理 -->
            <el-tab-pane label="二维码">
              <span slot="label"><i class="el-icon-picture"></i> 二维码</span>
              <div class="classhd">二维码</div>

              <div class="query-btn">
                <div>
                  <el-button type="success" size="medium" icon="el-icon-plus" @click="openaddfjtp = true">添加</el-button>
                </div>
                <div>
                  <el-button type="primary" size="medium" icon="el-icon-refresh-right" round @click="queryNewfjtp">刷新</el-button>
                </div>
              </div>
              <div>
                <el-table :data="fjtplist" stripe v-loading="fjtploading" height="420">
                  <!-- <el-table-column label="文件编号" prop="fid"></el-table-column>
            <el-table-column label="文件名称" prop="filename"></el-table-column> -->
                  <el-table-column label="文件描述" prop="fileinfo"></el-table-column>
                  <el-table-column label="二维码图片">
                    <template slot-scope="scope">
                      <el-tooltip content="点击查看图片" placement="right" effect="light">
                        <img :src="scope.row.fid | fileurl" alt="" height="75px" width="110px" @click="showfjtp(scope.row)" />
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
                      <el-button type="success" size="medium" plain icon="el-icon-search" v-if="isImage(socpe.row)" @click="showfjtp(socpe.row)">预览</el-button>
                      <el-button type="primary" size="medium" plain icon="el-icon-download" @click="downloadfjtp(socpe.row)"></el-button>
                      <el-button type="danger" size="medium" plain icon="el-icon-delete" @click="delfjtp(socpe.row)"></el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <page :page="fjtpPage" @page-change="queryFjtp" v-loading="fjtploading" class="pg"></page>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 添加联系信息的对话框 -->
    <div>
      <el-dialog :visible.sync="openaddyxh" :close-on-click-modal="false" title="添加联系信息">
        <el-form>
          <!-- <el-form-item label="信息分组：">
            <el-input v-model="addInfoyxh.messageGroup" placeholder="信息分组"></el-input>
          </el-form-item> -->
          <el-form-item label="所属分类：">
            <!-- {{ addInfoyxh.messageKey }} -->
            <el-select size="medium" v-model="addInfoyxh.messageKey" clearable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
            <!-- <el-input v-model="addInfoyxh.messageKey" placeholder="信息关键词" clearable></el-input> -->
          </el-form-item>
          <el-form-item label="内容：">
            <div class="add-message">
              <el-button type="primary" size="medium" plain @click="Visibleadd01 = true">添加内容</el-button>
            </div>
            <!-- <el-input v-model="addInfoyxh.message" placeholder="信息内容" type="textarea" autosize></el-input> -->
            <div class="bj-message">
              <span v-html="addInfoyxh.message"></span>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="success" size="medium" @click="addyxh">添加</el-button>
            <el-button @click="resetaddyxh" size="medium">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 添加联系信息内容的对话框 -->
    <div>
      <el-dialog title="添加内容编辑框" :close-on-click-modal="false" :visible.sync="Visibleadd01">
        <div>
          <my-editor :upmessage.sync="addInfoyxh.message" @data-change="editorChange02"></my-editor>
        </div>
        <div>
          <el-button type="primary" size="medium" @click="Visibleadd01 = false">确定</el-button>
          <el-button size="medium" @click="editorqx01">取消</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 修改联系信息的对话框 -->
    <div>
      <el-dialog :visible.sync="openupdateyxh" :close-on-click-modal="false" title="编辑联系信息">
        <div>
          <el-form>
            <!-- <el-form-item label="信息分组：">
              <el-input v-model="updateInfoyxh.messageGroup" placeholder="信息分组" clearable></el-input>
            </el-form-item>
            <el-form-item label="信息关键词：">
              <el-input v-model="updateInfoyxh.messageKey" placeholder="信息关键词" clearable></el-input>
            </el-form-item> -->
            <el-form-item label="所属分类：">
              {{ updateInfoyxh.messageKey | isCallMessagekey }}
            </el-form-item>
            <el-form-item label="信息内容：">
              <el-button type="primary" size="medium" plain @click="Visibleupdate01 = true">编辑内容</el-button>
              <!-- <el-input v-model="updateInfoyxh.message" placeholder="信息内容" type="textarea" autosize></el-input> -->
              <div class="bj-message">
                <span v-html="updateInfoyxh.message"></span>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="success" size="medium" @click="updateyxh">保存</el-button>
              <el-button size="medium" @click="openupdateyxh = false">关闭</el-button>
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
          <el-button type="primary" size="medium" @click="Visibleupdate01 = false">确定</el-button>
          <el-button size="medium" @click="Visibleupdate01 = false">取消</el-button>
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

    <!-- 添加人员信息的对话框 -->
    <div>
      <el-dialog :visible.sync="openaddfjtpxx" :close-on-click-modal="false" title="添加二维码信息">
        <el-form>
          <!-- <el-form-item label="信息分组：">
            <el-input v-model="addInfofjtpxx.messageGroup" placeholder="信息分组"></el-input>
          </el-form-item> -->
          <el-form-item label="二维码：">
            <!-- <el-input v-model="addInfofjtpxx.messageKey" placeholder="信息关键词" clearable></el-input>
          </el-form-item>
          <el-form-item label="选择文件："> -->
            <div v-if="addInfofjtpxx.messageKey != ''">
              <img :src="addInfofjtpxx.messageKey | fileurl" width="190px" height="130px" alt="" />
            </div>
            <div class="bj-ewmImg">
              <el-button type="info" size="medium" plain @click="fileVisible03 = true">选择图片</el-button>
            </div>
          </el-form-item>
          <el-form-item label="内容描述：">
            <el-button type="primary" size="medium" plain @click="Visibleadd = true">添加内容</el-button>
            <!-- <el-input v-model="addInfofjtpxx.message" placeholder="信息内容" type="textarea" autosize clearable></el-input> -->
            <div class="bj-message">
              <span v-html="addInfofjtpxx.message"></span>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="success" size="medium" @click="addfjtpxx">添加</el-button>
            <el-button size="medium" @click="resetaddfjtpxx">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 浏览文件选择文件的对话框 -->
    <div>
      <el-dialog top="3rem" :close-on-click-modal="false" :visible.sync="fileVisible03" title="文件选择对话框">
        <div>
          <file-ewm-choose @file-selected="fileSelected01"></file-ewm-choose>
        </div>
      </el-dialog>
    </div>

    <!-- 添加人员信息内容的对话框 -->
    <div>
      <el-dialog title="添加内容编辑框" :close-on-click-modal="false" :visible.sync="Visibleadd">
        <div>
          <my-editor :upmessage.sync="addInfofjtpxx.message" @data-change="editorChange"></my-editor>
        </div>
        <div>
          <el-button type="primary" size="medium" @click="Visibleadd = false">确定</el-button>
          <el-button size="medium" @click="editorqx">取消</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 修改人员信息的对话框 -->
    <div>
      <el-dialog :visible.sync="openupdatefjtpxx" :close-on-click-modal="false" title="编辑设计人员信息">
        <div>
          <el-form>
            <!-- <el-form-item label="信息分组：">
              <el-input v-model="updateInfofjtpxx.messageGroup" placeholder="信息分组" clearable></el-input>
            </el-form-item> -->
            <el-form-item label="二维码：">
              <!-- <el-input v-model="updateInfofjtpxx.messageKey" placeholder="信息关键词" type="textarea" autosize clearable></el-input>
            </el-form-item>
            <el-form-item label="选择文件："> -->
              <div>
                <img :src="updateInfofjtpxx.messageKey | fileurl" width="190px" height="130px" alt="" />
              </div>
              <div class="bj-ewmImg">
                <el-button size="medium" type="info" plain @click="fileVisible04 = true">选择图片</el-button>
              </div>
            </el-form-item>
            <el-form-item label="信息内容：">
              <!-- <br /> -->
              <!-- <my-editor :upmessage.sync="updateInfofjtpxx.message" @data-change="editorChange01"></my-editor> -->
              <el-button size="medium" type="primary" plain @click="Visibleupdate = true">编辑内容</el-button>
              <!-- <el-input v-model="updateInfofjtpxx.message" placeholder="信息内容" type="textarea" autosize clearable></el-input> -->
              <div class="bj-message">
                <span v-html="updateInfofjtpxx.message"></span>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button size="medium" type="success" @click="updatefjtpxx">保存</el-button>
              <el-button size="medium" @click="openupdatefjtpxx = false">关闭</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>

    <!-- 浏览文件选择文件的对话框 -->
    <div>
      <el-dialog top="3rem" :close-on-click-modal="false" :visible.sync="fileVisible04" title="文件选择对话框">
        <div>
          <file-ewm-choose @file-selected="fileSelected02"></file-ewm-choose>
        </div>
      </el-dialog>
    </div>

    <!-- 编辑人员信息内容的对话框 -->
    <div>
      <el-dialog title="编辑内容编辑框" :close-on-click-modal="false" :visible.sync="Visibleupdate">
        <div>
          <my-editor :upmessage.sync="updateInfofjtpxx.message" @data-change="editorChange01"></my-editor>
        </div>
        <div>
          <el-button size="medium" type="primary" @click="Visibleupdate = false">确定</el-button>
          <el-button size="medium" @click="Visibleupdate = false">取消</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 查看人员信息的对话框 -->
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
      <el-dialog top="0rem" title="图片预览" :visible.sync="ckfjtp01">
        <div class="show-img">
          <img :src="imgUrl02" alt="" />
        </div>
      </el-dialog>
    </div>

    <!-- 添加人员图片的对话框 -->
    <div>
      <el-dialog :visible.sync="openaddfjtp" :close-on-click-modal="false" title="添加二维码图片">
        <el-form>
          <el-form-item label="文件描述：">
            <br />
            <div>例如：<span style="color: #1E90FF;">二维码01/二维码02....</span></div>
            <el-input v-model="addInfofjtp.fileinfo" placeholder="文件描述："></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="medium" @click="openFile">选择文件...</el-button>
            <span v-if="file">&nbsp;{{ file.name }}</span>
            <br />
            <span style="color:	#FFA500;">提示：文件大小不能超过2M！</span>
          </el-form-item>
          <el-form-item>
            <el-button size="medium" type="success" @click="addfjtp">添加</el-button>
            <el-button size="medium" @click="resetaddfjtp">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 预览人员图片的对话框 -->
    <div>
      <el-dialog top="0rem" title="二维码图片预览" :visible.sync="ckfjtp">
        <div class="show-img">
          <img :src="imgUrl" alt="" />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Page from '../../components/Page';
import FileEwmChoose from '../../components/FileEwmChoose.vue';
import MyEditor from '../../components/MyEditor';
import tools from '../../js/tools';
export default {
  name: 'Call',
  components: { Page, FileEwmChoose, MyEditor },
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
      // 添加联系信息选择的分类
      options: [
        {
          value: 'name',
          label: '名称'
        },
        {
          value: 'address',
          label: '地址'
        },
        {
          value: 'chuanzhen',
          label: '传真'
        },
        {
          value: 'phone',
          label: '电话'
        }
      ],
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
      Visibleupdate: false,
      // 二维码图片
      fjtplist: [],
      fjtploading: false,
      fjtpPage: {
        pageSize: 4,
        pageNumber: 1
      },
      queryInfofjtp: {
        fileinfo: '二维码',
        filename: '',
        contentType: ''
      },
      openaddfjtp: false,
      file: null,
      addInfofjtp: {
        fileinfo: '二维码'
      },
      imgUrl: '',
      ckfjtp: false
    };
  },
  methods: {
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
    // 查看二维码图片的方法
    showfjtp(file) {
      this.ckfjtp = true;
      this.imgUrl = this.$getDownloadUrl(file.fid);
    },
    // 下载二维码图片的方法
    downloadfjtp(info) {
      window.open(this.$getDownloadUrl(info.fid));
    },
    // 重置二维码图片添加表单的方法
    resetaddfjtp() {
      this.addInfofjtp = {
        fileinfo: '二维码'
      };
      this.file = null;
    },
    // 获取二维码图片的文件的方法
    openFile() {
      let app = this;
      tools.openFile(function(file) {
        app.file = file;
      });
    },
    // 添加二维码图片的方法
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
    // 刷新二维码图片页面的方法
    queryNewfjtp() {
      this.fjtpPage = {
        pageSize: 4,
        pageNumber: 1
      };
      this.queryFjtp();
    },
    // 查询二维码图片的方法
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
      this.$confirm('是否删除此项人员信息?', '提示', {
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
          message: '必须选择一个图片!',
          type: 'warning'
        });
        return;
      }
      if (this.addInfofjtpxx.message == '') {
        this.$message({
          message: '内容不能为空!',
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
      // this.resetaddyxh();
      this.addInfoyxh.message = '';
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
    // 转化联系信息关键词的方法
    isCallMessagekey(value) {
      if (value == 'name') {
        return '名称';
      }
      if (value == 'address') {
        return '地址';
      }
      if (value == 'chuanzhen') {
        return '传真';
      }
      if (value == 'phone') {
        return '电话';
      }
    },
    // 删除联系信息的方法
    delyxh(info) {
      this.$confirm('是否删除：“' + this.isCallMessagekey(info.messageKey) + ' ”分类及其内容?', '提示', {
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
          message: '必须选择所属分类!',
          type: 'warning'
        });
        return;
      }
      if (this.addInfoyxh.message == '') {
        this.$message({
          message: '内容必须填写!',
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
    // 打开添加联系信息对话框的方法
    openTjyxh() {
      if (this.yxhPage.total == 4) {
        this.$message({
          message: '分类已加满，无法添加!',
          type: 'warning'
        });
        return;
      }
      this.openaddyxh = true;
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
    this.queryFjtp();
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
  background-image: url('../../imgs/3.jpg');
  background-size: cover;
  padding: 2.5rem;
  /* border-bottom: 3px solid rgba(58, 56, 56, 0.575); */
}

.rt {
  display: flex;
  position: fixed;
  right: 0px;
  z-index: 2;
  padding: 0.1rem 2rem;
  /* padding: 0.2rem 4rem 0.2rem 0rem; */
  /* border-top: 3px solid rgba(255, 255, 255, 0.575); */
  border: none;
}

/* .rt > div {
  width: 100%;
  display: flex;
  justify-content: flex-end;
} */

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

/* 添加、编辑联系信息、编辑设计人员信息，显示的html样式 */
.bj-message {
  display: flex;
  margin-left: 5.3rem;
}

/* 添加联系信息按钮样式 */
.add-message {
  display: flex;
  margin-left: 5.2rem;
}

/* 编辑设计人员信息选择图片的按钮样式 */
.bj-ewmImg {
  display: flex;
  margin-left: 5.2rem;
}
</style>
