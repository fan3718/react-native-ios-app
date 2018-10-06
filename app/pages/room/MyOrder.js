import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view'
import { connect } from 'react-redux' // 引入connect函数

import { unitWidth } from '../../config/AdapterUtil'
import * as orderAction from '../../actions/OrderAction' // 导入action方法
import { TipPop, Header, OrderCard, TabBar} from '../../components/index'

const backAction = NavigationActions.navigate({
    routeName: 'Room',
    actions: NavigationActions.navigate({routeName: 'Room',})
})

class MyOrder extends Component {
    //待受理2 已确认5  已拒绝1
    constructor (props) {
        super(props)
        this.state = {
            status: 2, // 状态 待受理2 已确认5  已拒绝1
            page: 1, // [可选] 当前页
            limit: 20, // [可选] 每页条数
            token: global.token,
            orderList: [{
                id: 1, // 预约单id
                no: 'PHCFTZ0000461807160001', // 预约单号
                productName: '深蓝启明11号证券投资基金', // 产品名称
                customerName: '王毅', // 客户姓名
                status: 2, // 预约状态 待受理2 已确认5  已拒绝1
                reservationAmount: 100, // 预约购买额度
                reservationDate: '2017-07-27', // 预约购买日期
                rejectReason: '临时外出', // 反馈信息
            },{
                id: 2, // 预约单id
                no: 'PHCFTZ0000461807160001', // 预约单号
                productName: '深蓝启明11号证券投资基金', // 产品名称
                customerName: '王毅', // 客户姓名
                status: 5, // 预约状态 待受理2 已确认5  已拒绝1
                reservationAmount: 100, // 预约购买额度
                reservationDate: '2017-07-27', // 预约购买日期
                rejectReason: '临时外出', // 反馈信息
            },{
                id: 3, // 预约单id
                no: 'PHCFTZ0000461807160001', // 预约单号
                productName: '深蓝启明11号证券投资基金', // 产品名称
                customerName: '王毅', // 客户姓名
                status: 1, // 预约状态 待受理2 已确认5  已拒绝1
                reservationAmount: 100, // 预约购买额度
                reservationDate: '2017-07-27', // 预约购买日期
                rejectReason: '临时外出', // 反馈信息
            }]
        }
    }

    goBack() {
        this.props.navigation.dispatch(backAction)
    }

    getOrders() {
        this.props.getOrderList({
            status: this.state.status, // 状态 待受理2 已确认5  已拒绝1
            page: this.state.page, // [可选] 当前页
            limit: this.state.limit, // [可选] 每页条数
            token: this.state.token
        })
    }


    render() {

        return(
        <View style={styles.container}>
            <Header hasBack={true} title= {'我的预约'} back={this.goBack.bind(this)} props = {this.props.navigation} />
            <ScrollableTabView onChangeTab={(obj) => {
            //    this.props.changeTab(obj.i)
              } 
            } initialPage= {0}
            tabBarUnderlineStyle = {styles.tabLine}   
            tabBarBackgroundColor='rgb(249,249,249)'
            tabBarTextStyle={styles.tabText} renderTabBar={() =>
                <TabBar/>
            }>   
                <View tabLabel="待受理">
                    <OrderCard list = {this.state.orderList} navigation ={this.props.navigation}/>
                </View>
                <View tabLabel="已确认">
                    <OrderCard list = {this.state.orderList} navigation ={this.props.navigation} />
                </View>
                <View tabLabel="待沟通">
                    <OrderCard list = {this.state.orderList} navigation ={this.props.navigation} />
                </View>
            </ScrollableTabView>
            <TipPop navigation = {this.props.navigation}></TipPop>
        </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#f9f9f9',
    },
    tabBarBox: {
        backgroundColor: 'red',
        width: '100%',
        height: 80,
    },
    tabBar: {
        position: 'relative',
        marginLeft: '20%',
        marginRight: '20%',
    },
    tabText: {
        color: 'rgb(168,147,75)',
        fontSize: unitWidth * 30,
        fontFamily:  'PingFang-SC-Regular',
    },
    tabLine: {
        position: 'absolute',
        width: unitWidth * 40,
        marginLeft: unitWidth * 105,
        marginBottom: unitWidth * 20,
        borderColor: "rgb(168,147,75)",
        borderBottomWidth: unitWidth * 7,
    },
    content: {
        backgroundColor: '#fafafa',
        paddingLeft: unitWidth * 20,
    },




});
export default connect(
    (state) => ({
      type: state.orderReducer.type,
      orderList: state.orderReducer.orderList,
    }),
    (dispatch) => ({
        getOrderList: (data) => dispatch(orderAction.getOrderList(data)),
    })
)(MyOrder)