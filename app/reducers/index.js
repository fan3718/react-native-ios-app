'use strict'

import { combineReducers } from 'redux'
import httpRequest from './HttpReducer'
import loginIn from './LoginReducer'
import newsReducer from './NewsReducer'
import productsReducer from './ProductReducer'
import roomReducer from './RoomReducer'
import orderReducer from './OrderReducer'
import remindReducer from './RemindReducer'
import customerReducer from './CustomerReducer'
import performReducer from './PerformReducer'

const rootReducer = combineReducers({
  httpRequest,
  loginIn,
  newsReducer,
  productsReducer,
  roomReducer,
  orderReducer,
  remindReducer,
  customerReducer,
  performReducer,
})

export default rootReducer
