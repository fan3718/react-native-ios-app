'use strict';

import * as types from '../constant'
import { server_path } from '../config/config'
import { isLoading, isError, httpRequest, combindParams } from './HttpAction'

//获取产品类别
export function getProductsCate() {
    return dispatch => {
      let request = new Request(
        server_path + '/product/list', {
        headers: ({'Token': global.token}),
      });
      dispatch(httpRequest(request,getProductsCateSuccess));
    }
  }

//获取产品列表
export function getProductsList(params) {
  return dispatch => {
    let request = new Request(
      combindParams(server_path + '/product/list',params), {
      headers: ({'Token': global.token}),
    });
    dispatch(httpRequest(request,getProductsListSuccess));
  }
}
//获取产品详情
export function getProductsDetail(params) {
  return dispatch => {
    let request = new Request(
      combindParams(server_path + '/product/detail',params), {
      headers: ({'Token': global.token}),
    });
    dispatch(httpRequest(request,getProductsDetailSuccess));
  }
}
//产品募集账号
export function getProductsAccount(params) {
  return dispatch => {
    let request = new Request(
      combindParams(server_path + '/product/account',params), {
      headers: ({'Token': global.token}),
    });
    dispatch(httpRequest(request,getProductsAccountSuccess));
  }
}
//提交预约
export function submitProductOrder(params) {
  return dispatch => {
    let request = new Request(
      server_path + '/product/order', {
      method: 'POST',
      headers: ({'Token': global.token}),
      body: JSON.stringify({
        ...params
      }),
    });
    dispatch(httpRequest(request,submitProductOrderSuccess));
  }
}

function getProductsCateSuccess(list) {
    return {
      type: types.GOT_PRODUCTCATE,
      list: list,
    }
}
function getProductsListSuccess(list) {
    return {
      type: types.GOT_PRODUCTSLIST,
      list: list,
    }
}
function getProductsDetailSuccess(detail) {
  return {
    type: types.GOT_PRODUCTSDETAIL,
    detail: detail,
  }
}
function getProductsAccountSuccess(account) {
  return {
    type: types.GOT_PRODUCTSACCOUT,
    account: account,
  }
}
function submitProductOrderSuccess(order) {
  return {
    type: types.SUBMIT_PRODUCTSORDER,
    order: order,
  }
}
