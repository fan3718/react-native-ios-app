'use strict'

import { combineReducers } from 'redux'
import loginIn from './loginReducer';

const rootReducer = combineReducers({
  loginIn,
})

export default rootReducer
