'use strict';
import * as types from '../constant';

const initialState = {
  type: null,
  performList: null,
  perform: null
}

export default function performReducer(state=initialState, action) {
  switch (action.type) {
    
    case types.GOT_PERFORM:
      return {
        ...state,
        perform: action.data,
        type: 'GOT_PERFORM',
      }
    case types.GOT_PERFORMLIST:
      return {
        ...state,
        performList: action.data,
        type: 'GOT_PERFORMLIST',
      }
    case types.GOT_ADVISORLIST:
      return {
        ...state,
        advisorList: action.data,
        type: 'GOT_ADVISORLIST',
      }
    case types.GOT_ADVISORDETAIL:
      return {
        ...state,
        advisor: action.data,
        type: 'GOT_ADVISORDETAIL',
      }
    default:
    // console.log(state);
      return state;
  }
}
