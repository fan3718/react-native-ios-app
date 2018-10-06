import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { NavigationActions } from 'react-navigation'

const modelAction = NavigationActions.navigate({
  routeName: 'LoginType',
  actions: NavigationActions.navigate({routeName: 'LoginType',})
})

export default class HomePage extends Component {

  constructor (props) {
    super(props)
  }

  render() {
    return(
      <View style={styles.container}>
            <Text>首页</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F5FCFF',
      fontSize: 30
    },
});