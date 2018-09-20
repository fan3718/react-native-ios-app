import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  WebView
} from 'react-native'

import { connect } from 'react-redux'; // 引入connect函数
import * as loginAction from '../../actions/loginAction';// 导入action方法
import { NavigationActions } from 'react-navigation'
import { unitWidth } from "../../config/AdapterUtil"



const login = NavigationActions.navigate({
  routeName: 'Login',
  actions: NavigationActions.navigate({routeName: 'Login',})
})

class UserAgree extends Component {
    static navigationOptions = {
        headerTitle: '用户协议',
        titleStyle: {color: '#ffffff'},
        headerStyle:{backgroundColor:'rgb(168,147,75)'},
    };
  constructor(props) {
    super(props);
    const { getAgreement } = props;
    getAgreement();
  }
  
  render() { 
     
    return(
        <WebView
        originWhitelist={['*']}
        source={{ html: `<h1 style="width:100%;text-align:center">${this.props.agreement.name}</h1>
        ${this.props.agreement.content}` }}
        />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText:{
    color: '#000'
  },
})
export default connect(
    (state) => ({
        apiType: state.loginIn.apiType,
        agreement: state.loginIn.agreement,
    }),
    (dispatch) => ({
      getAgreement: () => dispatch(loginAction.getAgreement()),
    })
)(UserAgree)