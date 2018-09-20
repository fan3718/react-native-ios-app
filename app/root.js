'use strict'

import React, {
  Component
} from 'react'
import {
  StatusBar,
  Platform
} from 'react-native'

import { Provider } from 'react-redux'
import configureStore from './store/ConfigureStore';
// import App from './containers/App'
import SwitchNav from './navset/Nav'
const store = configureStore()

export default class Root extends Component {

  componentDidMount () {
    if (Platform.OS === 'ios') {
      // StatusBar.setHidden(false)
    }

    StatusBar.setBarStyle('light-content', true)
  }

  render () {
    return (
      <Provider store={store}>
        <SwitchNav />
      </Provider>
    )
  }
}
