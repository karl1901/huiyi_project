<template>
  <div class="main" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <!-- 标题部分 -->
    <div class="title"> 首页管理</div>
    <!-- 返回按钮 -->
    <div class="rt">
      <div><el-button type="primary" plain @click="rtindex">返回</el-button></div>
    </div>

    <el-tabs type="border-card">
      <!-- 班级档案 -->
      <el-tab-pane label="班级档案">
        <div>
          <div class="classhd">班级活动</div>

          <div class="query-btn">
            <div>
              <el-input v-model="queryInfo.activeTime" placeholder="日期模糊查询"></el-input>
            </div>
            <div>
              <el-input v-model="queryInfo.activeTitle" placeholder=" 标题模糊查询"></el-input>
            </div>
            <div>
              <el-button type="primary" icon="el-icon-search" @click="queryActive">查询</el-button>
            </div>
            <div>
              <el-button type="success" icon="el-icon-plus" @click="openadd = true">添加</el-button>
            </div>
            <div>
              <el-button type="primary" icon="el-icon-refresh-right" round @click="queryNew">刷新</el-button>
            </div>
          </div>
          <div>
            <el-table :data="activelist" stripe v-loading="activeloading" height="401">
              <el-table-column label="日期" prop="activeTime" sortable>
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.activeTime }}</span>
                </template>
              </el-table-column>
              <el-table-column label="标题" prop="activeTitle"></el-table-column>
              <el-table-column label="最后修改时间" sortable prop="lastupdate">
                <template slot-scope="scope">
                  {{ scope.row.lastupdate | formatDate }}
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="socpe">
                  <el-button type="success" plain icon="el-icon-search" @click="ck(socpe.row)">查看</el-button>
                  <el-button type="primary" plain icon="el-icon-edit" @click="showupdate(socpe.row)">编辑</el-button>
                  <el-button type="danger" plain icon="el-icon-delete" @click="del(socpe.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <page :page="activePage" @page-change="queryActive" class="pg"></page>
          </div>
        </div>
      </el-tab-pane>
      <!-- 路上风景 -->

      <!-- 更新日志 -->

      <!-- 一些话 -->
    </el-tabs>

    <!-- 添加活动的对话框 -->
    <div>
      <el-dialog :visible.sync="openadd" :close-on-click-modal="false" title="添加活动">
        <el-form>
          <el-form-item>
            日期：
            <el-date-picker v-model="addInfo.activeTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-input v-model="addInfo.activeTitle" placeholder="标题" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="addInfo.activeInfo" placeholder="内容描述" type="textarea" autosize clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="add">添加</el-button>
            <el-button @click="resetadd">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 修改活动的对话框 -->
    <div>
      <el-dialog :visible.sync="openupdate" :close-on-click-modal="false" title="修改活动">
        <div>
          <el-form>
            <el-form-item>
              日期：
              <el-date-picker v-model="updateInfo.activeTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-input v-model="updateInfo.activeTitle" placeholder="标题" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="updateInfo.activeInfo" placeholder="描述" type="textarea" autosize clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="update">保存</el-button>
              <el-button @click="openupdate = false">关闭</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>

    <!-- 查看活动的对话框 -->
    <div>
      <el-dialog :visible.sync="openck" :close-on-click-modal="false" title="查看活动"> </el-dialog>
    </div>
  </div>
</template>

<script>
import Page from '../../components/Page';
export default {
  components: { Page },
  name: 'Index',
  data() {
    return {
      loading: false,
      activeloading: false,
      queryInfo: {
        accessKey: this.$accessKey,
        paid: -1,
        activeTime: '',
        activeTitle: ''
      },
      activelist: [],
      activePage: {
        pageSize: 5,
        pageNumber: 1
      },
      addInfo: {
        accessKey: this.$accessKey,
        activeInfo: '',
        activeTime: '',
        activeTitle: ''
      },
      openadd: false,
      openck: false,
      openupdate: false,
      updateInfo: {}
    };
  },
  methods: {
    queryNew() {
      this.queryInfo = {
        accessKey: this.$accessKey,
        activeTime: '',
        activeTitle: ''
      };
      this.queryActive();
    },
    showupdate(info) {
      this.openupdate = true;
      this.updateInfo = JSON.parse(JSON.stringify(info));
    },
    update() {
      this.$ajax(
        '/portable/active/update',
        {
          tbPortableActive: this.updateInfo
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
          this.openupdate = false;
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success'
          });
          this.queryActive();
        }
      );
      this.queryActive();
    },
    del(info) {
      this.$confirm('是否删除此活动?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$ajax(
            '/portable/active/delete',
            {
              tbPortableActive: {
                accessKey: this.$accessKey,
                paid: info.paid
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
              this.queryActive();
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
    ck(info) {
      this.openck = true;
      console.log(info.paid);
    },
    resetadd() {
      this.addInfo = {
        activeInfo: '',
        activeTime: '',
        activeTitle: ''
      };
    },
    add() {
      if (this.addInfo.activeTime == '') {
        this.$message({
          message: '日期必须填写!',
          type: 'warning'
        });

        return;
      }
      if (this.addInfo.activeTitle == '') {
        this.$message({
          message: '标题必须填写!',
          type: 'warning'
        });
        return;
      }
      if (this.addInfo.activeInfo == '') {
        this.$message({
          message: '内容描述必须填写!',
          type: 'warning'
        });
        return;
      }
      this.$ajax(
        '/portable/active/add',
        {
          tbPortableActive: this.addInfo
        },
        function(data) {
          if (!data.success) {
            this.$notify.error({
              title: '失败',
              message: '添加失败',
              type: 'success'
            });
            return;
          }
          this.openadd = false;
          this.$notify({
            title: '成功',
            message: '添加成功',
            type: 'success'
          });
          this.addInfo = {
            accessKey: this.$accessKey,
            activeInfo: '',
            activeTime: '',
            activeTitle: ''
          };
          this.queryActive();
        }
      );
    },
    queryActive() {
      this.$ajax(
        '/portable/active/queryAll',
        {
          tbPortableActive: this.queryInfo,
          page: this.activePage
        },
        function(data) {
          // console.log(data);
          if (!data.success) {
            this.$message.error(data.message);
            return;
          }
          this.activelist = data.resultData.list;
          this.activePage = data.resultData.page;
        }
      );
      this.activeloading = true;
      setTimeout(() => {
        this.activeloading = false;
      }, 200);
    },
    queryAll() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 200);
    },
    rtindex() {
      this.$router.push('/back/backindex');
    }
  },
  created() {
    this.queryAll();
    this.queryActive();
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
</style>
