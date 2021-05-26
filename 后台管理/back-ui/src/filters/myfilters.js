import Vue from 'vue';
import tools from '../js/tools';
import server from '../js/server';

// 日期格式化
Vue.filter('formatDate', function(value, format) {
  return value ? tools.formatDate(value, format) : '';
});

// 获取图片地址
Vue.filter('fileurl', function(value) {
  let url = server.baseUrl + '/file/download?';
  url = url + 'tbFile.fid=' + value;
  url = url + '&request_token=' + server.getToken();
  return url;
});
