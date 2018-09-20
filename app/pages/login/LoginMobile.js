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

class LoginMobile extends Component {
  static navigationOptions = {
      // title: 'Login',
      // header: null,
  };
  constructor(props) {
    super(props);
    this.state = { 
      Placeholder: '输入手机号码',
      mobile: '' 
  };
  }
  shouldComponentUpdate(nextProps, nextState) {
    
    console.info(this.state)
    // 登录完成,切成功登录
    if (nextProps.status === '登陆成功' && nextProps.isSuccess) {
      this.props.navigation.dispatch(homeAction)
      this.props.navigation.dispatch(resetAction)
      return false;
    }
    return true;
  }

  onChanged (text) {
    console.info(text)
    this.setState({
        mobile: text.replace(/[^0-9]/g, ''),
    });
    console.info(this.state.mobile)
  }

  render() {
    const { login, getVcode } = this.props;
    return(
      <View style={styles.container}>
        <ImageBackground style={styles.backgroundImage}
        source={require('../../assets/image/loginBg.png')}>
        <View style={styles.textPos}>
          <Text style={styles.welcomeText}>欢迎,{'\n'}手机号码登录
          </Text>
        </View>
        <View style={styles.btnPos}>
          <View  style={styles.inputBox}>
            <Text style={styles.areaCode}>+86</Text>
            <Avatar small rounded
              source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7} ontainerStyle={{width: unitWidth * 40}}
            />
            <TextInput placeholder = {this.state.Placeholder} 
            placeholderTextColor = "white" maxLength = {11} textContentType = "telephoneNumber"
            style={styles.editInput}
            onChangeText={(mobile) => this.onChanged(mobile)}
            value={this.state.mobile}/>
          </View>
          <View style={{width: '100%'}}>
            <TouchableOpacity onPress={()=>getVcode(this.state.text)} style={{marginTop: 50}}>
              <View style={styles.loginBtn}>
                <Icon name="mobile" size={unitWidth*34} color="white"/>
                <Text style={styles.loginText}>获取验证码
                </Text>
              </View>
            </TouchableOpacity>
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
    flex: 2,
    alignItems:'flex-start',
    justifyContent:'flex-end',
    position: 'relative',
    width: unitWidth * 620,
  },
  welcomeText: {
    color: '#ffffff',
    fontSize: unitWidth * 60,
    fontFamily:  'PingFang-SC-Medium',
  },

  btnPos: {
    flex: 5,
    alignItems:'center',
    // justifyContent:'center',
    position: 'relative',
    width: unitWidth * 620,
    paddingTop: '20%'
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
    fontSize: unitWidth * 40,
    fontFamily:  'PingFang-SC-Medium',
    paddingRight: unitWidth * 10,
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
    borderColor: '#ffffff',
    backgroundColor: 'rgba(230,230,230,0.4)'

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
)(LoginMobile)
