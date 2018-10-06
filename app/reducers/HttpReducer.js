'use strict';
import * as types from '../constant';

const initialState = {
  isLoading: false,
  alert: null,
  isError: false,
  errorCode: null,
}

export default function httpRequest(state=initialState, action) {
  switch (action.type) {
    case types.IS_LOADING:
      return {
        ...state,
        isLoading: true,
        alert: '加载中···',
        isError: false,
        errorCode: null,
      }
    case types.IS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        alert: action.alert,
        errorCode: action.errorCode,
      }
    case types.IS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        alert: null,
        errorCode: null,
      }
    default:
    // console.log(state);
      return state;
  }
}
