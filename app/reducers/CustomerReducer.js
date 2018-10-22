'use strict';
import * as types from '../constant';

const initialState = {
  type: null,
  customerList: null,
  customer: null,
  areaTree: null,
}

export default function customerReducer(state=initialState, action) {
  switch (action.type) {
    case types.GOT_AREATREELIST:
      return {
        ...state,
        areaTree: action.list,
        type: 'GOT_AREATREELIST',
      }
    case types.GOT_CUSTOMERSLIST:
      return {
        ...state,
        customerList: action.list,
        type: 'GOT_CUSTOMERSLIST',
      }
    case types.GOT_CUSTOMERDETAIL:
      return {
        ...state,
        customer: action.detail,
        type: 'GOT_CUSTOMERDETAIL',
      }
    case types.ADD_CUSTOMER:
      return {
        ...state,
        type: 'ADD_CUSTOMER',
      }
    case types.MODIFY_CUSTOMER:
      return {
        ...state,
        type: 'MODIFY_CUSTOMER',
      }
    case types.DELETE_CUSTOMER:
      return {
        ...state,
        type: 'DELETE_CUSTOMER',
      }
    case types.ADD_COMMUNICATE:
      return {
        ...state,
        type: 'ADD_COMMUNICATE',
      }
    default:
    // console.log(state);
      return state;
  }
}
