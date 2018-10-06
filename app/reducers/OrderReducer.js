'use strict';
import * as types from '../constant';

const initialState = {
  type: null,
  orderList: null,
  orderDetail: null,
}

export default function orderReducer(state=initialState, action) {
  switch (action.type) {
    case types.GOT_USERINFO:
      return {
        ...state,
        orderList: action.orderList,
        type: 'GOT_USERINFO',
      }
    case types.GOT_ORDERDETAIL:
      return {
        ...state,
        orderDetail: action.orderDetail,
        type: 'GOT_ORDERDETAIL',
      }
    case types.ACCEPT_ORDER:
      return {
        ...state,
        type: 'ACCEPT_ORDER',
      }
    case types.SEND_FEEDBACK:
      return {
        ...state,
        type: 'SEND_FEEDBACK',
      }
    default:
    // console.log(state);
      return state;
  }
}
