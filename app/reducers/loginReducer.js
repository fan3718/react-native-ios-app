'use strict';
import * as types from '../constant';

const initialState = {
  type: null,
  userInfo: null,
  vcodeId: null,
  agreement: {},
  mobile: null,
}

export default function loginIn(state=initialState, action) {
  switch (action.type) {
    case types.GOT_AGREEMENT:
      return {
        ...state,
        agreement: action.agreement,
        type: 'GOT_AGREEMENT',
      }
    case types.GOT_VCODE:
      return {
        ...state,
        mobile: action.mobile,
        vcodeId: action.vcodeId,
        type: 'GOT_VCODE',
      }
    case types.GOT_TOKEN:
      return {
        ...state,
        type: 'GOT_TOKEN',
      }
    default:
    // console.log(state);
      return state;
  }
}
