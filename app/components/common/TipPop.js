import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  WebView
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux' // 引入connect函数

import * as httpAction from '../../actions/HttpAction' // 导入action方法
import { unitWidth } from '../../config/AdapterUtil'

const loginAction = NavigationActions.navigate({
    routeName: 'LoginType',
    actions: NavigationActions.navigate({ routeName: 'LoginType', })
})

class TipPop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }
  
    componentWillReceiveProps(nextProps) {
        console.info(nextProps)
        if(nextProps.alert && nextProps.isLoading) {//加载中
            this.setState({
                show: true
            })
        }
        if(nextProps.alert && nextProps.isError) {//报错
            this.timeOut();
        }
        if(!nextProps.isError && !nextProps.isLoading) {//弹窗关闭
            this.setState({
                show: false
            })
        }
        if(nextProps.isError && nextProps.errorCode === 401) {
            this.props.navigation.dispatch(loginAction)
        }
  }

  timeOut() {
    let interval = 1000
    let close
    this.setState({
        show: true
    })
    clearTimeout(close)
    close = setTimeout(()=>{
    // this.setState({
    //     show: false
    // })
    this.props.isSuccess();
    clearTimeout(close)
    },interval)
  }

  render() { 
      const { isError, isLoading, alert} = this.props
    return(
        <View style={styles.container}>
            {this.state.show?<View style={styles.tipPop}><Text>{alert}</Text></View>: null}   
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tipPop: {
        position: 'absolute',
        bottom: unitWidth * 100,
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: unitWidth * 15 ,
        borderRadius: unitWidth * 30
    },
})
export default connect(
    (state) => ({
        isLoading: state.httpRequest.isLoading,
        alert: state.httpRequest.alert,
        isError: state.httpRequest.isError,
        errorCode: state.httpRequest.errorCode,
    }),
    (dispatch) => ({
        isSuccess: () => dispatch(httpAction.isSuccess()),
    })
)(TipPop)