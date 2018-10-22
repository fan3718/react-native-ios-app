import React, { Component } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { connect } from 'react-redux' // 引入connect函数

import { unitWidth } from '../../config/AdapterUtil'
import * as orderAction from '../../actions/OrderAction' // 导入action方法
import { TipPop, Header, OrderCard, TabBar} from '../../components/index'

class MyOrder extends Component {
    //status=1（已拒绝）status=2（待受理） status=4（已确认）
    constructor (props) {
        super(props)
        this.state = {
            page: {2:0,4:0,1:0},//第几页
            totalPage: {},//共几条
            limit: 20,//每页获取条数
            statusIds:[2,4,1],
            activeTab: 0,
            orderList: {
                2:[
                    // {
                    //     id: 1, // 预约单id
                    //     no: 'PHCFTZ0000461807160001', // 预约单号
                    //     productName: '深蓝启明11号证券投资基金', // 产品名称
                    //     customerName: '王毅', // 客户姓名
                    //     status: 2, // 预约状态 待受理2 已确认5  已拒绝1
                    //     reservationAmount: 100, // 预约购买额度
                    //     reservationDate: '2017-07-27', // 预约购买日期
                    //     rejectReason: '临时外出', // 反馈信息
                    // }
                ],
                4:[
                    // {
                    //     id: 1, // 预约单id
                    //     no: 'PHCFTZ0000461807160001', // 预约单号
                    //     productName: '深蓝启明11号证券投资基金', // 产品名称
                    //     customerName: '王毅', // 客户姓名
                    //     status: 4, // 预约状态 待受理2 已确认5  已拒绝1
                    //     reservationAmount: 100, // 预约购买额度
                    //     reservationDate: '2017-07-27', // 预约购买日期
                    //     rejectReason: '临时外出', // 反馈信息
                    // }
                ],
                1:[
                    // {
                    //     id: 1, // 预约单id
                    //     no: 'PHCFTZ0000461807160001', // 预约单号
                    //     productName: '深蓝启明11号证券投资基金', // 产品名称
                    //     customerName: '王毅', // 客户姓名
                    //     status: 1, // 预约状态 待受理2 已确认5  已拒绝1
                    //     reservationAmount: 100, // 预约购买额度
                    //     reservationDate: '2017-07-27', // 预约购买日期
                    //     rejectReason: '临时外出', // 反馈信息
                    // }
                ]
            }
        }
        this.getOrders(2)
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.orderList && nextProps.type === 'GOT_ORDERLIST') {
            let status = this.state.statusIds[this.state.activeTab]
            let page = nextProps.orderList.page
            console.info(page)
            this.setState({
                page: {
                    ...this.state.page,
                    [status]: page.page,
                },
                totalPage: {
                    ...this.state.totalPage,
                    [status]: page.totalPage,
                },
                orderList: {
                    ...this.state.orderList,
                    [status]: this.state.orderList[status].concat(nextProps.orderList.list),
                }
            })
        }
    }

    goBack() {
        this.props.navigation.navigate('Room')
    }

    getOrders(status) {
        this.props.getOrderList({
            status: status, // 状态 待受理2 已确认4  已拒绝1
            page: this.state.page[status] + 1, // [可选] 当前页
            limit: this.state.limit, // [可选] 每页条数
        })
    }

    scrollEnd(status) {
        if(this.state.totalPage[status] > this.state.page[status]) {
            this.getOrders(status)
        }
    }

    render() {

        return(
        <View style={styles.container}>
            <Header hasBack={true} title= {'我的预约'} back={this.goBack.bind(this)} props = {this.props.navigation} />
            <ScrollableTabView onChangeTab={(obj) => {
                this.setState({
                    activeTab: obj.i
                },()=> {
                    let status = this.state.statusIds[obj.i]
                    console.info(this.state.totalPage)
                    if(!this.state.totalPage[status] && this.state.totalPage[status] !== 0) {
                        this.getOrders(status)
                    }
                })
                
              } 
            } initialPage= {0}
            tabBarUnderlineStyle = {styles.tabLine}   
            tabBarBackgroundColor='rgb(249,249,249)'
            tabBarTextStyle={styles.tabText} renderTabBar={() =>
                <TabBar/>
            }>   
                <View tabLabel="待受理">
                    <OrderCard list = {this.state.orderList[2]} onEnd = {this.scrollEnd.bind(this,2)} navigation ={this.props.navigation}/>
                </View>
                <View tabLabel="已确认">
                    <OrderCard list = {this.state.orderList[4]} onEnd = {this.scrollEnd.bind(this,4)} navigation ={this.props.navigation} />
                </View>
                <View tabLabel="待沟通">
                    <OrderCard list = {this.state.orderList[1]} onEnd = {this.scrollEnd.bind(this,1)} navigation ={this.props.navigation} />
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