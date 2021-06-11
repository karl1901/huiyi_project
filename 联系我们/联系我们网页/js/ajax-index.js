(function () {
  let app;

  new Vue({
    el: '#app',
    data() {
      return {
        // 服务器请求结果
        data: {},
        // title: '风景图片',
        imgcode: '',
        tbUser: {
          username: '',
          password: ''
        },
        // 图片src信息
        imgSrc: '',
        loginUser: ajax.loadUser(),
        images: [],
        // 二维码信息
        resultEwm: {},
        // 联系信息
        resultCallinfo: {}
      };
    },
    methods: {
      // 获取页面人员跳转地址的方法
      geturls(info) {
        // console.log(info);
        // 声明判断的字符串
        let strhtml = '前';
        let strback = '后';
        let strps = '设计';
        // 判断是否属于的分类
        if (info.indexOf(strhtml) > 0) {
          return (
            window.open('../xyx/index.html', 'one'),
            window.open('../xyj/index.html', 'two'),
            window.open('../yc/index.html', 'three')
          );
        } else if (info.indexOf(strback) > 0) {
          return (
            window.open('../kxh/index.html', 'one'),
            window.open('../lyh/index.html', 'two')
          );
        } else if (info.indexOf(strps) > 0) {
          // 在当前页面打开
          // location.href = '../zfx/index.html'
          // 在新页面打开
          return window.open('../zfx/index.html');
        } else {
          return null; //  都不符合就返回为空
        }
      },
      // 更换验证码的方法
      changeImg() {
        ajax.send(
          '/tools/imageCode ',
          {},
          function (data) {
            app.imgSrc = data.message;
          },
          'get'
        );
      },
      // 登录的方法
      login() {
        app.tbUser.password = SparkMD5.hash(app.tbUser.password);
        ajax.send(
          '/user/login',
          {
            imgcode: app.imgcode,
            tbUser: app.tbUser
          },
          function (data) {
            app.tbUser.password = '';
            app.changeImg();
            // 如果登陆成功就保存用户信息
            if (data.success) {
              app.loginUser = data.resultData.tbUser;
              ajax.saveUser(app.loginUser);
              app.queryFjtpxx();
              app.queryFjtpxx01();
            }
            app.data = data;
          }
        );
      },
      // 获取图片url的方法
      getImg(fid) {
        return ajax.getFileUrl(fid);
      }
    },
    created() {
      app = this;
      // 刷新页面刷新验证码
      app.changeImg();
      // 如果登录成功了就查询一次信息
      if (app.loginUser) {
        queryFjtpxx();
        queryFjtpxx01();
      }
      // 刷新页面查询一次信息
      queryFjtpxx();
      queryFjtpxx01();
    }
  });

  // 查询联系信息的方法
  function queryFjtpxx01() {
    ajax.send(
      '/portable/message/queryAll',
      {
        page: { pageNumber: 1, pageSize: 100 },
        tbPortableMessage: {
          accessKey: ajax.getAccessKey(),
          messageGroup: 'callinfo'
        }
      },
      function (data) {
        // let result = ajax.converData(data.resultData.list);
        // app.resultEwm = result;
        app.resultCallinfo = ajax.converData(data.resultData.list);
      }
    );
  }

  // 查询二维码信息的方法
  function queryFjtpxx() {
    ajax.send(
      '/portable/message/queryAll',
      {
        page: { pageNumber: 1, pageSize: 100 },
        tbPortableMessage: {
          accessKey: ajax.getAccessKey(),
          messageGroup: 'callewm'
        }
      },
      function (data) {
        // let result = ajax.converData(data.resultData.list);
        // app.resultEwm = result;
        app.resultEwm = data.resultData.list;
      }
    );
  }
})();
