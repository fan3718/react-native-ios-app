'use strict';
import * as types from '../constant';

const initialState = {
  type: null,
  userInfo: null,
}

export default function roomReducer(state=initialState, action) {
  switch (action.type) {
    case types.GOT_USERINFO:
      return {
        ...state,
        userInfo: action.userInfo,
        type: 'GOT_USERINFO',
      }
    case types.GOT_SERVICELIST:
      return {
        ...state,
        serviceList: action.serviceList,
        type: 'GOT_SERVICELIST',
      }
    case types.GOT_ADVISORTARGET:
      return {
        ...state,
        target: action.target,
        type: 'GOT_ADVISORTARGET',
      }
    default:
    // console.log(state);
      return state;
  }
}
