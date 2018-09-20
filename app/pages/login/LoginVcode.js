import React, { Component } from 'react';
import {
  View,
  ImageBackground,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux'; // 引入connect函数
import * as loginAction from '../../actions/loginAction';// 导入action方法
import { StackActions, NavigationActions } from 'react-navigation';
import { unitWidth } from '../../config/AdapterUtil';
import Icon from 'react-native-vector-icons/FontAwesome';

const resetAction = StackActions.reset({
  index: 0,
  key: "BottomTabNavigator",
  actions: [
    NavigationActions.navigate({routeName: 'App',})
  ]
})

const homeAction = NavigationActions.navigate({
  routeName: 'Home',
  actions: NavigationActions.navigate({routeName: 'Home',})
})

class LoginVcode extends Component {
  static navigationOptions = {
      // title: 'Login',
      // header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
        vcode1: '',
        vcode2: '',
        vcode3: '',
        vcode4: '',
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
        console.info(this.state)
    });
  }

  render() {
    const { login, getVcode } = this.props;
    return(
      <View style={styles.container}>
        <ImageBackground style={styles.backgroundImage}
        source={require('../../assets/image/loginBg.png')}>
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
            autoFocus={this.state.focus2}
            value={this.state.vcode2}/>
            <TextInput ref = "code3" style={styles.vcodeInput} maxLength = {1}
            onChangeText={(vcode) => this.thirdInput(vcode)}
            value={this.state.vcode3}/>
            <TextInput ref = "code4" style={styles.vcodeInput} maxLength = {1}
            onChangeText={(vcode) => this.fourthInput(vcode)}
            value={this.state.vcode4}/>
        </View>
        </ImageBackground>
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
    isLoading: state.loginIn.isLoading,
    isError: state.loginIn.isError,
    token: state.loginIn.token,
    vcodeId: state.loginIn.vcodeId,
    userInfo: state.loginIn.userInfo,
    alert: state.loginIn.alert,
  }),
  (dispatch) => ({
    login: () => dispatch(loginAction.login()),
    getVcode: (data) => dispatch(loginAction.getVcode(data)),
  })
)(LoginVcode)
