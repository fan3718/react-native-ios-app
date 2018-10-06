import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native'
import { connect } from 'react-redux' // 引入connect函数
import { NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/Feather'

import { unitWidth } from '../../config/AdapterUtil'
import * as roomAction from '../../actions/RoomAction' // 导入action方法
import { TipPop, Header, SaleChart} from '../../components/index'

class RoomPage extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isOpen: false,
        }
        // AsyncStorage.setItem('token', JSON.stringify('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1Mzg1NDg2NDYsImV4cCI6MTUzODcyMTQ0NiwidHlwZSI6MCwiaWQiOiIzIiwiZW50SWQiOiIyNSJ9.Z1TEnmVZ640hEMYdiaa8uwXt7C8uhl13v6bDYIap6lQ'),(error, result) =>{})
        AsyncStorage.getItem('token')
            .then((value) => {
                let jsonValue = JSON.parse((value));
                global.token = jsonValue
                // console.info(jsonValue)
                this.props.getUserInfo(global.token)
            })
        // console.info(this.props)
    }

    componentWillReceiveProps(nextProps) {
        console.info(nextProps)
        if(nextProps.userInfo && nextProps.type === 'GOT_USERINFO') {
            console.info(nextProps)
        }
    }

    toOrderList() {
        this.props.navigation.navigate("MyOrder");
    }

    seeAmount() {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    render() {
        let  { userInfo } = this.props
        return(
        <View style={styles.container}>
              <ImageBackground style={styles.topBg} source={require('./../../assets/image/room/ellipse.png')}>
                  <View style = { styles.headerBar }>
                      <Text style = { styles.headerTitle }>顾问室</Text> 
                  </View>
                  <View style = { styles.adviser }>
                      <Image style={styles.avatar} source={require('../../assets/image/room/avatar.png')}/> 
                      <Text style = { styles.adviserName }>{userInfo ? userInfo.name : '姓名'}</Text>
                      <Text style = { styles.adviserPosition }>{userInfo ? userInfo.position.name : '职位'}</Text> 
                  </View>
              </ImageBackground>
              <View style={styles.headerContent}>
                  <View style={styles.headerTab}>
                        <View style={[styles.tabBox,styles.rightBorder]}>
                            <TouchableOpacity style={styles.tabBtn} onPress={this.toOrderList.bind(this)}>
                                <Image style={styles.tabIcon} source={require('../../assets/image/room/alarm.png')}/>
                                <View>
                                    <View style={styles.redDot}></View>
                                    <Text style={styles.tabText}>我的预约</Text>
                                </View>  
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.tabBox,styles.rightBorder]}>
                            <TouchableOpacity style={styles.tabBtn} onPress={this.toOrderList.bind(this)}>
                                <Image style={styles.tabIcon} source={require('../../assets/image/room/calendar.png')}/>
                                <Text style={styles.tabText}>工作台历</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.tabBox,styles.rightBorder]}>
                            <TouchableOpacity style={styles.tabBtn} onPress={this.toOrderList.bind(this)}>
                                <Image style={styles.tabIcon} source={require('../../assets/image/room/customer.png')}/>
                                <Text style={styles.tabText}>客户管理</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.tabBox}>
                            <TouchableOpacity style={styles.tabBtn} onPress={this.toOrderList.bind(this)}>
                                <Image style={styles.tabIcon} source={require('../../assets/image/room/trend.png')}/>
                                <Text style={styles.tabText}>子公司业绩</Text>
                            </TouchableOpacity>
                        </View>
                  </View>
              </View>
              <ScrollView>
                  <View style={styles.section}>
                    <View style={styles.sectionTitle}>
                      <Text style={styles.sectionText}>销售目标</Text>
                      <Text style={styles.sectionRightText}>500万</Text>
                    </View>
                    <View style={styles.sectionContent}>
                        <SaleChart/>
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.sectionTitle}>
                      <Text style={styles.sectionText}>服务费</Text>
                      <Icon name="chevron-right" size={unitWidth*55} color="#cccccc"/>
                    </View>
                    <View style={styles.sectionContent}>
                        <View style={styles.sectionTop}>
                            <Text style={styles.amountText}>{this.state.isOpen? 22000.00 : '****'}</Text>
                            <Text style={styles.syeImgBox} onPress = {this.seeAmount.bind(this)}>
                                {
                                    this.state.isOpen? <Image style={styles.eyeImg}
                                    source={require('../../assets/image/room/eye.png')}/> :
                                    <Image style={styles.eyeImg} source={require('../../assets/image/room/eyelash.png')}/> 
                                }
                            </Text>
                        </View>
                        <Text style={styles.sectionRightText}>当前服务费</Text>
                    </View>
                </View>
              </ScrollView>
              
              <TipPop navigation = {this.props.navigation}></TipPop>
        </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#f9f9f9',
    },
    topBg: {
        // flex: 1,
        width: '100%',
        height: unitWidth * 410,
    },
    headerBar: {
        height: unitWidth * 130,
        paddingTop: unitWidth * 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: '#ffffff',
        fontSize: unitWidth * 36,
        fontFamily:  'PingFang-SC-Medium',
    },
    adviser: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: unitWidth * 10,
    },
    avatar: {
        width: unitWidth * 170,
        height: unitWidth * 170,
        // borderRadius: unitWidth * 85,
        // borderWidth: unitWidth * 2,
        // borderColor: '#ffffff',
        // backgroundColor: '#ffffff',
    },
    adviserName: {
        color: '#333333',
        fontSize: unitWidth * 30,
        fontFamily:  'PingFang-SC-Regular',
    },
    adviserPosition: {
        color: '#808080',
        fontSize: unitWidth * 22,
        fontFamily:  'PingFang-SC-Regular',
    },
    headerContent: {
        // height: unitWidth * 360,
        backgroundColor: '#ffffff',
        marginBottom: unitWidth * 40,
    },
    headerTab: {
        flexDirection: 'row',
        borderColor: '#e6e6e6',
        borderTopWidth: unitWidth * 2,
        borderBottomWidth: unitWidth * 2,
    },
    tabBox: {
        width: '25%',
        height: Dimensions.get('window').width * 0.23,
    },
    tabBtn: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    redDot: {
        position: 'absolute',
        right: - unitWidth * 5,
        top: unitWidth * 15,
        backgroundColor: 'red',
        width: unitWidth * 10,
        height: unitWidth * 10,
        borderRadius: unitWidth * 10,
    },
    tabIcon: {
        width: unitWidth * 52,
        height: unitWidth * 54,
    },
    rightBorder: {
        borderColor: '#e6e6e6',
        borderRightWidth: unitWidth * 2,
    },
    tabText: {
        paddingTop: unitWidth * 20,
        color: '#333333',
        fontSize: unitWidth * 20,
        fontFamily:  'PingFang-SC-Regular',
    },
    section: {
      marginBottom: unitWidth * 40,
      paddingLeft: unitWidth * 40,
      backgroundColor: '#ffffff',
      borderColor: '#e6e6e6',
      borderTopWidth: unitWidth * 2,
      borderBottomWidth: unitWidth * 2,
    },
    sectionTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: unitWidth * 65,
      borderColor: '#e6e6e6',
      paddingRight: unitWidth * 40,
      borderBottomWidth: unitWidth * 2,
    },
    sectionText: {
        color: '#333333',
        fontSize: unitWidth * 30,
        fontFamily:  'PingFang-SC-Regular',
    },
    sectionRightText: {
        color: '#333333',
        fontSize: unitWidth * 26,
        fontFamily:  'PingFang-SC-Regular',
    },
    sectionContent: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: unitWidth * 40,
        paddingBottom: unitWidth * 40,
    },
    sectionTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    amountText: {
        color: '#808080',
        fontSize: unitWidth * 56,
        fontFamily:  'PingFang-SC-Regular',
    },
    syeImgBox: {
        marginLeft: unitWidth * 20,
        marginTop: unitWidth * 10,
    },
    eyeImg: {
        width: unitWidth * 31,
        // height: '100%',
        resizeMode: 'contain',
    },
});
export default connect(
    (state) => ({
      type: state.roomReducer.type,
      userInfo: state.roomReducer.userInfo,
    }),
    (dispatch) => ({
      getUserInfo: (data) => dispatch(roomAction.getUserInfo(data)),
    })
)(RoomPage)