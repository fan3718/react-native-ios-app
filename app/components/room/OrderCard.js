import React, { Component } from 'react';
import { 
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
 } from 'react-native'
 import Icon from 'react-native-vector-icons/Feather'

 import { unitWidth } from '../../config/AdapterUtil'

export default class OrderCard extends Component {
    constructor(props) {
        super(props)
        console.info(props)
    }
    
    toNextpage(id) {
        this.props.navigation.navigate("OrderDetail",{id: id});
    }

    renderCardItem = ({item}) => {
        let icon = null
        switch(item.status) {//待受理2 已确认5  已拒绝1
            case 2: icon = require('../../assets/image/order/accept.png');break;
            case 4: icon = require('../../assets/image/order/confirm.png');break;
            case 1: icon = require('../../assets/image/order/refuse.png');break;
            default: break;
        }
        return (
            <TouchableOpacity style={styles.cardBox} activeOpacity={0.9} onPress={this.toNextpage.bind(this,item.id)}>
                <View style={styles.cardBorder}>
                    <View style={styles.cardTitle}>
                        <Text style={styles.cardText}>预约单号：{item.no}</Text>
                        <Icon name="chevron-right" size={unitWidth*55} color="#cccccc"/>
                    </View>
                    <View style={styles.cardBody}>
                        <View style={styles.cardNameBox}>
                            <Text style={styles.cardName}>{item.productName}</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.contentText}>客户姓名：{item.customerName}</Text>
                            <Text style={styles.contentText}>预约时间：{item.reservationDate}</Text>
                            <Text style={styles.contentText}>预约额度：{item.reservationAmount}</Text>
                        </View>
                        {item.status === 1? <View style={styles.cardFooter}>
                            <Text style={styles.footerTitle}>反馈缘由：{item.rejectReason}</Text>
                            <Text style={styles.footerText}>备注：{item.rejectReason}</Text>
                        </View>: null}
                    </View>
                </View>
                <Image style={styles.sealImg} source={icon}/> 
            </TouchableOpacity>
        )
    }
    _keyExtractor = (item, index) => item.id.toString();

    render() { 
        const { list } = this.props
        return(
            <View style={styles.container}>
                <FlatList data = { list } keyExtractor={this._keyExtractor} onScroll={() => this.props.onEnd()}
                    renderItem = {this.renderCardItem }/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fafafa',
        paddingTop: unitWidth * 40,
    },
    cardBox: {
        paddingLeft: unitWidth * 20,
        paddingRight: unitWidth * 20,
        paddingBottom: unitWidth * 40,
    },
    cardBorder:{
        borderWidth: unitWidth * 2,
        borderRadius: unitWidth * 6,
        borderColor: '#e6e6e6',
    },
    cardTitle:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: unitWidth * 60,
        paddingLeft: unitWidth * 30,
        paddingRight: unitWidth * 10,
        backgroundColor: '#fafafa',
        borderBottomWidth: unitWidth * 2,
        borderColor: '#e6e6e6',
    },
    cardText:{
        color: '#808080',
        fontSize: unitWidth * 24,
        fontFamily:  'PingFang-SC-Medium',
    },
    cardBody: {
        paddingLeft: unitWidth * 30,
        backgroundColor: '#ffffff',
    },
    cardNameBox: {
        justifyContent: 'center',
        height: unitWidth * 90,
    },
    cardName:{
        color: '#333333',
        fontSize: unitWidth * 30,
        fontFamily:  'PingFang-SC-Medium',
    },
    cardContent:{
        borderTopWidth: unitWidth * 2,
        borderColor: '#e6e6e6',
        height: unitWidth * 220,
        paddingTop: unitWidth * 20,
    },
    contentText:{
        paddingTop: unitWidth * 6,
        paddingBottom: unitWidth * 6,
        color: '#333333',
        fontSize: unitWidth * 26,
        fontFamily:  'PingFang-SC-Regular',
    },
    sealImg:{
        position: 'absolute',
        right: 0,
        top: unitWidth * 120,
        width: unitWidth * 168,
        // height: unitWidth *  205,
        resizeMode: 'contain',
    },
    cardFooter:{
        height: unitWidth * 120,
        borderTopWidth: unitWidth * 2,
        borderColor: '#e6e6e6',
        paddingTop: unitWidth * 20,
        paddingBottom: unitWidth * 20,
    },
    footerTitle:{
        color: '#333333',
        fontSize: unitWidth * 28,
        fontFamily:  'PingFang-SC-Medium',
    },
    footerText:{
        color: '#808080',
        fontSize: unitWidth * 22,
        fontFamily:  'PingFang-SC-Medium',
        paddingTop: unitWidth * 10,
    },



    itemBg: {
        paddingLeft: unitWidth * 35,
        paddingRight: unitWidth * 35,
        backgroundColor: '#ffffff',
    },
    itemBox: {
        borderColor: '#e6e6e6',
        height: unitWidth * 85,
        // width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    borderTop: {
        borderTopWidth: unitWidth * 2,
    },
    itemLeft: {
        color: '#333333',
        fontSize: unitWidth * 28,
        fontFamily:  'PingFang-SC-Regular',
    },
    itemRight: {
        color: '#808080',
        fontSize: unitWidth * 26,
        fontFamily:  'PingFang-SC-Regular',
    },
});