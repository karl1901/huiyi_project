<template>
  <div class="main">
    <!-- 登录表单 -->
    <div class="forms">
      <el-card v-loading="loading">
        <el-form :model="formdata" :rules="rules">
          <div class="title">回<img src="../../public/huiyilogo.png" alt="" width="30px" />网站</div>
          <div>
            <el-form-item prop="tbUser.username">
              <el-input v-model="formdata.tbUser.username" @keyup.enter.native="login()" suffix-icon="el-icon-user" placeholder="用户名"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="tbUser.password">
              <el-input type="password" v-model="formdata.tbUser.password" @keyup.enter.native="login()" suffix-icon="el-icon-lock" placeholder="密码" show-password></el-input>
            </el-form-item>
          </div>
          <div class="imgsrcs">
            <el-form-item prop="imgcode" v-loading="imgloading">
              <el-input v-model="formdata.imgcode" placeholder="图片校验码" @keyup.enter.native="login()"></el-input>
            </el-form-item>
            <el-form-item>
              <img :src="imgsrc" alt="" title="点击更换图片" @click="changeImg" />
            </el-form-item>
          </div>
          <div>
            <div>
              <el-button type="primary" plain @click="login">登录</el-button>
            </div>
            <div>
              <el-button type="danger" plain @click="loadkong">重填</el-button>
            </div>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loading: '',
      imgloading: '',
      imgsrc: '',
      formdata: {
        imgcode: '',
        tbUser: {
          username: '',
          password: ''
        }
      },
      rules: {
        imgcode: [
          {
            required: true,
            message: '图片验证码必须填写'
          },
          {
            len: 5,
            message: '图片验证码的长度必须是5'
          }
        ],
        'tbUser.username': [
          {
            required: true,
            message: '用户名必须填写'
          },
          {
            min: 3,
            max: 15,
            message: '用户名的长度必须是3-15'
          }
        ],
        'tbUser.password': [
          {
            required: true,
            message: '密码必须填写'
          },
          {
            min: 3,
            max: 15,
            message: '密码的长度必须是3-15'
          }
        ]
      }
    };
  },
  methods: {
    // 重填
    loadkong() {
      this.formdata.tbUser = {
        username: '',
        password: ''
      };
      this.formdata.imgcode = '';
      this.$ajax(
        '/tools/imageCode ',
        {},
        function(data) {
          this.imgloading = false;
          this.imgsrc = data.message;
        },
        'get'
      );
    },
    // 登录
    login() {
      if (this.formdata.tbUser.username == '') {
        this.$message({
          message: '用户名不能为空！',
          type: 'warning'
        });
        return;
      }
      if (this.formdata.tbUser.password == '') {
        this.$message({
          message: '密码不能为空！',
          type: 'warning'
        });
        return;
      }
      if (this.formdata.imgcode == '') {
        this.$message({
          message: '验证码必须填写！',
          type: 'warning'
        });
        return;
      }
      this.loading = true;
      this.formdata.tbUser.password = this.$md5(this.formdata.tbUser.password);
      this.$ajax(
        '/user/login',
        {
          imgcode: this.formdata.imgcode,
          tbUser: this.formdata.tbUser
        },
        function(data) {
          this.loading = false;
          this.formdata.tbUser.password = '';
          this.formdata.imgcode = '';
          if (data.success) {
            this.$router.push('/back/backindex');
          } else {
            this.changeImg();
            this.$message({
              message: data.message,
              type: 'error',
              showClose: true
            });
          }
        }
      );
    },
    // 验证码
    changeImg() {
      this.imgLoading = true;
      this.$ajax(
        '/tools/imageCode ',
        {},
        function(data) {
          this.imgLoading = false;
          this.imgsrc = data.message;
        },
        'get'
      );
    }
  },
  created() {
    this.changeImg();
  }
};
</script>

<style scoped>
.main {
  position: fixed;
  background-image: url('../imgs/bg01.png');
  background-size: cover;
  top: 0px;
  left: 0px;
  min-height: 100vh;
  min-width: 100vw;
}

.forms {
  display: flex;
  justify-content: center;
  padding-top: 13%;
}

.forms div {
  display: flex;
  justify-content: center;
  margin: 0.5rem;
}

.title {
  font-size: 1.3rem;
}

.el-card {
  background: rgba(255, 255, 255, 0.103);
  width: 350px;
}

.imgsrcs {
  width: 100%;
  padding-left: 1.3rem;
}

.imgsrcs img {
  width: 90%;
  height: 90%;
}
</style>
