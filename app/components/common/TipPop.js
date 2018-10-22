import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native'
import { connect } from 'react-redux' // 引入connect函数
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import * as httpAction from '../../actions/HttpAction' // 导入action方法
import { unitWidth } from '../../config/AdapterUtil'

class TipPop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            showLoading: true,
        }
    }
  
    componentWillReceiveProps(nextProps) {
        // console.info(nextProps)
        if(nextProps.alert && nextProps.is_Loading) {//加载中
            this.setState({
                showLoading: true
            })
        }
        if(nextProps.alert && nextProps.is_Success) {//成功
            this.timeOut();
        }
        if(nextProps.alert && nextProps.is_Error) {//报错
            this.timeOut();
        }
        if(!nextProps.alert && !nextProps.is_Error && !nextProps.is_Loading) {//弹窗关闭
            this.setState({
                show: false,
                showLoading: false,
            })
        }
        if(nextProps.is_Error && nextProps.errorCode === 401) {
            this.props.navigation.navigate('LoginType')
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
            <Modal
            animationType="none"
            transparent={true}
            visible={this.state.showLoading}>
                <View style={styles.loadingPop}>
                    <View style={styles.loadingBox}>
                        <ActivityIndicator size="large" color="#a8934b" />
                        <Text style={styles.loadingText}>加载中...</Text>
                    </View>
                </View>
            </Modal> 
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
        borderRadius: unitWidth * 30,
    },
    loadingPop: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    loadingBox: {
        width: '70%',
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff',
        borderRadius: unitWidth * 10,
        paddingLeft: unitWidth * 80,
    },
    loadingText: {
        color: '#808080',
        fontSize: unitWidth * 28,
        fontFamily:  'PingFang-SC-Medium',
        marginLeft: unitWidth * 30,
    },
})
export default connect(
    (state) => ({
        is_Loading: state.httpRequest.isLoading,
        alert: state.httpRequest.alert,
        is_Error: state.httpRequest.isError,
        is_Success: state.httpRequest.isSuccess,
        errorCode: state.httpRequest.errorCode,
    }),
    (dispatch) => ({
        isSuccess: () => dispatch(httpAction.isSuccess()),
    })
)(TipPop)