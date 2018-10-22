'use strict';

import * as types from '../constant'
import { server_path } from '../config/config'
import { isLoading, isError, httpRequest, combindParams } from './HttpAction'

//获取区域结构
export function getAreaTree() {
    return dispatch => {
        dispatch(isLoading());
        let request = new Request(
        server_path + '/area/tree', {
            headers: ({'Token': global.token}),
        });
        dispatch(httpRequest(request,getAreaTreeSuccess));
    }
}
//获取客户列表
export function getCustomerList(params) {
    return dispatch => {
        dispatch(isLoading());
        let request = new Request(
        combindParams(server_path + '/customer/list',params), {
            headers: ({'Token': global.token}),
        });
        dispatch(httpRequest(request,getCustomerListSuccess));
    }
}
//添加客户
export function addCustomer(params) {
    return dispatch => {
        dispatch(isLoading());
        let request = new Request(
            server_path + '/customer/add', {
            method: 'POST',
            headers: ({'Token': global.token}),
            body: JSON.stringify({
                ...params
            }),
        });
        dispatch(httpRequest(request,addCustomerSuccess));
    }
}
//修改客户
export function modifyCustomer(params) {
    return dispatch => {
        dispatch(isLoading());
        let request = new Request(
            server_path + '/customer/modify', {
            method: 'POST',
            headers: ({'Token': global.token}),
            body: JSON.stringify({
                ...params
            }),
        });
        dispatch(httpRequest(request,modifyCustomerSuccess));
    }
}
//获取客户详情
export function getCustomerDetail(params) {
    return dispatch => {
        dispatch(isLoading());
        let request = new Request(
            combindParams(server_path + '/customer/detail',params), {
            headers: ({'Token': global.token}),
        });
        dispatch(httpRequest(request,getCustomerSuccess));
    }
}
//添加沟通记录
export function addCommunicate(params) {
    return dispatch => {
        dispatch(isLoading());
        let request = new Request(
            server_path + '/customer/communicate', {
            method: 'POST',
            headers: ({'Token': global.token}),
            body: JSON.stringify({
                ...params
            }),
        });
        dispatch(httpRequest(request,addCommunicateSuccess));
    }
}
function getAreaTreeSuccess(list) {
    return {
        type: types.GOT_AREATREELIST,
        list: list,
    }
}
function getCustomerListSuccess(list) {
    return {
        type: types.GOT_CUSTOMERSLIST,
        list: list,
    }
}
function addCustomerSuccess() {
    return {
        type: types.ADD_CUSTOMER,
    }
}
function modifyCustomerSuccess() {
    return {
        type: types.MODIFY_CUSTOMER,
    }
}
function getCustomerSuccess(detail) {
    return {
        type: types.GOT_CUSTOMERDETAIL,
        detail: detail,
    }
}
function addCommunicateSuccess() {
    return {
        type: types.ADD_COMMUNICATE,
    }
}