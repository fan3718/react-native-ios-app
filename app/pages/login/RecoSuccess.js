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

class RecoSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      right: new Animated.Value(-width),
      num: 5,
    }
  }
  time
  componentWillReceiveProps(nextProps) {
    if(nextProps.status === 'RecoSuccess' && this.state.right._value == -width) {
      this.toShow()
       this.time= setInterval(()=>{
        this.setState({
          num: this.state.num - 1
        },() => {
          if(this.state.num === 0) {
            clearInterval(this.time)
            this.toHome()
          }
        })
      },1000);
    }
  }

  toHome() {
    clearInterval(this.time)
    this.props.navigation.navigate('BottomTabNavigator')
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
    const { login, getVcode } = this.props;
    return(
      <Animated.View style={[styles.container,{
        right:this.state.right,//将动画对象赋值给需要改变的样式属性
      }]}>
        <View style={styles.textPos}>
          <View style={styles.yellowDot}></View>
          <Text style={styles.welcomeText}>恭喜,{'\n'}面部信息录入成功
          </Text>
          <Text style={styles.tipText}>您现在可安全登陆系统</Text>
        </View>
        <View style={styles.facePos}>
            <Image style={styles.faceImg} source={require('../../assets/image/login/registerSuccess.png')}/>
            <TouchableOpacity onPress={this.toHome.bind(this)}  style={styles.btnImg}>
              <ImageBackground style={styles.btnBg} source={require('../../assets/image/login/welcomeBtn.png')}>
                <Text style={[styles.jumpTip,styles.timeAccount]}>欢迎回来
                  <Text style={[styles.jumpTip,styles.timeAccount]}>（{this.state.num}）</Text> 
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <View style={styles.jumpPos}>
              <Image style={styles.lineImg} source={require('../../assets/image/login/leftLine.png')}/>
              <Text style={styles.jumpTip}>投资有风险，理财需谨慎</Text>
              <Image style={styles.lineImg} source={require('../../assets/image/login/rightLine.png')}/>
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
    // justifyContent:'flex-start',
    position: 'relative',
    width: unitWidth * 620,
    paddingTop: unitWidth * 200,
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
    // paddingTop: '10%'
  },
  faceImg: {
    // width: '100%',
    // height: '100%',
  },
  btnImg: {
    marginTop: '20%',
    // position: 'relative',
  },
  btnBg: {
    width: unitWidth * 620,
    height: unitWidth * 90,
    alignItems:'center',
    justifyContent:'center',
  },
  timeAccount: {
    // position: 'absolute',
    // left: '50%' ,
    // top: '45%',
    color: '#f0f0f0',
  },
  jumpPos: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    position: 'absolute',
    bottom: unitWidth * 40,
  },
  jumpTip: {
    color: '#808080',
    fontSize: unitWidth * 24,
    fontFamily:  'PingFang-SC-Medium',
    marginLeft: unitWidth * 20,
    marginRight: unitWidth * 20,
  },
  lineImg: {
    width: unitWidth * 140,
    resizeMode: 'contain',
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
