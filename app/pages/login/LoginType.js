import React, { Component } from 'react'
import {
  View,
  ImageBackground,
  Image,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  AlertIOS,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

import { unitWidth } from '../../config/AdapterUtil'
import { TipPop, ShortLine} from '../../components/index'

const loginMobile = NavigationActions.navigate({
  routeName: 'LoginMobile',
  actions: NavigationActions.navigate({routeName: 'LoginMobile',})
})

const userAgree = NavigationActions.navigate({
  routeName: 'UserAgree',
  actions: NavigationActions.navigate({routeName: 'UserAgree',})
})

export default  class LoginType extends Component {
  // static navigationOptions = {
  //   header: null,
  //   headerBackTitle: "返回",
  // };

  constructor(props) {
    super(props);
    this.state = { 
      checked: true,
      isError: true,
      alert: null
    };
  } 
  
  agree() {
    this.setState({
      checked: !this.state.checked,
    })
  }
  toMoble() {
    if(this.state.checked) {
      this.props.navigation.dispatch(loginMobile)
    }else {
      this.setState({
        alert: '请先勾选协议'
      })
    }
  }
  toWechat() {
    if(this.state.checked) {

    }else {
      this.setState({
        alert: '请先勾选协议'
      })
    }
  }
  userAgree() {
    this.props.navigation.dispatch(userAgree)
  }
  render() {
    return(
      <View style={styles.container}>
        <ImageBackground style={styles.backgroundImage} source={require('../../assets/image/login/loginBg.png')}>
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
        </ImageBackground>
        <TipPop navigation = {this.props.navigation}></TipPop>
      </View>
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