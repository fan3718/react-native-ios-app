import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux' // 引入connect函数

import * as loginAction from '../../actions/LoginAction' // 导入action方法
import { unitWidth, width } from '../../config/AdapterUtil'

class LoginVcode extends Component {

  constructor(props) {
    super(props);
    this.state = {
        vcode1: '',
        vcode2: '',
        vcode3: '',
        vcode4: '',
        code1Fous: false,
        right: new Animated.Value(-width),
    };
    
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.status === 'LoginVcode' && this.state.right._value == -width) {
      this.setState({
        code1Fous: true,
      })
      this.toShow()
      this.refs.code1.focus()
    }
    if(nextProps.type === 'GOT_TOKEN') {
      AsyncStorage.setItem('token', JSON.stringify(global.token),(error, result) =>{})
      // console.info(global.token)
      this.props.changeType()
      this.toHide()
      this.props.nextStatus('FaceReco')
    }
  }

  firstInput(vcode) {
    if(!vcode) {
      return false
    }
    this.setState({
        vcode1: vcode,
    },()=>{
        let code2 = this.refs.code2;
        this.refs.code1.blur();
        code2.focus();
        this.toGetToken();
    });
  }

  secondInput(vcode) {
    if(!vcode) {
      return false
    }
    this.setState({
        vcode2: vcode,
    },()=>{
        let code3 = this.refs.code3;
        this.refs.code2.blur();
        code3.focus();
        this.toGetToken();
    });
  }

  thirdInput(vcode) {
    if(!vcode) {
      return false
    }
    this.setState({
        vcode3: vcode,
    },()=>{
        let code4 = this.refs.code4;
        this.refs.code3.blur();
        code4.focus();
        this.toGetToken();
    });
  }

  fourthInput(vcode) {
    if(!vcode) {
      return false
    }
    this.setState({
        vcode4: vcode,
    },()=>{
        this.toGetToken();
    });
  }

  toGetToken() {
      if(this.state.vcode1 == '' || this.state.vcode2 == '' || this.state.vcode3 == ''||this.state.vcode4 == '') {
        return false
      }
      this.refs.code1.blur();
      this.refs.code2.blur();
      this.refs.code3.blur();
      this.refs.code4.blur();
      // this.toHide();
      // this.props.nextStatus('FaceReco')
      this.props.getToken({
        mobile: this.props.mobile,
        vcodeId: this.props.vcodeId,
        vcode: this.state.vcode1 + this.state.vcode2 +this.state.vcode3 +this.state.vcode4,
      });
  }

  toHide() {
      Animated.timing(this.state.right,
          {
            toValue: width, 
            duration: 500,
          }
      ).start();
  }

  toShow() {
      Animated.timing(this.state.right,
          {
            toValue: 0,
            duration: 500,
          }
      ).start();
  }

  render() {
    return(
      <Animated.View style={[styles.container,{
        right:this.state.right,//将动画对象赋值给需要改变的样式属性
      }]}>
        <View style={styles.textPos}>
          <View style={styles.yellowDot}></View>
          <Text style={styles.welcomeText}>欢迎,{'\n'}请输入验证码
          </Text>
          <Text style={styles.tipText}>稍后会进行面部信息录入</Text>
        </View>
        <View style={styles.vcodePos}>
            <TextInput ref = "code1" style={styles.vcodeInput} maxLength = {1} keyboardType = "numeric"
            onChangeText={(vcode) => this.firstInput(vcode)} autoFocus = {this.state.code1Fous}
            value={this.state.vcode1}/>
            <TextInput ref = "code2" style={styles.vcodeInput} maxLength = {1} keyboardType = "numeric"
            onChangeText={(vcode) => this.secondInput(vcode)}
            value={this.state.vcode2}/>
            <TextInput ref = "code3" style={styles.vcodeInput} maxLength = {1} keyboardType = "numeric"
            onChangeText={(vcode) => this.thirdInput(vcode)}
            value={this.state.vcode3}/>
            <TextInput ref = "code4" style={styles.vcodeInput} maxLength = {1} keyboardType = "numeric"
            onChangeText={(vcode) => this.fourthInput(vcode)}
            value={this.state.vcode4}/>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    right: -width,
  },
  backgroundImage:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width: '100%',
    height:null,
    //不加这句，就是按照屏幕高度自适应
    //加上这几，就是按照屏幕自适应
    // resizeMode:Image.resizeMode.contain,
    //祛除内部元素的白色背景
    backgroundColor:'rgba(0,0,0,0)',
  },
  textPos: {
    flex: 1,
    // alignItems:'flex-start',
    // justifyContent:'flex-end',
    position: 'relative',
    width: unitWidth * 620,
    paddingTop: unitWidth * 200,
  },
  yellowDot: {
    position: 'absolute',
    bottom: unitWidth * 180,
    left: unitWidth * 330,
    width: unitWidth * 46,
    height: unitWidth * 46,
    borderRadius: unitWidth * 46,
    backgroundColor: 'rgb(254,216,131)'
  },
  welcomeText: {
    color: '#ffffff',
    fontSize: unitWidth * 60,
    fontFamily:  'PingFang-SC-Medium',
  },
  tipText: {
    color: '#ffffff',
    fontSize: unitWidth * 24,
    fontFamily:  'PingFang-SC-Medium',
  },
  vcodePos: {
    flex: 2,
    flexDirection: 'row',
    alignItems:'flex-start',
    justifyContent:'space-between',
    position: 'relative',
    width: unitWidth * 620,
    paddingTop: '10%'
  },
  vcodeInput: {
    // flex: 1,
    // alignItems:'center',
    // justifyContent:'center',
    width: '20%',
    textAlign: 'center',
    // paddingLeft: 20,
    // paddingRight: 20,
    color: '#ffffff',
    fontSize: unitWidth * 72,
    fontFamily:  'PingFang-SC-Medium',
    borderColor: '#ffffff',
    borderColor: 'rgba(255,255,255,0.6)',
    borderBottomWidth: 1,
  },
});

export default connect(
  (state) => ({
    type: state.loginIn.type,
    mobile: state.loginIn.mobile,
    vcodeId: state.loginIn.vcodeId,
  }),
  (dispatch) => ({
    login: () => dispatch(loginAction.login()),
    getToken: (data) => dispatch(loginAction.getToken(data)),
    changeType: () => dispatch(loginAction.changeType()),
  })
)(LoginVcode)
