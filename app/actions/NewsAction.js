'use strict';

import * as types from '../constant'
import { server_path } from '../config/config'
import { isLoading, isError, httpRequest, combindParams } from './HttpAction'

//获取资讯列表
export function getNewsList(params) {
  return dispatch => {
    dispatch(isLoading());
    let request = new Request(
      combindParams(server_path + '/info/list',params), {
      method: 'GET',
      headers: ({'Token': global.token}),
    });
    dispatch(httpRequest(request,getNewsListSuccess));
  }
}
//获取资讯详情
export function getNewsDetail(params) {
  return dispatch => {
    dispatch(isLoading());
    let request = new Request(
      combindParams(server_path + '/info/detail',params), {
      method: 'GET',
      headers: ({'Token': global.token}),
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