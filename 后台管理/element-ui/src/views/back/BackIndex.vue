<template>
  <div class="main" v-loading="loading">
    <div class="title">回忆主题网站后台管理</div>
    <div class="usr">
      <el-dropdown split-button @command="handMenu">
        <span>{{ userinfo.username }} ({{ userinfo.nickname }})</span>
        <el-dropdown-menu>
          <el-dropdown-item command="pwd">修改密码</el-dropdown-item>
          <el-dropdown-item command="exit">安全退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog title="修改登录密码" :visible.sync="pwdVisible" :close-on-click-modal="false">
      <div>
        <el-form>
          <el-form-item>
            <el-input type="password" v-model="pwd" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" v-model="pwd2" placeholder="确认密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="modifyPwd">修改密码</el-button>
            <el-button @click="pwdVisible = false">关闭</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <div class="btn">
      <div>
        <el-button type="primary" plain @click="ToIndex">首页管理</el-button>
      </div>
      <div>
        <el-button type="primary" plain @click="ToImg">图片展示页管理</el-button>
      </div>
      <div>
        <el-button type="primary" plain @click="ToCall">联系页管理</el-button>
      </div>
    </div>
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
      pwdVisible: false
    };
  },
  methods: {
    ToIndex() {
      this.$router.push('/back/index');
    },
    ToCall() {
      this.$router.push('/back/call');
    },
    ToImg() {
      this.$router.push('/back/img');
    },
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
          } else {
            this.$message.error(data.message);
          }
        }
      );
    },
    logout() {
      this.loading = true;
      this.$ajax('/usr/logout', {}, function() {
        this.loading = false;
        this.$router.push('../');
      });
    },
    handMenu(command) {
      console.log(command);
      if (command == 'exit') {
        this.logout();
      } else if (command == 'pwd') {
        this.pwdVisible = true;
      }
    },
    queryUserInfo() {
      this.loading = true;
      this.$ajax('/user/queryUserInfo', {}, function(data) {
        this.loading = false;
        if (!data.resultData.tbUser || !data.resultData.tbUser.username) {
          this.$router.push('/user/login');
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

<style scoped>
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
}

.btn {
  display: flex;
  justify-content: center;
  padding: 5rem;
}

.btn > div {
  padding: 1.5rem;
}
</style>
