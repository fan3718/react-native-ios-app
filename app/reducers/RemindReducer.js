'use strict';
import * as types from '../constant';

const initialState = {
  type: null,
  remindList: null,
  remind: null
}

export default function remindReducer(state=initialState, action) {
  switch (action.type) {
    case types.GOT_REMINDSLIST:
      return {
        ...state,
        remindList: action.list,
        type: 'GOT_REMINDSLIST',
      }
    case types.GOT_REMINDDETAIL:
      return {
        ...state,
        remind: action.detail,
        type: 'GOT_REMINDDETAIL',
      }
    case types.ADD_REMIND:
      return {
        ...state,
        type: 'ADD_REMIND',
      }
    case types.MODIFY_REMIND:
      return {
        ...state,
        type: 'MODIFY_REMIND',
      }
    case types.DELETE_REMIND:
      return {
        ...state,
        type: 'DELETE_REMIND',
      }
    default:
    // console.log(state);
      return state;
  }
}
