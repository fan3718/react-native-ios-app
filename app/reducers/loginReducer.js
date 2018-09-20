'use strict';
import * as types from '../constant';

const initialState = {
  apiType: null,
  isLoading: false,
  userInfo: null,
  token: null,
  vcodeId: null,
  alert: null,
  agreement: {},
}

export default function loginIn(state=initialState, action) {
  switch (action.type) {
    case types.IS_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case types.GOT_AGREEMENT:
    console.info(action)
      return {
        ...state,
        agreement: action.agreement,
      }
    case types.GOT_VCODE:
      return {
        ...state,
        vcodeId: action.vcodeId,
      }
    case types.GOT_TOKEN:
      return {
        ...state,
        token: action.token,
      }
    case types.LOGIN_IN_DONE:
      return {
        ...state,
        isLoading: false,
        userInfo: action.user,
      }
    case types.IS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        alert: action.alert,
      }
    default:
    // console.log(state);
      return state;
  }
}
