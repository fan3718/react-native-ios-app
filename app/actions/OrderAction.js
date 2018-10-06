'use strict';

import * as types from '../constant'
import { server_path } from '../config/config'
import { isLoading, isError, httpRequest } from './HttpAction'

//获取预约列表
export function getOrderList(params) {
    return dispatch => {
        let request = new Request(
            server_path + '/order/list', {
            method: 'POST',
            headers: ({'Token': params.token}),
            body: JSON.stringify({
                status: params.status, // 状态 待受理2 已确认5  已拒绝1
                page: params.page, // [可选] 当前页
                limit: params.limit, // [可选] 每页条数
            })
        });
        dispatch(httpRequest(request, getOrderListSuccess));
    }
}
//获取预约详情
export function getOrderDetail(params) {
    return dispatch => {
        let request = new Request(
            server_path + '/order/detail', {
            method: 'POST',
            headers: ({'Token': params.token}),
            body: JSON.stringify({
                id: params.id,
            })
        });
        dispatch(httpRequest(request, getOrderDetailSuccess));
    }
}
//确认接受预约
export function acceptOrder(params) {
    return dispatch => {
        let request = new Request(
            server_path + '/order/accept', {
            method: 'POST',
            headers: ({'Token': params.token}),
            body: JSON.stringify({
                id: params.id,
            })
        });
        dispatch(httpRequest(request, acceptOrderSuccess));
    }
}
//发送反馈
export function sendFeedback(params) {
    return dispatch => {
        let request = new Request(
            server_path + '/order/accept', {
            method: 'POST',
            headers: ({'Token': params.token}),
            body: JSON.stringify({
                id: params.id,
                rejectReason: params.feedBack,// 反馈内容
            })
        });
        dispatch(httpRequest(request, sendFeedbackSuccess));
    }
}
function getOrderListSuccess(orderList) {
    return {
        type: types.GOT_ORDERLIST,
        orderList: orderList,
    }
}
function getOrderDetailSuccess(orderDetil) {
    return {
        type: types.GOT_ORDERDETAIL,
        orderDetil: orderDetil,
    }
}
function acceptOrderSuccess() {
    return {
        type: types.ACCEPT_ORDER,
    }
}
function sendFeedbackSuccess() {
    return {
        type: types.SEND_FEEDBACK,
    }
}