'use strict';
import * as types from '../constant';

const initialState = {
  type: null,
  newsList: null,
  newsDetail: null,
}

export default function newsReducer(state=initialState, action) {
  switch (action.type) {
    case types.GOT_NEWSLIST:
      return {
        ...state,
        newsList: action.list,
        type: 'GOT_NEWSLIST',
      }
    case types.GOT_NEWSDETAIL:
      return {
        ...state,
        newsDetail: action.detail,
        type: 'GOT_NEWSDETAIL',
      }
    default:
    // console.log(state);
      return state;
  }
}
