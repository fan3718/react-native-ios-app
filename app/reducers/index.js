'use strict'

import { combineReducers } from 'redux'
import httpRequest from './HttpReducer';
import loginIn from './LoginReducer';
import newsReducer from './NewsReducer';
import productsReducer from './ProductReducer';
import roomReducer from './RoomReducer';
import orderReducer from './OrderReducer';

const rootReducer = combineReducers({
  httpRequest,
  loginIn,
  newsReducer,
  productsReducer,
  roomReducer,
  orderReducer
})

export default rootReducer
