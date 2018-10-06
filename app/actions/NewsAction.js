'use strict';

import * as types from '../constant'
import { server_path } from '../config/config'
import { isLoading, isError, httpRequest } from './HttpAction'

//获取资讯列表
export function getNewsList(params) {
  return dispatch => {
    dispatch(isLoading());
    let request = new Request(
      server_path + '/info/list', {
      method: 'GET',
      headers: ({'Token': params.token}),
      data: JSON.stringify({
        page: params.page, // [可选] 当前页
        limit: params.limit, // [可选] 每页条数
      }),
    });
    dispatch(httpRequest(request,getNewsListSuccess));
  }
}
//获取资讯详情
export function getNewsDetail(params) {
  return dispatch => {
    dispatch(isLoading());
    let request = new Request(
      server_path + '/info/detail', {
      method: 'GET',
      headers: ({'Token': params.token}),
      data: JSON.stringify({
        id: params.id,
      }),
    });
    dispatch(httpRequest(request,getNewsDetailSuccess));
  }
}

function getNewsListSuccess(list) {
    return {
      type: types.GOT_NEWSLIST,
      list: list,
    }
}
function getNewsDetailSuccess(detail) {
  return {
    type: types.GOT_NEWSDETAIL,
    detail: detail,
  }
}