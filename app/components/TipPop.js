import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  WebView
} from 'react-native'

// import { connect } from 'react-redux'; // 引入connect函数
// import * as loginAction from '../../actions/loginAction';// 导入action方法
// import { NavigationActions } from 'react-navigation'
import { unitWidth } from "../config/AdapterUtil"


export default class TipPop extends Component {
  constructor(props) {
    super(props)
    this.state = {
        show: false
    }
  }
  
//   componentDidMount() {
//     console.info(this.props)
    
//   }
    componentWillReceiveProps(nextProps) { 
        console.info(this.props.pState)
        console.info(nextProps);
        let isShow = true;
        let prevState = this.props.pState
        let nextState = nextProps.pState
        for (const key in nextState) {
            if (nextState[key] !== prevState[key]) {
                isShow = false
                if(key === "tip") {
                    isShow = true
                }
            } 
        }
        if(isShow) {
            this.timeOut()
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
    this.setState({
        show: false
    })
    clearTimeout(close)
    },interval)
  }

  render() { 
      const {tip} = this.props
    return(
        <View style={styles.container}>
            {this.state.show?<View style={styles.tipPop}><Text>{tip}</Text></View>: null}   
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
// export default connect(
//     (state) => ({
//         apiType: state.loginIn.apiType,
//         agreement: state.loginIn.agreement,
//     }),
//     (dispatch) => ({
//       getAgreement: () => dispatch(loginAction.getAgreement()),
//     })
// )(UserAgree)