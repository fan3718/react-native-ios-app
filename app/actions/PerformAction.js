'use strict';

import * as types from '../constant'
import { server_path } from '../config/config'
import { isLoading, isError, httpRequest, combindParams } from './HttpAction'

//获取公司业绩
export function getPerform() {
    return dispatch => {
        dispatch(isLoading());
        let request = new Request(
        server_path + '/target/view', {
            headers: ({'Token': global.token}),
        });
        dispatch(httpRequest(request,getPerformSuccess));
    }
}
//获取公司业绩详情
export function getPerformList(params) {
    return dispatch => {
        dispatch(isLoading());
        let request = new Request(
        combindParams(server_path + '/target/list',params), {
            headers: ({'Token': global.token}),
        });
        dispatch(httpRequest(request,getPerformListSuccess));
    }
}
//获取理财顾问列表
export function getAdvisorList() {
    return dispatch => {
        dispatch(isLoading());
        let request = new Request(
        server_path + '/advisor/list', {
            headers: ({'Token': global.token}),
        });
        dispatch(httpRequest(request,getAdvisorListSuccess));
    }
}
//获取理财顾问详情
export function getAdvisorDetail(params) {
    return dispatch => {
        dispatch(isLoading());
        let request = new Request(
        combindParams(server_path + '/advisor/detail',params), {
            headers: ({'Token': global.token}),
        });
        dispatch(httpRequest(request,getAdvisorDetailSuccess));
    }
}
function getPerformSuccess(data) {
    return {
        type: types.GOT_PERFORM,
        data: data,
    }
}
function getPerformListSuccess(data) {
    return {
        type: types.GOT_PERFORMLIST,
        data: data,
    }
}
function getAdvisorListSuccess(data) {
    return {
        type: types.GOT_ADVISORLIST,
        data: data,
    }
}
function getAdvisorDetailSuccess(data) {
    return {
        type: types.GOT_ADVISORDETAIL,
        data: data,
    }
}