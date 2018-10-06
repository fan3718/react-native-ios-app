'use strict';
import * as types from '../constant';

const initialState = {
  type: null,
  catesList: null,
  productsList: null,
  productDetail: null,
}

export default function productsReducer(state=initialState, action) {
  switch (action.type) {
    case types.GOT_PRODUCTCATE:
      return {
        ...state,
        catesList: action.list,
        type: 'GOT_PRODUCTCATE',
      }
    case types.GOT_PRODUCTSLIST:
      return {
        ...state,
        productsList: action.list,
        type: 'GOT_PRODUCTSLIST',
      }
    case types.GOT_PRODUCTSDETAIL:
      return {
        ...state,
        productDetail: action.detail,
        type: 'GOT_PRODUCTSDETAIL',
      }
    case types.GOT_PRODUCTSACCOUT:
      return {
        ...state,
        account: action.account,
        type: 'GOT_PRODUCTSACCOUT',
      }
    case types.SUBMIT_PRODUCTSORDER:
      return {
        ...state,
        order: action.order,
        type: 'SUBMIT_PRODUCTSORDER',
      }
    default:
    // console.log(state);
      return state;
  }
}
