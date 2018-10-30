import React, { Component } from 'react'
import {
  View,
  ImageBackground,
  AsyncStorage,
  Animated,
  StyleSheet,
  NetInfo,
  Alert,
} from 'react-native'
import { connect } from 'react-redux' // 引入connect函数

import { server_path } from './../../config/config'
import * as roomAction from '../../actions/RoomAction' // 导入action方法
import { TipPop} from '../../components/index'
import LoginType from './LoginType'
import LoginMobile from './LoginMobile'
import LoginVcode from './LoginVcode'
import FaceReco from './FaceReco'
import RecoSuccess from './RecoSuccess'

class LauchPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        scale: new Animated.Value(1),
        status: null
    }
    AsyncStorage.getItem('token')
    .then((value) => {
        let jsonValue = JSON.parse((value));
        global.token = jsonValue
        this.getUserInfo();
        this.validToken();
    })
  } 

    validNavigate
    validToken() {
      this.validNavigate = setInterval(() => {
          if(this.state.status === null) {
            this.getUserInfo();
          }else{
            clearInterval(this.validNavigate)
          }
      },10000)
    }

    componentWillUnmount() {
      clearInterval(this.validNavigate)
    }

    getUserInfo() {
      let request = new Request(
          server_path + '/user/info', {
          headers: ({'Token': global.token}),
      });
      fetch(request).then((res)=>{
          let data = JSON.parse(res._bodyInit);
          if(data['errorCode'] === 0) {
            this.setState({
              status: 'RecoSuccess'
            })
              // clearInterval(this.validNavigate)
              // this.props.navigation.navigate("BottomTabNavigator")
          }else if(data['errorCode'] === 401) {
              this.setState({
                status: 'RecoSuccess'
              })
          }
      })
    }

  nextStatus(status) {
      this.setState({
        status: status
      })
  }

  //背景图放大
  animate() {
    let timing = Animated.timing;
    Animated.sequence([
      Animated.delay(500),
      timing(
        // Animate value over time
        this.state.scale, // The value to drive
        {
          toValue: 3, // Animate to final value of 1
          duration: 2000,
        }
      ),
      timing(
        // Animate value over time
        this.state.scale, // The value to drive
        {
          toValue: 1, // Animate to final value of 1
          duration: 2000,
        }
      )
    ]).start();
  }

  render() {
    return(
      <View style={[styles.container]}>
        <Animated.Image style={[styles.backgroundImage,{
        transform:[{scale: this.state.scale}],//将动画对象赋值给需要改变的样式属性
        }]} source={require('../../assets/image/login/loginBg.png')}></Animated.Image>
        <LoginType status = {this.state.status} navigation={this.props.navigation} animate = {this.animate.bind(this)} nextStatus= {this.nextStatus.bind(this)} />
        <LoginMobile status = {this.state.status} navigation={this.props.navigation} animate = {this.animate.bind(this)} nextStatus= {this.nextStatus.bind(this)} />
        <LoginVcode status = {this.state.status} navigation={this.props.navigation} animate = {this.animate.bind(this)} nextStatus= {this.nextStatus.bind(this)} />
        <FaceReco status = {this.state.status} navigation={this.props.navigation} animate = {this.animate.bind(this)} nextStatus= {this.nextStatus.bind(this)} />
        <RecoSuccess status = {this.state.status} navigation={this.props.navigation} animate = {this.animate.bind(this)} nextStatus= {this.nextStatus.bind(this)} />

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
    position: 'relative',
  },
  backgroundImage:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width: '100%',
    height: '100%',
  },
})
export default connect(
  (state) => ({
    type: state.roomReducer.type,
    userInfo: state.roomReducer.userInfo,
  }),
  (dispatch) => ({
    getUserInfo: () => dispatch(roomAction.getUserInfo()),
  })
)(LauchPage)