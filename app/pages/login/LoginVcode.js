import React, { Component } from 'react'
import {
  View,
  ImageBackground,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux' // 引入connect函数
import { NavigationActions } from 'react-navigation'

import * as loginAction from '../../actions/LoginAction' // 导入action方法
import { unitWidth } from '../../config/AdapterUtil'
import { TipPop, } from '../../components/index'

const faceReco = NavigationActions.navigate({
  routeName: 'FaceReco',
  actions: NavigationActions.navigate({routeName: 'FaceReco',})
})

class LoginVcode extends Component {

  constructor(props) {
    super(props);
    this.state = {
        vcode1: '',
        vcode2: '',
        vcode3: '',
        vcode4: '',
        alert: '',
    };
  }

  firstInput(vcode) {
    this.setState({
        vcode1: vcode,
    },()=>{
        let code2 = this.refs.code2;
        code2.focus();
    });
  }

  secondInput(vcode) {
    this.setState({
        vcode2: vcode,
    },()=>{
        let code3 = this.refs.code3;
        code3.focus();
    });
  }

  thirdInput(vcode) {
    this.setState({
        vcode3: vcode,
    },()=>{
        let code4 = this.refs.code4;
        code4.focus();
    });
  }

  fourthInput(vcode) {
    this.setState({
        vcode4: vcode,
    },()=>{
        this.props.getToken({
          mobile: this.props.mobile,
          vcodeId: this.props.vcodeId,
          vcode: this.state.vcode1 + this.state.vcode2 +this.state.vcode3 +this.state.vcode4,
        });
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.type === 'GOT_TOKEN') {
      AsyncStorage.setItem('token', JSON.stringify(global.token),(error, result) =>{})
      this.props.navigation.dispatch(faceReco)
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <ImageBackground style={styles.backgroundImage}
        source={require('../../assets/image/login/loginBg.png')}>
        <View style={styles.textPos}>
          <View style={styles.yellowDot}></View>
          <Text style={styles.welcomeText}>欢迎,{'\n'}请输入验证码
          </Text>
          <Text style={styles.tipText}>稍后会进行面部信息录入</Text>
        </View>
        <View style={styles.vcodePos}>
            <TextInput style={styles.vcodeInput} maxLength = {1}
            onChangeText={(vcode) => this.firstInput(vcode)} autoFocus={true}
            value={this.state.vcode1}/>
            <TextInput ref = "code2" style={styles.vcodeInput} maxLength = {1}
            onChangeText={(vcode) => this.secondInput(vcode)}
            value={this.state.vcode2}/>
            <TextInput ref = "code3" style={styles.vcodeInput} maxLength = {1}
            onChangeText={(vcode) => this.thirdInput(vcode)}
            value={this.state.vcode3}/>
            <TextInput ref = "code4" style={styles.vcodeInput} maxLength = {1}
            onChangeText={(vcode) => this.fourthInput(vcode)}
            value={this.state.vcode4}/>
        </View>
        </ImageBackground>
        <TipPop navigation = {this.props.navigation}></TipPop>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    alignItems:'flex-start',
    justifyContent:'flex-end',
    position: 'relative',
    width: unitWidth * 620,
  },
  yellowDot: {
    position: 'absolute',
    bottom: '10%',
    left: '54%',
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
    paddingTop: '20%'
  },
  vcodeInput: {
    // flex: 1,
    alignItems:'center',
    justifyContent:'center',
    width: '20%',
    paddingLeft: 20,
    paddingRight: 20,
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
  })
)(LoginVcode)
