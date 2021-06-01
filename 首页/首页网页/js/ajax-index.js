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
        resultActive: [],
        queryActive: {
          accessKey: ajax.getAccessKey(),
          activeTime: '',
          activeTitle: ''
        },
        resultFjbt: {},
        resultFjtpxx: {},
        resultYxh: {},
        resultHdimg: {},
        activetplist: [],
        hdimgpaid: ''
      };
    },
    methods: {
      // 查看活动图片的方法
      ckActiveimg(paid) {
        // console.log(paid);
        app.hdimgpaid = paid;
        queryActivetp();
      },
      // 更换图片验证码的方法
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
      // 用户登录的方法
      login() {
        if (app.tbUser.username == '') {
          alert('用户名不能为空！');
          return;
        }
        if (app.tbUser.password == '') {
          alert('密码不能为空！');
          return;
        }
        if (app.imgcode == '') {
          alert('图片验证码必须填写！');
          return;
        }
        app.tbUser.password = SparkMD5.hash(app.tbUser.password);
        ajax.send(
          '/user/login',
          {
            imgcode: app.imgcode,
            tbUser: app.tbUser
          },
          function (data) {
            app.tbUser.password = '';
            app.imgcode = '';
            app.changeImg();
            // 如果登陆成功就保存用户信息
            if (!data.success) {
              if (data.message != '请求失败') {
                alert(data.message);
                return;
              }
            }
            app.loginUser = data.resultData.tbUser;
            ajax.saveUser(app.loginUser);
            app.query();
            app.queryActive();
            app.queryFjbt();
            app.queryYxh();
            app.queryActivetp();
            app.data = data;
          }
        );
      },
      // 获取图片地址的方法
      getImg(fid) {
        return ajax.getFileUrl(fid);
      },
      // 查询图片的方法
      query() {
        ajax.send(
          '/file/query',
          {
            // 只显示第一页前四个
            page: { pageSize: 6, pageNumber: 1 },
            tbFile: {
              // 只查询图片
              contentType: 'image/',
              // 只查询风景图片的
              fileinfo: '风景图片'
            }
          },
          function (data) {
            // console.log(data);
            if (data.success) {
              app.images = data.resultData.list;
            }
          }
        );
      }
    },
    created() {
      app = this;
      // 刷新页面刷新验证码
      app.changeImg();
      // 如果登录成功就触发所有查询
      if (app.loginUser) {
        app.query();
        queryActive();
        queryFjbt();
        queryFjtpxx();
        queryYxh();
      }
      // 页面刷新触发所有查询
      queryActive();
      queryFjbt();
      queryFjtpxx();
      queryYxh();
      queryActivetp();
      // 回车绑定登录事件
      $(document).keypress(function (e) {
        if ((e.keyCode || e.which) == 13) {
          // 触发需要调用的方法
          $(app.login()).click();
        }
      });
    }
  });

  // 查询活动
  function queryActive() {
    ajax.send(
      '/portable/active/queryAll',
      {
        page: { pageNumber: 1, pageSize: 4 },
        tbPortableActive: app.queryActive
      },
      function (data) {
        // console.log(data.resultData.list);
        // let result = ajax.converData01(data.resultData.list);
        // console.log(result);
        app.resultActive = data.resultData.list;
        let result = ajax.converData01(data.resultData.list);
        // console.log(result);
        app.hdimgpaid = result[0];
        // console.log(app.activetplist01);
        queryActivetp();
      }
    );
  }

  // 查询活动信息
  function queryFjbt() {
    ajax.send(
      '/portable/message/queryAll',
      {
        page: { pageNumber: 1, pageSize: 100 },
        tbPortableMessage: {
          accessKey: ajax.getAccessKey(),
          messageGroup: 'indexfjbt'
        }
      },
      function (data) {
        let result = ajax.converData(data.resultData.list);
        app.resultFjbt = result;
      }
    );
  }

  // 查询活动图片
  function queryActivetp() {
    ajax.send(
      '/portable/active/imgaes/queryAllByPaid ',
      {
        tbPortableActiveImages: {
          accessKey: ajax.getAccessKey(),
          paid: app.hdimgpaid
        },
        page: { pageSize: 1, pageNumber: 1 }
      },
      function (data) {
        // console.log(app.hdimgpaid);
        // console.log(data.resultData.list);
        app.activetplist = data.resultData.list;
      }
    );
  }

  // 查询风景图片信息
  function queryFjtpxx() {
    ajax.send(
      '/portable/message/queryAll',
      {
        page: { pageNumber: 1, pageSize: 100 },
        tbPortableMessage: {
          accessKey: ajax.getAccessKey(),
          messageGroup: 'indexfjtpxx'
        }
      },
      function (data) {
        // let result = ajax.converData(data.resultData.list);
        // app.resultFjtpxx = result;
        app.resultFjtpxx = data.resultData.list;
      }
    );
  }

  // 查询一些话
  function queryYxh() {
    ajax.send(
      '/portable/message/queryAll',
      {
        page: { pageNumber: 1, pageSize: 100 },
        tbPortableMessage: {
          accessKey: ajax.getAccessKey(),
          messageGroup: 'indexyxh'
        }
      },
      function (data) {
        let result = ajax.converData(data.resultData.list);
        app.resultYxh = result;
      }
    );
  }
})();
