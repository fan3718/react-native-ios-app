import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';


export default class DetailsPage extends Component {

  render() {
    return(
      <View style={styles.container}>
            <Text>详情页</Text>
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