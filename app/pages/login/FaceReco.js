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
import { NavigationActions } from 'react-navigation'

import * as loginAction from '../../actions/LoginAction' // 导入action方法
import { unitWidth } from '../../config/AdapterUtil'

const successAction = NavigationActions.navigate({
  routeName: 'RecoSuccess',
  actions: NavigationActions.navigate({routeName: 'RecoSuccess',})
})

class FaceReco extends Component {
  constructor(props) {
    super(props);
  }


  jump() {
    this.props.navigation.dispatch(successAction)
  }

  render() {
    return(
      <View style={styles.container}>
        <ImageBackground style={styles.backgroundImage}
        source={require('../../assets/image/login/loginBg.png')}>
        <View style={styles.textPos}>
          <View style={styles.yellowDot}></View>
          <Text style={styles.welcomeText}>成功,{'\n'}录入您的面部信息
          </Text>
          <Text style={styles.tipText}>为了您的账户安全，{'\n'}请进行面部信息录入</Text>
        </View>
        <View style={styles.facePos}>
            <Image style={styles.faceImg} source={require('../../assets/image/login/loginLogo.png')}/>
            <View style={styles.jumpPos}>
                <Text style={styles.jumpTip}>暂不录入，</Text>
                <View style={styles.jumpbtn}>
                    <Text style={styles.jumpTip} onPress={this.jump.bind(this)}>跳过</Text>
                </View>  
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
    paddingTop: '20%'
  },
  faceImg: {
    width: '80%',
    height: '80%',
  },
  jumpPos: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    position: 'absolute',
    bottom: unitWidth * 40,
    right: unitWidth * 20,
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
    getUserInfo: (data) => dispatch(loginAction.getUserInfo(data)),
  })
)(FaceReco)
