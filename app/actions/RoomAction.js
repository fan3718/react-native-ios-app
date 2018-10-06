'use strict';

import * as types from '../constant'
import { server_path } from '../config/config'
import { isLoading, isError, httpRequest } from './HttpAction'

//获取用户信息
export function getUserInfo(token) {
    return dispatch => {
        let request = new Request(
          server_path + '/user/info', {
          method: 'GET',
          headers: ({'Token': token}),
        });
        dispatch(httpRequest(request,getUserInfoSuccess));
    }
  }

  function getUserInfoSuccess(userInfo) {
    return {
      type: types.GOT_USERINFO,
      userInfo: userInfo,
    }
  }