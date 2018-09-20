import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';


export default class SettingPage2 extends Component {

  render() {
    return(
      <View style={styles.container}>
            <Text>setting page2</Text>
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