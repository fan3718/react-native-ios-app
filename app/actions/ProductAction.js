'use strict';

import * as types from '../constant'
import { server_path } from '../config/config'
import { isLoading, isError, httpRequest } from './HttpAction'

//获取产品类别
export function getProductsCate(params) {
    return dispatch => {
      let request = new Request(
        server_path + '/product/list', {
        method: 'GET',
        headers: ({'Token': params}),
      });
      dispatch(httpRequest(request,getProductsCateSuccess));
    }
  }

//获取产品列表
export function getProductsList(params) {
  return dispatch => {
    let request = new Request(
      server_path + '/product/list', {
      method: 'GET',
      headers: ({'Token': params.token}),
      data: JSON.stringify({
        page: params.page, // [可选] 当前页
        limit: params.limit, // [可选] 每页条数
        categoryId: params.id, // [可选] 分类id
      }),
    });
    dispatch(httpRequest(request,getProductsListSuccess));
  }
}
//获取产品详情
export function getProductsDetail(params) {
  return dispatch => {
    let request = new Request(
      server_path + '/product/detail', {
      method: 'GET',
      headers: ({'Token': params.token}),
      data: JSON.stringify({
        id: params.id,
      }),
    });
    dispatch(httpRequest(request,getProductsDetailSuccess));
  }
}
//产品募集账号
export function getProductsAccount(params) {
  return dispatch => {
    let request = new Request(
      server_path + '/product/account', {
      method: 'GET',
      headers: ({'Token': params.token}),
      data: JSON.stringify({
        id: params.id,
      }),
    });
    dispatch(httpRequest(request,getProductsAccountSuccess));
  }
}

//产品募集账号
export function submitProductOrder(params) {
  return dispatch => {
    let request = new Request(
      server_path + '/product/order', {
      method: 'POST',
      headers: ({'Token': params.token}),
      data: JSON.stringify({
        productId: params.id, // 产品id
        reservationAmount: params.amount, // 预约购买金额
        reservationDate: params.date, // 预约时间
        memo: params.memo, // 备注
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
