'use strict';

import * as types from '../constant'
import { server_path } from '../config/config'
import { isLoading, isError, httpRequest, combindParams } from './HttpAction'

//获取待办列表
export function getRemindsList(params) {
    return dispatch => {
        dispatch(isLoading());
        let request = new Request(
            combindParams(server_path + '/remind/list',params), {
            headers: ({'Token': global.token}),
        });
        dispatch(httpRequest(request,getRemindsListSuccess));
    }
}
//获取待办详情
export function getRemindDetail(params) {
  return dispatch => {
        dispatch(isLoading());
        let request = new Request(
            combindParams(server_path + '/remind/detail',params), {
            headers: ({'Token': global.token}),
        });
        dispatch(httpRequest(request,getRemindDetailSuccess));
  }
}
//添加待办
export function addRemind(params) {
    return dispatch => {
        if(!params.reminderType) {
            dispatch(isError({msg:'请选择提醒类型',errorCode: 2}));
            return false;
        }else if(!params.customerName) {
            dispatch(isError({msg:'请选择客户',errorCode: 2}));
            return false;
        }else if(!params.reminderDate) {
            dispatch(isError({msg:'请选择提醒时间',errorCode: 2}));
            return false;
        }else if(!params.seq) {
            dispatch(isError({msg:'请选择事项等级',errorCode: 2}));
            return false;
        }else if(!params.memo) {
            dispatch(isError({msg:'备注信息不能为空',errorCode: 2}));
            return false;
        }
        if(params.reminderDate) {
            let curTime = new Date();
            //把字符串格式转化为日期类
            let remindTime = new Date(params.reminderDate);
            if(curTime > remindTime) {
                dispatch(isError({msg:'提醒时间不能小于当前时间',errorCode: 2}));
                return false;
            }
        }
        dispatch(isLoading());
        let request = new Request(
            server_path + '/remind/add', {
            method: 'POST',
            headers: ({'Token': global.token}),
            body: JSON.stringify({
                reminderType: params.reminderType, // 提醒类型
                customerName: params.customerName, // 客户姓名
                reminderDate: params.reminderDate, 
                seq: params.seq, // 事项等级
                memo: params.memo, // 备注信息
            }),
        });
        dispatch(httpRequest(request,addRemindSuccess,{successAlert:'事项添加成功'}));
    }
}
//修改待办
export function modifyRemind(params) {
    return dispatch => {
        if(params.reminderDate) {
            let curTime = new Date();
            //把字符串格式转化为日期类
            let remindTime = new Date(params.reminderDate);
            if(curTime > remindTime) {
                dispatch(isError({msg:'提醒时间不能小于当前时间',errorCode: 2}));
                return false;
            }
        }
        if(!params.memo) {
            dispatch(isError({msg:'备注信息不能为空',errorCode: 2}));
            return false;
        }
        dispatch(isLoading());
        let request = new Request(
            server_path + '/remind/modify', {
            method: 'POST',
            headers: ({'Token': global.token}),
            body: JSON.stringify({
                id: params.id, // 事项id
                reminderType: params.reminderType, // 提醒类型
                customerName: params.customerName, // 客户姓名
                reminderDate: params.reminderDate, 
                seq: params.seq, // 事项等级
                memo: params.memo, // 备注信息
            }),
        });
        dispatch(httpRequest(request,modifyRemindSuccess,));
    }
}
//修改待办
export function deleteRemind(params) {
    return dispatch => {
        dispatch(isLoading());
        let request = new Request(
            server_path + '/remind/delete', {
            method: 'POST',
            headers: ({'Token': global.token}),
            body: JSON.stringify({
                id: params.id, 
            }),
        });
        dispatch(httpRequest(request,deleteRemindSuccess,));
    }
}
function getRemindsListSuccess(list) {
    return {
        type: types.GOT_REMINDSLIST,
        list: list,
    }
}
function getRemindDetailSuccess(detail) {
    return {
        type: types.GOT_REMINDDETAIL,
        detail: detail,
    }
}
function addRemindSuccess() {
    return {
        type: types.ADD_REMIND,
    }
}
function modifyRemindSuccess() {
    return {
        type: types.MODIFY_REMIND,
    }
}
function deleteRemindSuccess() {
    return {
        type: types.DELETE_REMIND,
    }
}