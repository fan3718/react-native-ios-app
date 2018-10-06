import React, { Component } from 'react'
import {
  WebView
} from 'react-native'
import { connect } from 'react-redux' // 引入connect函数
import { NavigationActions } from 'react-navigation'

import * as loginAction from '../../actions/LoginAction' // 导入action方法

const typeAction = NavigationActions.navigate({
  routeName: 'LoginType',
  actions: NavigationActions.navigate({routeName: 'LoginType',})
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
    this.props.navigation.goBack('LoginType')
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
export default connect(
    (state) => ({
      agreement: state.loginIn.agreement,
    }),
    (dispatch) => ({
      getAgreement: () => dispatch(loginAction.getAgreement()),
    })
)(UserAgree)