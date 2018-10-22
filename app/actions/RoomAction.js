'use strict';

import * as types from '../constant'
import { server_path } from '../config/config'
import { isLoading, isError, httpRequest, combindParams } from './HttpAction'

//获取用户信息
export function getUserInfo() {
    return dispatch => {
        let request = new Request(
            server_path + '/user/info', {
            headers: ({'Token': global.token}),
        });
        dispatch(httpRequest(request,getUserInfoSuccess));
    }
}
//顾问目标
export function getAdvisorTarget(params) {
    return dispatch => {
        let request = new Request(
            server_path + '/advisor/target', {
            headers: ({'Token': global.token}),
        });
        dispatch(httpRequest(request,getAdvisorTargetSuccess));
    }
}
//服务费列表
export function getServiceList(params) {
    return dispatch => {
        let request = new Request(
            combindParams(server_path + '/advisor/commissions',params), {
            headers: ({'Token': global.token}),
        });
        console.info(request)
        dispatch(httpRequest(request,getServiceListSuccess));
    }
}

function getUserInfoSuccess(userInfo) {
    return {
        type: types.GOT_USERINFO,
        userInfo: userInfo,
    }
}

function getServiceListSuccess(serviceList) {
    return {
        type: types.GOT_SERVICELIST,
        serviceList: serviceList,
    }
}

function getAdvisorTargetSuccess(target) {
    return {
        type: types.GOT_ADVISORTARGET,
        target: target,
    }
}
