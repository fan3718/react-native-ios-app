'use strict'

import React, { Component } from 'react'
import {
  StatusBar,
  Platform,
  YellowBox
} from 'react-native'
import { Provider } from 'react-redux'

import configureStore from './store/ConfigureStore'
import SwitchNav from './navset/Nav'

const store = configureStore()

export default class Root extends Component {
  constructor(props) {
    super(props)
}
  componentDidMount () {
    // if (Platform.OS === 'ios') {
      // StatusBar.setHidden(true)
    // }
    YellowBox.ignoreWarnings(['Remote debugger']);
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
