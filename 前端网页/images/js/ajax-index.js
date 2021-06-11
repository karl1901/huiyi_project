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
        resultFjtpxx: {}
      };
    },
    methods: {
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
      }
      // 刷新页面查询一次信息
      queryFjtpxx();
    }
  });

  // 查询信息的方法
  function queryFjtpxx() {
    ajax.send(
      '/portable/message/queryAll',
      {
        page: { pageNumber: 1, pageSize: 100 },
        tbPortableMessage: {
          accessKey: ajax.getAccessKey(),
          messageGroup: 'imgfjtpxx'
        }
      },
      function (data) {
        // let result = ajax.converData(data.resultData.list);
        // app.resultFjtpxx = result;
        app.resultFjtpxx = data.resultData.list;
        // 当数据查出后就启用Swiper函数
        app.$nextTick(initSwiper);
      }
    );
  }
})();
