import React, { Component } from 'react'
import {
  View,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native'
import { connect } from 'react-redux' // 引入connect函数

import * as loginAction from '../../actions/LoginAction' // 导入action方法
import { unitWidth, width } from '../../config/AdapterUtil'

class FaceReco extends Component {
  constructor(props) {
    super(props);
    this.state = {
      right: new Animated.Value(-width),
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.status === 'FaceReco' && this.state.right._value == -width) {
      this.toShow()
    }
  }

  jump() {
    // this.props.navigation.navigate('RecoSuccess')
    this.toHide();
    this.props.nextStatus('RecoSuccess')
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
          <Text style={styles.welcomeText}>成功,{'\n'}录入您的面部信息
          </Text>
          <Text style={styles.tipText}>为了您的账户安全，{'\n'}请进行面部信息录入</Text>
        </View>
        <View style={styles.facePos}>
            <ImageBackground style={styles.faceBox} source={require('../../assets/image/login/faceFrame.png')}>
              <Image style={styles.faceImg} source={require('../../assets/image/login/loginLogo.png')}/>
              <Text style={[styles.jumpTip,styles.faceTip]}>拿起手机，眨眨眼</Text>
            </ImageBackground>
            <View style={styles.jumpPos}>
                <Text style={styles.jumpTip}>暂不录入，</Text>
                <View style={styles.jumpbtn}>
                    <Text style={styles.jumpTip} onPress={this.jump.bind(this)}>跳过</Text>
                </View>  
            </View>
            
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
    paddingTop: unitWidth * 200,
    width: unitWidth * 620,
  },
  yellowDot: {
    position: 'absolute',
    bottom: unitWidth * 200,
    left: unitWidth * 450,
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
  },
  faceBox: {
    width: '110%',
    height: '100%',
    marginTop: - unitWidth * 220,
    marginLeft: '-10%',
    alignItems:'center',
    justifyContent:'center',
    position: 'relative',
    paddingTop: unitWidth * 80,
    paddingLeft: unitWidth * 30,
  },
  faceImg: {
    width: unitWidth * 400,
    height: unitWidth * 400,
    borderWidth: unitWidth * 2,
    borderColor: '#ffffff',
    borderRadius: unitWidth * 200,
  },
  faceTip: {
    position: 'absolute',
    bottom: unitWidth * 90,
    paddingLeft: unitWidth * 40,
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
