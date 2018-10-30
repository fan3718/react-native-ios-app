import React, { Component } from 'react'
import {
  View,
  ImageBackground,
  Image,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux' // 引入connect函数
import Icon from 'react-native-vector-icons/FontAwesome'

import { unitWidth, width } from '../../config/AdapterUtil'
import * as loginAction from '../../actions/LoginAction' // 导入action方法
import { TipPop, } from '../../components/index'

class LoginMobile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      Placeholder: '输入手机号码',
      mobile: '',
      right: new Animated.Value(-width),
    };
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.vcodeId && nextProps.mobile && nextProps.type === 'GOT_VCODE') {
      this.refs.input.blur();
      this.toHide()
      this.props.changeType()
      this.props.nextStatus('LoginVcode')
    }
    if(nextProps.status === 'LoginMobile' && this.state.right._value == -width) {
      this.refs.input.focus();
      this.toShow()
    }
  }

  onChanged (mobile) {
    this.setState({
        mobile: mobile.replace(/[^0-9]/g, ''),
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
    const { getVcode } = this.props;
    return(
      <Animated.View  style={[styles.container,{
        right:this.state.right,//将动画对象赋值给需要改变的样式属性
      }]}>
      <TouchableOpacity activeOpacity={1} onPress={() => this.refs.input.blur()} >
        <View style={styles.textPos}>
          <View style={styles.yellowDot}></View>
          <Text style={styles.welcomeText}>欢迎,{'\n'}手机号码登录
          </Text>
        </View>
        <View style={styles.btnPos}>
          <View  style={styles.inputBox}>
            <Text style={styles.areaCode}>+86</Text>
            <Image style={styles.flagImg}
            source={require('../../assets/image/login/china.png')}></Image>
            <TextInput ref= 'input' placeholder = {this.state.Placeholder}
            placeholderTextColor = "white" maxLength = {11} textContentType = "telephoneNumber"
            style={styles.editInput} keyboardType = "numeric"
            onChangeText={(mobile) => this.onChanged(mobile)}
            value={this.state.mobile}/>
          </View>
          <View style={{width: '100%'}}>
            <TouchableOpacity onPress={()=>{
              getVcode(this.state.mobile)
              // this.toHide()
              // this.props.nextStatus('LoginVcode')
            }} style={{marginTop: 50}}>
              <View style={styles.loginBtn}>
                <Icon name="mobile" size={unitWidth*34} color="white"/>
                <Text style={styles.loginText}>获取验证码
                </Text>
              </View>
            </TouchableOpacity>
          </View> 
        </View>
        </TouchableOpacity>
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
    alignItems:'flex-start',
    // justifyContent:'flex-end',
    position: 'relative',
    paddingTop: unitWidth * 200,
    width: unitWidth * 620,
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

  btnPos: {
    flex: 2,
    // alignItems:'center',
    // justifyContent:'center',
    position: 'relative',
    width: unitWidth * 620,
    paddingTop: '10%'
  },
  inputBox: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    width: '100%',
    borderColor: 'rgba(255,255,255,0.6)',
    borderBottomWidth: 1,
    paddingBottom: unitWidth * 10,
  },
  areaCode: {
    color: '#ffffff',
    fontSize: unitWidth * 30,
    fontFamily:  'PingFang-SC-Medium',
    paddingRight: unitWidth * 10,
  },
  flagImg: {
    width: unitWidth * 40,
    height: unitWidth * 40,
    borderRadius: unitWidth * 20,
  },
  editInput: {
    width: '70%',
    color: '#ffffff',
    fontSize: unitWidth * 36,
    fontFamily:  'PingFang-SC-Medium',
    borderColor: '#ffffff',
    borderColor: 'rgba(255,255,255,0.6)',
    borderLeftWidth: 1,
    paddingLeft: unitWidth * 20,
    marginLeft: unitWidth * 20,
  },
  loginBtn: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    height: unitWidth * 88,
    width: '100%',
    borderWidth: 1,
    borderRadius: unitWidth * 6,
    padding: 5,
    borderColor: 'rgba(230,230,230,0.2)',
    backgroundColor: 'rgba(230,230,230,0.2)'

  },
  loginText: {
    color: '#ffffff',
    fontSize: unitWidth * 26,
    fontFamily:  'PingFang-SC-Medium',
    marginLeft: unitWidth * 5,
  }
});

export default connect(
  (state) => ({
    mobile: state.loginIn.mobile,
    vcodeId: state.loginIn.vcodeId,
    type: state.loginIn.type,
  }),
  (dispatch) => ({
    login: () => dispatch(loginAction.login()),
    getVcode: (data) => dispatch(loginAction.getVcode(data)),
    changeType: () => dispatch(loginAction.changeType()),
  })
)(LoginMobile)
