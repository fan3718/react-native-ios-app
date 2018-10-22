import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native'
import moment from 'moment' // 引入connect函数

import { unitWidth } from '../../config/AdapterUtil'
import { TipPop, Header, ListItem} from '../../components'

export default class OrderSuccess extends Component {
    constructor (props) {
        super(props)
        this.state = {
            order: this.props.navigation.state.params || {},
        }
    }

    goBack() {
        this.props.navigation.goBack()
    }

    toService() {
        this.props.navigation.dispatch('Service')
    }

    render() {
        let orderList = [
            { label: '预约产品', value: this.state.order['productName'], id: 0, noBorder: true},
            { label: '预约额度', value: this.state.order['reservationAmount'], id: 1, },
            { label: '预约时间', value: moment(this.state.order['reservationDate'] || new Date()).format('YYYY-MM-DD'), id: 2, },
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
                    <Text style={styles.textLittle}>预约单号：{this.state.order.no}</Text>
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
                        <Text style = { styles.orderMemo }>{this.state.order['memo'] || '无备注'}</Text>
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