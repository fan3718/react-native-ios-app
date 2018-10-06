'use strict';

import * as types from '../constant'

export function httpRequest(request,callback,...key) {
    return dispatch => {
      dispatch(isLoading());
      fetch(request).then((res)=>{
        console.info(res)
        let data = JSON.parse(res._bodyInit);
        if(data['errorCode'] === 0) {
          dispatch(callback(data['data'],...key));
          dispatch(isSuccess())
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

export function isSuccess() {
  return {
    type: types.IS_SUCCESS
  }
}

export function isError(data) {
  return {
    type: types.IS_ERROR,
    alert: data.msg,
    errorCode: data.errorCode,
  }
}
