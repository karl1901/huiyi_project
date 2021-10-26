(function () {
  const server = {
    tokenKey: 'local-token-key',
    saveToken: function (data) {
      if (data && data.token) {
        localStorage.setItem(server.tokenKey, data.token);
      }
    },
    loadToken: function () {
      return localStorage.getItem(server.tokenKey);
    },
    baseUrl: 'https://huhuiyu.top/teach-demo-service'
  };

  const ajax = {
    converData01(data) {
      // 服务器的结果是数组，转化为自己想要的格式
      let result = {};
      for (let i = 0; i < data.length; i++) {
        let m = data[i];
        result[i] = m.paid;
      }
      return result;
    },

    converData(data) {
      // 服务器的结果是数组，转化为自己想要的格式
      let result = {};
      for (let i = 0; i < data.length; i++) {
        let m = data[i];
        result[m.messageKey] = m.message;
      }
      return result;
    },

    getAccessKey() {
      return 'b3a682c2-463c-4400-954c-b7447555a313';
    },
    send: function (url, params, cb, method) {
      url = server.baseUrl + url;
      method = method ? method : 'post';
      let promise = axios({
        url: url,
        data: Qs.stringify(params, { allowDots: true }),
        method: method,
        headers: {
          token: server.loadToken()
        }
      });
      promise
        .then(function (resp) {
          server.saveToken(resp.data);
          cb(resp.data);
        })
        .catch(function (error) {
          // console.error(error);
          cb({ code: 500, success: false, message: '请求失败' });
        });
    },
    saveUser: function (user) {
      sessionStorage.setItem('local-user-info', JSON.stringify(user));
    },
    loadUser() {
      let user = sessionStorage.getItem('local-user-info');
      if (user) {
        return JSON.parse(user);
      }
      return null;
    },
    getFileUrl(fid) {
      return (
        server.baseUrl +
        '/file/download?tbFile.fid=' +
        fid +
        '&request_token=' +
        server.loadToken()
      );
    },
    // 如果vue存在就编写过滤器功能
    if(Vue) {
      Vue.filter('fileurl', function (value) {
        let url = server.baseUrl + '/file/download?';
        url = url + 'tbFile.fid=' + value;
        url = url + '&request_token=' + server.loadToken();
        return url;
      });
    }
  };

  window.ajax = ajax;
})();
