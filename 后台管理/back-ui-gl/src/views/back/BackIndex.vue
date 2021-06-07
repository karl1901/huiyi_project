<template>
  <div class="main" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <!-- 标题部分 -->

    <div class="title" v-if="ifus(userinfo)">回忆主题网站-后台管理首页</div>
    <!-- 用户管理部分 -->
    <div class="usr">
      <div class="usname" v-if="ifus(userinfo)">欢迎管理员<i class="el-icon-user-solid">：</i></div>
      <div class="usname" v-if="!ifus(userinfo)">欢迎：</div>
      <el-dropdown split-button @command="handMenu">
        <span>{{ userinfo.nickname }}</span>
        <el-dropdown-menu>
          <el-dropdown-item command="pwd">修改密码</el-dropdown-item>
          <el-dropdown-item command="exit">安全退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 修改密码表单部分 -->
    <el-dialog title="修改登录密码" :visible.sync="pwdVisible" :close-on-click-modal="false">
      <div>
        <el-form>
          <el-form-item label="密码：">
            <el-input type="password" v-model="pwd" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：">
            <el-input type="password" v-model="pwd2" placeholder="确认密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="success" @click="modifyPwd">保存修改</el-button>
            <el-button @click="pwdVisible = false">关闭</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!-- 页面管理跳转按钮部分 -->
    <div class="btn" v-if="ifus(userinfo)">
      <div>
        <el-button type="primary" icon="el-icon-s-home" plain @click="ToIndex">首页</el-button>
      </div>
      <div>
        <el-button type="primary" icon="el-icon-picture-outline" plain @click="ToImg">更多图片展示</el-button>
      </div>
      <div>
        <el-button type="primary" icon="el-icon-phone-outline" plain @click="ToCall">联系我们</el-button>
      </div>
    </div>

    <!-- 开启高级管理功能按钮 -->
    <div v-if="ifus(userinfo)" class="srk">
      <div>
        <div>高级管理功能：</div>
        <div>
          <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </div>
      </div>
    </div>

    <!-- 高级管理功能项 -->
    <div class="btn01" v-if="glpassword == glpwd || value == true">
      <div>
        <el-button type="primary" icon="el-icon-folder" plain @click="ToFile">文件信息管理</el-button>
      </div>
      <div>
        <el-button type="primary" icon="el-icon-s-custom" plain @click="ToMh">门户信息管理</el-button>
      </div>
    </div>

    <!-- 普通用户登录提示字样部分 -->
    <div class="no-btn" v-if="!ifus(userinfo)">抱歉，您不是管理员！无权管理后台</div>
  </div>
</template>

<script>
export default {
  name: 'BackIndex',
  data() {
    return {
      userinfo: {},
      loading: false,
      pwd: '',
      pwd2: '',
      pwdVisible: false,
      gl: 'huiyi1901',
      glpassword: '',
      glpwd: 'huiyi1901',
      value: false
    };
  },
  methods: {
    // 判断是否为管理员用户
    ifus(userinfo) {
      if (userinfo.username == this.gl) {
        return true;
      }
      return false;
    },
    // 跳转门户信息管理界面
    ToMh() {
      this.$router.push('/allinfo/protable');
    },
    // 跳转文件管理界面
    ToFile() {
      this.$router.push('/allinfo/file');
    },
    // 跳转主页管理界面
    ToIndex() {
      this.$router.push('/back/index');
    },
    // 跳转联系我们管理
    ToCall() {
      this.$router.push('/back/call');
    },
    // 跳转更多图片展示管理
    ToImg() {
      this.$router.push('/back/img');
    },
    // 登录的方法
    modifyPwd() {
      if (this.pwd.trim() == '') {
        // this.$message.error('密码必须填写')
        this.$message({ message: '密码必须填写', type: 'error' });
        return;
      }
      if (this.pwd != this.pwd2) {
        this.$message({ message: '密码不一致', type: 'error' });
        return;
      }
      this.loading = true;
      this.pwd = this.$md5(this.pwd);
      this.$ajax(
        '/user/modifyPwd',
        {
          'tbUser.password': this.pwd
        },
        function(data) {
          this.loading = false;
          if (data.success) {
            this.$message(data.message);
            this.pwd = '';
            this.pwd2 = '';
          } else {
            this.$message.error(data.message);
          }
        }
      );
    },
    // 安全退出
    logout() {
      this.loading = true;
      this.$ajax('/usr/logout', {}, function() {
        this.loading = false;
        this.$router.push('../');
      });
    },
    // 用户操作：安全退出、修改密码
    handMenu(command) {
      console.log(command);
      if (command == 'exit') {
        this.logout();
      } else if (command == 'pwd') {
        this.pwdVisible = true;
      }
    },
    // 查询用户信息
    queryUserInfo() {
      this.loading = true;
      this.$ajax('/user/queryUserInfo', {}, function(data) {
        setTimeout(() => {
          this.loading = false;
        }, 100);
        if (!data.resultData.tbUser || !data.resultData.tbUser.username) {
          this.$router.push('../');
          return;
        }
        this.userinfo = data.resultData.tbUser;
      });
    }
  },
  created() {
    this.queryUserInfo();
  }
};
</script>

<style>
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

.usr {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  background: rgb(238, 240, 241);
  border-top: 3px solid rgba(58, 56, 56, 0.575);
}

.btn {
  display: flex;
  justify-content: center;
  padding: 5rem 5rem 2rem 5rem;
}

.btn > div {
  padding: 1.5rem;
}

.btn01 {
  display: flex;
  justify-content: center;
}

.btn01 > div {
  padding: 1.5rem;
}

.usname {
  display: flex;
  min-height: 100%;
  align-items: center;
  margin-right: 1rem;
}

.no-btn {
  display: flex;
  justify-content: center;
  font-size: 2rem;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-weight: bold;
  margin-top: 12rem;
  color: red;
}

.srk {
  display: flex;
  justify-content: center;
}

.srk > div {
  display: flex;
  color: rgb(0, 0, 0);
  font-size: 1.1rem;
}
</style>
