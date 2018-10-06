import React, { Component } from 'react'
import { View } from 'react-native'

export default class ShortLine extends Component {
  constructor(props) {
    super(props)
    this.state = {
        show: false
    }
  }

  render() { 
      const { width } = this.props
    return(
        <View style={{height: 1,width: width,backgroundColor: 'white',}} ></View>
    )
  }
}
