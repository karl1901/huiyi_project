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

// 首页判断一些话所属的行数转换
Vue.filter('isMessagekey', function(value) {
  if (value == 'yxh') {
    return '第一行';
  }
  if (value == 'yxh01') {
    return '第二行';
  }
  if (value == 'yxh02') {
    return '第三行';
  }
  if (value == 'yxh03') {
    return '第四行';
  }
  if (value == 'yxh04') {
    return '第五行';
  }
});

// 联系我们联系信息所属分类类别转换
Vue.filter('isCallMessagekey', function(value) {
  if (value == 'name') {
    return '名称';
  }
  if (value == 'address') {
    return '地址';
  }
  if (value == 'chuanzhen') {
    return '传真';
  }
  if (value == 'phone') {
    return '电话';
  }
});
