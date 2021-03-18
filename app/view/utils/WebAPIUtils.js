'use strict'
import api from './api';
// 封装获取 cookie 的方法
function getCookie(name){
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
  return unescape(arr[2]);
  else
  return null;
}

function saveSetting(deskData, successCB, failCB) {
  return $.ajax({
    url: api.COMPANY + '/setting',
    method: 'POST',
    contentType: 'application/json',
    headers:{
      // 前后端不分离的情况加每次打开客户端，egg会直接在客户端的 Cookie 中写入密钥 ，
      //密钥的 Key 就是 'scrfToken' 这个字段，所以直接获取就好了
      'x-csrf-token': getCookie("csrfToken"), 
    },
    data: JSON.stringify({ data:deskData })
  }).then(successCB, failCB);
}

function getSetting(companyId, successCB, failCB) {
  let url = api.COMPANY+`/${companyId ? companyId : 'only_companyId'}/setting`;

  return $.ajax(url).then(successCB, failCB);
}

module.exports = {
  saveSetting,
  getSetting
}