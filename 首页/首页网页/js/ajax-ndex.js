(function () {
  let app;

  new Vue({
    el: '#app',
    data() {
      return {
        // title: '个人相册',
        imgcode: '',
        tbUser: {
          username: '',
          password: ''
        },
        // 图片src信息
        imgSrc: '',
        loginUser: ajax.loadUser(),
        images: [],
        resultActive: {},
        queryActive: {
          accessKey: ajax.getAccessKey(),
          activeTime: '',
          activeTitle: ''
        },
        resultFjbt: {},
        resultFjtpxx: {},
        resultYxh: {}
      };
    },
    methods: {
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
              app.query();
              app.queryActive();
              app.queryFjbt();
            }
          }
        );
      },
      getImg(fid) {
        return ajax.getFileUrl(fid);
      },
      query() {
        ajax.send(
          '/file/query',
          {
            // 只显示第一页前四个
            page: { pageSize: 4, pageNumber: 1 },
            tbFile: {
              // 只查询图片
              contentType: 'image/',
              // 只查询风景图片的
              fileinfo: '相册'
            }
          },
          function (data) {
            console.log(data);
            if (data.success) {
              app.images = data.resultData.list;
            }
          }
        );
      }
    },
    created() {
      app = this;
      app.changeImg();
      if (app.loginUser) {
        app.query();
        queryActive();
        queryFjbt();
        queryFjtpxx();
        queryYxh();
      }
      queryActive();
      queryFjbt();
      queryFjtpxx();
      queryYxh();
    }
  });

  function queryActive() {
    ajax.send(
      '/portable/active/queryAll',
      {
        page: { pageNumber: 1, pageSize: 4 },
        tbPortableActive: app.queryActive
      },
      function (data) {
        console.log(data.resultData.list);
        let result = ajax.converData01(data.resultData.list);
        console.log(result);
        app.resultActive = result;
      }
    );
  }
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
        let result = ajax.converData(data.resultData.list);
        app.resultFjtpxx = result;
      }
    );
  }
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
