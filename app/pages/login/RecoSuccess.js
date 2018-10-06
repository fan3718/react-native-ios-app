import React, { Component } from 'react'
import {
  View,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux' // 引入connect函数
import { StackActions, NavigationActions } from 'react-navigation'

import * as loginAction from '../../actions/LoginAction' // 导入action方法
import { unitWidth } from '../../config/AdapterUtil'

const resetAction = StackActions.reset({
  index: 0,
  key: "BottomTabNavigator",
  actions: [
    NavigationActions.navigate({routeName: 'App',})
  ]
})

const newsAction = NavigationActions.navigate({
  routeName: 'News',
  actions: NavigationActions.navigate({routeName: 'News',})
})

class RecoSuccess extends Component {
  static navigationOptions = {
      // title: 'Login',
      // header: null,
  };
  constructor(props) {
    super(props);
  }

  toHome() {
    this.props.navigation.dispatch(newsAction)
  }

  render() {
    const { login, getVcode } = this.props;
    return(
      <View style={styles.container}>
        <ImageBackground style={styles.backgroundImage}
        source={require('../../assets/image/login/loginBg.png')}>
        <View style={styles.textPos}>
          <View style={styles.yellowDot}></View>
          <Text style={styles.welcomeText}>恭喜,{'\n'}面部信息录入成功
          </Text>
          <Text style={styles.tipText}>您现在可安全登陆系统</Text>
        </View>
        <View style={styles.facePos}>
            <Image style={styles.faceImg} source={require('../../assets/image/login/registerSuccess.png')}/>
            <TouchableOpacity onPress={this.toHome.bind(this)}  style={styles.btnImg}>
              <Image source={require('../../assets/image/login/welcomeBtn.png')}/>            
            </TouchableOpacity>
            <View style={styles.jumpPos}>
                <Text style={styles.jumpTip}>投资有风险，理财需谨慎</Text>
            </View>
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
  facePos: {
    flex: 2,
    alignItems:'center',
    justifyContent:'flex-start',
    position: 'relative',
    width: unitWidth * 620,
    paddingTop: '10%'
  },
  faceImg: {
    // width: '100%',
    // height: '100%',
  },
  btnImg: {
    marginTop: '40%',
  },
  jumpPos: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    position: 'absolute',
    bottom: unitWidth * 40,
  },
  jumpTip: {
    color: '#ffffff',
    fontSize: unitWidth * 24,
    fontFamily:  'PingFang-SC-Medium',
  },
  jumpbtn: {
    borderColor: '#ffffff',
    borderBottomWidth: 1
  },
});

export default connect(
  (state) => ({
    type: state.loginIn.type,
    userInfo: state.loginIn.userInfo,
  }),
  (dispatch) => ({
    login: () => dispatch(loginAction.login()),
    getVcode: (data) => dispatch(loginAction.getVcode(data)),
  })
)(RecoSuccess)
