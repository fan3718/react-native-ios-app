import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native'
import { connect } from 'react-redux' // 引入connect函数
import { NavigationActions } from 'react-navigation'
import moment from 'moment' // 引入connect函数

import { unitWidth } from '../../config/AdapterUtil'
import * as poductAction from '../../actions/ProductAction' // 导入action方法
import * as httpAction from '../../actions/HttpAction' // 导入action方法
import { PRODUCT, PRODUCT_STATUS, CURRENCY } from '../../config/StaticData'
import { TipPop, Header, ListItem} from '../../components'

const backAction = NavigationActions.navigate({
    routeName: 'ProductOrder',
    actions: NavigationActions.navigate({routeName: 'ProductOrder',})
})
const toAction = NavigationActions.navigate({
    routeName: 'Service',
    actions: NavigationActions.navigate({routeName: 'Service',})
})

class OrderSuccess extends Component {
    constructor (props) {
        super(props)
        this.state = {
            amount: null,
            date:  moment(new Date()).format('YYYY-MM-DD'),
            memo: '',
        }
        // AsyncStorage.setItem('token', JSON.stringify('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1Mzg1NDg2NDYsImV4cCI6MTUzODcyMTQ0NiwidHlwZSI6MCwiaWQiOiIzIiwiZW50SWQiOiIyNSJ9.Z1TEnmVZ640hEMYdiaa8uwXt7C8uhl13v6bDYIap6lQ'),(error, result) =>{})
        AsyncStorage.getItem('token')
            .then((value) => {
                let jsonValue = JSON.parse((value));
                global.token = jsonValue
                // console.info(jsonValue)
                // this.props.getProductsDetail({
                //     id: '1',
                //     token: global.token
                // })
            })
        // this.props.navigation.goBack('ServicePage');
        // console.info(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.order && nextProps.type === 'SUBMIT_PRODUCTSORDER') {
            console.info(nextProps)
        }
    }
    goBack() {
        this.props.navigation.dispatch(backAction)
    }

    toService() {
        this.props.navigation.dispatch(toAction)
    }

    render() {
        let  { order,  } = this.props
        let orderList = [
            { label: '预约产品', value: order.productName, id: 0, noBorder: true},
            { label: '预约额度', value: order.reservationAmount, id: 1, },
            { label: '预约时间', value: order.reservationDate, id: 2, },
        ]
        return(
        <View style={styles.container}>
            <Header title= {'产品预约'} hasBack={true} back={this.goBack.bind(this)} props = {this.props.navigation}/>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.headerTitle}>
                        <Image style={styles.alarm} source={require('../../assets/image/service/alarm.png')}/> 
                        <Text style={styles.textLight}>预约成功</Text>
                    </View>
                    <Text style={styles.textLittle}>预约单号：{order.no}</Text>
                </View>
            </View>
            <View style={styles.body}>
                {
                    orderList.map((item,index) => {
                        return <ListItem item = {item}  index= {index} key = {index + item.id}/>
                    })
                }
                <View style = { styles.orderMemoView }>
                    <View style = { styles.orderMemoBox }>
                        <Text style = { styles.orderMemo }>无备注</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.footer} onPress={this.toService.bind(this)}>
                <ImageBackground style={styles.longBtn} source={require('./../../assets/image/service/longBtn.png')}>
                    <Text style={styles.longBtnText}>继续查看</Text>
                </ImageBackground>
            </TouchableOpacity>    
            <TipPop navigation = {this.props.navigation}></TipPop>
        </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   alignItems: 'center',
    //   justifyContent: 'center',
      backgroundColor: '#f9f9f9',
    },
    header: {
        // height: unitWidth * 240,
        backgroundColor: 'rgb(168,147,75)',
    },
    headerContent: {
        alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: unitWidth * 90,
        paddingBottom: unitWidth * 60,
    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textLight: {
        color: '#ffffff',
        fontSize: unitWidth * 36,
        fontFamily:  'PingFang-SC-Medium',
        paddingLeft: unitWidth * 10,
    },
    alarm: {
        width: unitWidth * 29,
        height: unitWidth * 30,
    },
    textLittle: {
        color: '#ffffff',
        fontSize: unitWidth * 24,
        fontFamily:  'PingFang-SC-Regular',
    },
    orderMemoView: {
        paddingLeft: unitWidth * 35,
        paddingRight: unitWidth * 35,
        paddingBottom: unitWidth * 20,
        borderBottomWidth: unitWidth * 2,
        borderColor: '#eeeeee',
        backgroundColor: '#ffffff',
    },
    orderMemoBox: {
        borderColor: '#eeeeee',
        paddingTop: unitWidth * 20,
        borderTopWidth: unitWidth * 2,
    },
    orderMemo: {
        height: unitWidth * 165,
        color: '#333333',
        fontSize: unitWidth * 30,
        fontFamily:  'PingFang-SC-Regular',
    },
    body: {
        marginBottom: unitWidth * 115,
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    longBtn: {
        width: unitWidth * 640,
        height: unitWidth * 90,
        alignItems: 'center',
        justifyContent: 'center',
    },
    longBtnText:{
        color: '#FFFFFF',
        fontSize: unitWidth * 30,
        fontFamily:  'PingFang-SC-Medium',
    },
});
export default connect(
    (state) => ({
      type: state.productsReducer.type,
      order: state.productsReducer.order || {
        id: 1, // 预约单id
        no: 'PHCFTZ0000461807160001', // 预约单号
        productName: '产品名称', // 产品名称
        reservationAmount: 100, // 预约购买金额
        reservationDate: '2018-07-04',  // 预约时间
        memo: '', // 备注
      },
    }),
    (dispatch) => ({
        submitProductOrder: (data) => dispatch(poductAction.submitProductOrder(data)),
        isError: (data) => dispatch(httpAction.isError(data)),
    })
)(OrderSuccess)