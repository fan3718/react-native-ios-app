import React, { Component } from 'react'
import {
  View,
  Platform,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux' // 引入connect函数
import *as wechat from 'react-native-wechat'

import * as loginAction from '../../actions/LoginAction' // 导入action方法
import { unitWidth, width } from '../../config/AdapterUtil'
import { TipPop, ShortLine} from '../../components/index'

class LoginType extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      checked: true,
      isError: true,
      alert: null,
      right: new Animated.Value(-width),
    };
  } 

  componentWillReceiveProps(nextProps) {
    if(nextProps.status === 'LoginType' && this.state.right._value == -width) {
      this.toShow()
    }
  }

  componentDidMount (){
    wechat.registerApp('wx9c213e00c07b9e15')
  }

  agree() {
    this.setState({
      checked: !this.state.checked,
    })
  }

  toMoble() {
    if(this.state.checked) {
      this.toHide()
      // this.props.navigation.navigate('LoginMobile')
      this.props.nextStatus('LoginMobile')
    }else {
      this.setState({
        alert: '请先勾选协议'
      })
    }
  }
  toWechat() {
    if(this.state.checked) {
      this.wxLogin()
    }else {
      this.setState({
        alert: '请先勾选协议'
      })
    }
  }

  wxLogin() {
      let scope = 'snsapi_userinfo';
      let state = 'wechat_sdk_demo';
      //判断微信是否安装
      wechat.isWXAppInstalled()
        .then((isInstalled) => {
          if (isInstalled) {
            //发送授权请求
            wechat.sendAuthRequest(scope, state)
              .then(responseCode => {
                //返回code码，通过code获取access_token
                // this.getAccessToken(responseCode.code);
                this.props.wechatLogin(responseCode.code);
              })
              .catch(err => {
                Alert.alert('登录授权发生错误：', err.message, [
                  {text: '确定'}
                ]);
              })
          } else {
            Platform.OS == 'ios' ?
              Alert.alert('没有安装微信', '是否安装微信？', [
                {text: '取消'},
                {text: '确定', onPress: () => {
                  // this.installWechat()
                }}
              ]) :
              Alert.alert('没有安装微信', '请先安装微信客户端在进行登录', [
                {text: '确定'}
              ])
          }
        })
  }
  userAgree() {
    this.props.navigation.navigate('UserAgree')
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
      ).start(() => {this.props.animate()});
  }

  render() {
    return(
      <Animated.View style={[styles.container,{
        right:this.state.right,//将动画对象赋值给需要改变的样式属性
      }]}>
        <View style={styles.loginLogo}>
            <Image style={styles.logoImg}
            source={require('../../assets/image/login/loginLogo.png')}
            />
            <Text style={styles.logoBigText}>倡导公众投资价值
            </Text>
            <View style={styles.disInline}>
              <ShortLine width={unitWidth*24}></ShortLine>
              <Text style={styles.logoSmallText}>专注个人投资 服务中产家庭
              </Text>
              <ShortLine width={unitWidth*24}></ShortLine>
            </View>
        </View>
        <View style={styles.loginModel}>
          <TouchableOpacity onPress={this.toMoble.bind(this)} style={{marginBottom: unitWidth*50}}>
            <View style={styles.loginBtn}>
              <Icon name="mobile" size={unitWidth*34} color="white"/>
              <Text style={styles.btnText}>使用手机号码登录
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.disInline}>
              <ShortLine width={unitWidth*60}></ShortLine>
              <Text style={styles.typeOr}>or</Text>
              <ShortLine width={unitWidth*60}></ShortLine>
            </View>
          <TouchableOpacity onPress={this.toWechat.bind(this)} style={{marginTop: unitWidth*50}}>
            <View style={styles.loginBtn}>
              <Icon name="wechat" size={unitWidth*30} color="white"/>
              <Text style={styles.btnText}>使用微信登录
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.radioBtn} onPress={this.agree.bind(this)}>
              <View style={styles.radioCircle}>
                <View style={this.state.checked ? styles.radioDot : null}></View>
              </View>
            </TouchableOpacity>
            <Text style={styles.footerWhite}>我已知晓并同意</Text>
            <Text style={styles.footerYellow} onPress={this.userAgree.bind(this)}>用户协议</Text>
          </View>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  disInline: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
  },
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
  loginLogo: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
  },
  logoImg: {
    width: unitWidth * 171,
    height: unitWidth * 171,
  },
  loginModel: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    position: 'relative'
  },
  typeOr: {
    color: '#ffffff',
    fontSize: unitWidth * 30,
    fontFamily:  'PingFang-SC-Medium',
    marginLeft: unitWidth * 30,
    marginRight: unitWidth * 30,
  },
  logoBigText: {
    color: '#ffffff',
    fontSize: unitWidth * 40,
    fontFamily:  'PingFang-SC-Medium',
  },
  logoSmallText: {
    color: '#ffffff',
    fontSize: unitWidth * 22,
    fontFamily:  'PingFang-SC-Medium',
    marginLeft: unitWidth * 10,
    marginRight: unitWidth * 10,
  },
  btnText:{
    color: '#ffffff',
    fontSize: unitWidth * 26,
    fontFamily:  'PingFang-SC-Medium',
    marginLeft: unitWidth * 5,
  },
  loginBtn: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    height: unitWidth * 88,
    width: unitWidth * 400,
    borderWidth: 1,
    borderRadius: 44,
    padding: 5,
    borderColor: 'rgba(230,230,230,0.8)',
    backgroundColor: 'rgba(230,230,230,0.2)'
  },
  footer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: unitWidth * 20,
    // alignItems:'center',
    // justifyContent:'center',
  },
  radio: {
    backgroundColor: 'transparent'
  },
  footerWhite: {
    color: '#ffffff',
    fontSize: unitWidth * 26,
    fontFamily:  'PingFang-SC-Medium',
  },
  footerYellow: {
    color: 'rgb(252,183,20)',
    fontSize: unitWidth * 26,
    fontFamily:  'PingFang-SC-Medium',
  },
  radioBtn: {
    marginTop: unitWidth * 10,
    marginRight: unitWidth * 10,
  },
  radioCircle: {
    height: unitWidth * 20,
    width: unitWidth * 20,
    padding: unitWidth * 2,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgb(217,217,217)'
  },
  radioDot: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'rgb(252,183,20)'
  },
})
export default connect(
  (state) => ({
    type: state.loginIn.type,
    mobile: state.loginIn.mobile,
    vcodeId: state.loginIn.vcodeId,
  }),
  (dispatch) => ({
    login: () => dispatch(loginAction.login()),
  })
)(LoginType)