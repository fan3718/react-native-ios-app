'use strict';

import * as types from '../constant'
import { server_path } from '../config/config'
import { isLoading, isError, httpRequest } from './HttpAction'

//获取用户协议
export function getAgreement() {
  return dispatch => {
    let request = new Request(
      server_path + '/login/agreement', {
      method: 'GET',
    });
    dispatch(httpRequest(request,getAgreementSuccess, "1231231"))
  }
}

//获取手机验证码
export function getVcode(mobile) {
  return dispatch => {
    
    let phoneReg = /^1[3|4|5|6|7|8]\d{9}$/;
    if(!phoneReg.test(mobile)) {
      dispatch(isError('请正确输入手机号码'));
    }
    let request = new Request(
      server_path + '/sendVcode', {
        method: 'POST',
        body: JSON.stringify({
          mobile: mobile,
        })
    });
    dispatch(httpRequest(request,getVcodeSuccess, mobile));
  }
}

//获取token
export function getToken(params) {
  console.info(params)
  return dispatch => {
    let request = new Request(
      server_path + '/login/vcode',{
      method: 'POST',
      body: JSON.stringify({
        mobile: params.mobile,
        vcode: params.vcode,
        vcodeid: params.vcodeId,
        type: 0,//app 0;小程序 1
      })
    });
    dispatch(httpRequest(request,getTokenSuccess));
  }
}

function getAgreementSuccess(agreement) {
  return {
    type: types.GOT_AGREEMENT,
    agreement: agreement,
  }
}

function getVcodeSuccess(data,...key) {
  return {
    type: types.GOT_VCODE,
    vcodeId: data["vcodeid"],
    mobile: key[0],
  }
}

function getTokenSuccess(data) {
  global.token = data["token"];
  return {
    type: types.GOT_TOKEN,
  }
}

