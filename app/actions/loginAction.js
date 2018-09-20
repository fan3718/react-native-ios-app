'use strict';

import * as types from '../constant'
import { server_path } from '../config/config'

//获取用户协议
export function getAgreement() {
  return dispatch => {
    dispatch(isLoading());
    fetch(server_path + '/login/agreement',{
      method: 'GET',
    }).then((res)=>{
      let data = JSON.parse(res._bodyInit);
      if(data['errorCode'] === 0) {
        dispatch(getAgreementSuccess(data['data']));
      }else{
        dispatch(isError(data['msg']));
      }
    }).catch((e)=>{
      dispatch(isError(e));
    })
  }
}
//获取手机验证码
export function getVcode(mobile) {
  return dispatch => {
    
    let phoneReg = /^1[3|4|5|7|8]\d{9}$/;
    if(!phoneReg.test(mobile)) {
      dispatch(isError('请正确输入手机号码'));
    }
      // dispatch(isLoading());
      // fetch(server_path + '/sendVcode',{
      //   method: 'POST',
      //   body: JSON.stringify({
      //     mobile: mobile,
      //   })
      // }).then((res)=>{
      //   if(res._bodyInit && res._bodyInit.indexOf('errorCode') === -1) {
      //     dispatch(getVcodeSuccess(user));
      //   }else{
      //     dispatch(isError("失败"));
      //   }
      // }).catch((e)=>{
      //   dispatch(isError(e));
      // })
  }
}
//获取token
export function getToken() {
  return dispatch => {
    dispatch(isLoading());
      fetch(server_path + '/login/vcode',{
        method: 'POST',
        body: JSON.stringify({
          mobile: '',
          vcode: '',
          vcodeid: '',
          type: 0,//app 0;小程序 1
        })
      }).then((res)=>{
        console.info(res);
        if(res._bodyInit && res._bodyInit.indexOf('errorCode') === -1) {
          dispatch(getTokenSuccess(res));
        }else{
          dispatch(isError("失败"));
        }
      }).catch((e)=>{
        dispatch(isError(e));
      })
  }
}
//获取用户信息
export function getUserInfo() {
  return dispatch => {
    dispatch(isLoading());
      // 用户登录
      fetch(server_path + '/user/info',{
        method: 'GET',
        hearders: {
          token: ''
        }
      }).then((res)=>{
        console.info(res);
        if(res._bodyInit && res._bodyInit.indexOf('errorCode') === -1) {
          dispatch(loginSuccess(res));
        }else{
          dispatch(isError('失败'));
        }
      }).catch((e)=>{
        dispatch(isError(e));
      })
  }
}

function isLoading() {
  return {
    type: types.IS_LOADING
  }
}

function getAgreementSuccess(agreement) {
  return {
    type: types.GOT_AGREEMENT,
    agreement: agreement,
  }
}

function getVcodeSuccess(vcodeId) {
  return {
    type: types.LOGIN_IN_DONE,
    vcodeId: vcodeId,
  }
}

function getTokenSuccess(token) {
  return {
    type: types.LOGIN_IN_DONE,
    token: token,
  }
}


function loginSuccess(user) {
  return {
    type: types.LOGIN_IN_DONE,
    user: user,
  }
}

function isError(alert) {
  return {
    type: types.IS_ERROR,
    alert: alert,
  }
}
