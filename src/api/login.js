import request from '@/utils/request';
import md5 from 'js-md5';

export function loginByUsername(username, password, randomCode, loginlocal) {
  const data = new FormData();
  data.append('loginname', username);
  data.append('password', md5(password));
  data.append('loginlocal', 'zh_CN');
  data.append('randomCode', randomCode);
  // const data = {
  //   loginname: username,
  //   password: md5(password),
  //   randomCode,
  //   loginlocal
  // };
  return request({
    url: '/user/login',
    method: 'post',
    data
  });
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  });
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}

