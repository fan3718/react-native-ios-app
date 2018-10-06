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
    default:
    // console.log(state);
      return state;
  }
}
