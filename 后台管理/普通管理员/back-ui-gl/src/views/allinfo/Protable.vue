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
          <el-button size="medium" @click="queryYxh" icon="el-icon-search" type="primary" round>查询</el-button>
        </div>
        <div>
          <el-button size="medium" type="success" icon="el-icon-plus" @click="openaddyxh = true">添加</el-button>
        </div>
        <div>
          <el-button size="medium" type="warning" icon="el-icon-refresh-right" round @click="queryNewyxh">刷新</el-button>
        </div>
        <div>
          <el-button size="medium" @click="backindex" type="primary" icon="el-icon-back" round>返回</el-button>
        </div>
      </div>
      <div>
        <el-table :data="yxhlist" stripe v-loading="yxhloading" height="552">
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
              <el-button type="success" size="medium" plain icon="el-icon-search" @click="ckyxh(socpe.row)">查看</el-button>
              <el-button type="primary" size="medium" plain icon="el-icon-edit" @click="showupdateyxh(socpe.row)">编辑</el-button>
              <el-button type="danger" size="medium" plain icon="el-icon-delete" @click="delyxh(socpe.row)"></el-button>
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
            <el-input v-model="addInfoyxh.messageGroup" placeholder="信息分组" clearable=""></el-input>
          </el-form-item>
          <el-form-item label="信息关键字：">
            <el-input v-model="addInfoyxh.messageKey" placeholder="信息关键词" clearable></el-input>
          </el-form-item>
          <el-form-item label="内容描述：">
            <el-select v-model="type" size="medium">
              <el-option v-for="t in types" :key="t.key" :value="t.key" :label="t.info"></el-option>
            </el-select>
            <div v-if="type == 'text'" style="display: flex;margin: 1rem 5.1rem;">
              <el-input v-model="addInfoyxh.message" placeholder="信息内容" type="textarea" :autosize="{ minRows: 4, maxRows: 4 }"></el-input>
            </div>
            <div v-else-if="type == 'editor'" style="display: flex;margin: 1rem 5.3rem;">
              <el-button size="medium" type="primary" plain @click="Visibleadd = true">添加信息内容</el-button>
              <i class="el-icon-check icons" v-if="Visivleicon01"></i>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button size="medium" type="success" @click="addyxh">添加</el-button>
            <el-button size="medium" @click="resetaddyxh">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 添加内容的对话框 -->
    <div>
      <el-dialog title="添加信息内容对话框" :close-on-click-modal="false" :visible.sync="Visibleadd">
        <div>
          <my-editor :upmessage.sync="addInfoyxh.message" @data-change="editorChange"></my-editor>
        </div>
        <div>
          <el-button size="medium" type="primary" @click="(Visibleadd = false), (Visivleicon01 = true)">确定</el-button>
          <el-button size="medium" @click="Visibleadd = false">取消</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 修改门户信息的对话框 -->
    <div>
      <el-dialog :visible.sync="openupdateyxh" :close-on-click-modal="false" title="修改门户信息">
        <div>
          <el-form>
            <el-form-item label="信息分组：">
              <el-input v-model="updateInfoyxh.messageGroup" placeholder="信息分组" clearable></el-input>
            </el-form-item>
            <el-form-item label="信息关键词：">
              <el-input v-model="updateInfoyxh.messageKey" placeholder="信息关键词" clearable></el-input>
            </el-form-item>
            <el-form-item label="信息内容：">
              <el-select v-model="type" size="medium">
                <el-option v-for="t in types" :key="t.key" :value="t.key" :label="t.info"></el-option>
              </el-select>
              <div v-if="type == 'text'" style="display: flex;margin: 1rem 5.1rem;">
                <el-input v-model="updateInfoyxh.message" placeholder="信息内容" type="textarea" :autosize="{ minRows: 4, maxRows: 4 }"></el-input>
              </div>
              <div v-else-if="type == 'editor'" style="display: flex;margin: 1rem 5.3rem;">
                <el-button size="medium" type="primary" plain @click="Visibleupdate = true">编辑信息内容</el-button>
                <i class="el-icon-check icons" v-if="Visivleicon"></i>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button size="medium" type="success" @click="updateyxh">保存</el-button>
              <el-button size="medium" @click="openupdateyxh = false">关闭</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>

    <!-- 编辑内容的对话框 -->
    <div>
      <el-dialog title="编辑内容对话框" :close-on-click-modal="false" :visible.sync="Visibleupdate">
        <div>
          <my-editor :upmessage.sync="updateInfoyxh.message" @data-change="editorChange01"></my-editor>
        </div>
        <div>
          <el-button size="medium" type="primary" @click="(Visibleupdate = false), (Visivleicon = true)">确定</el-button>
          <el-button size="medium" @click="Visibleupdate = false">取消</el-button>
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
import MyEditor from '../../components/MyEditor';
export default {
  components: { Page, MyEditor },
  name: 'Protable',
  data() {
    return {
      // 全局loading
      loading: false,
      yxhlist: [],
      yxhPage: {
        pageSize: 8,
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
      },
      // 编辑内容选项
      types: [
        {
          key: 'text',
          info: '文本输入框'
        },
        {
          key: 'editor',
          info: '富文本编辑器'
        }
      ],
      type: 'text',
      // 打开添加内容框的判定元素
      Visibleadd: false,
      // 添加内容确定显示图标判定元素
      Visivleicon01: false,
      // 打开编辑内容框的判定元素
      Visibleupdate: false,
      // 编辑内容确定显示图标判定元素
      Visivleicon: false
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
        pageSize: 8,
        pageNumber: 1
      };
      this.queryYxh();
    },
    // 获取富文本编辑器的内容给修改的内容
    editorChange01(info) {
      this.updateInfoyxh.message = info;
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
          this.type = 'text';
          this.Visivleicon = false;
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
      this.$confirm('是否删除门户信息：' + info.messageGroup + ' ?', '提示', {
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
    // 获取富文本编辑器的内容给添加的内容
    editorChange(info) {
      this.addInfoyxh.message = info;
    },
    // 重置门户信息添加表单的方法
    resetaddyxh() {
      this.addInfoyxh = {
        accessKey: this.$accessKey,
        messageGroup: '',
        messageKey: '',
        message: ''
      };
      // this.type = 'text';
      this.Visivleicon01 = false;
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
          this.type = 'text';
          this.Visivleicon01 = false;
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

/* .title {
  font-size: 1.6rem;
  text-align: center;
  font-weight: bold;
  color: rgb(255, 255, 255);
  background-image: url('https://th.bing.com/th/id/R5217d816ea5b7dba3fdbd113fe756ad1?rik=vQMr9zA76FEcKA&riu=http%3a%2f%2fwww.zlcool.com%2fd%2ffile%2f2011%2f12%2f26%2f7ada32f473314a771545dd5c334be7ed.jpg&ehk=Uavf0pLAhmZMBZQ85t5XN792LJQjrBIdVlAvBwRSmjw%3d&risl=&pid=ImgRaw');
  background-size: cover;
  padding: 1.5rem;
} */

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
  font-size: 1.6rem;
  font-weight: bold;
}

.query-btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  margin: 1rem 3rem 1rem 0rem;
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

/* 编辑内容旁边图标 */
.icons {
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0.7rem 0.7rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: rgb(21, 231, 21);
}
</style>
