'use strict';

import * as types from '../constant'
import { server_path } from '../config/config'
import { isLoading, isError, httpRequest, combindParams } from './HttpAction'

//获取预约列表
export function getOrderList(params) {
    return dispatch => {
        let request = new Request(
            combindParams(server_path + '/order/list',params), {
            headers: ({'Token': global.token}),
        });
        dispatch(httpRequest(request, getOrderListSuccess));
    }
}
//获取预约详情
export function getOrderDetail(params) {
    return dispatch => {
        let request = new Request(
            combindParams(server_path + '/order/detail',params), {
            method: 'POST',
            headers: ({'Token': global.token}),
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
            headers: ({'Token': global.token}),
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
            headers: ({'Token': global.token}),
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