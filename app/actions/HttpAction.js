'use strict';

import * as types from '../constant'

export function combindParams(url,params) {
    if (params) {
        let paramsArray = [];
        //拼接参数
        Object.keys(params).forEach(key =>  paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    return url
}
export function httpRequest(request,callback,params = {}) {
    return dispatch => {
        dispatch(isLoading());
        console.info(request)
        fetch(request).then((res)=>{
            console.info(res)
            let data = JSON.parse(res._bodyInit);
            if(data['errorCode'] === 0) {
                dispatch(callback(data['data'],params['mobile']));
                dispatch(isSuccess(params['successAlert']))
            }else{
                dispatch(isError(data));
            }
        }).catch((e)=>{
            console.info(e)
            dispatch(isError(e));
        })
    }
}

export function isLoading() {
    return {
        type: types.IS_LOADING,
    }
}

export function isSuccess(alert) {
    return {
        type: types.IS_SUCCESS,
        alert: alert
    }
}

export function isError(data) {
    return {
        type: types.IS_ERROR,
        alert: data.msg,
        errorCode: data.errorCode,
    }
}
