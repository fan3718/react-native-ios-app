import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native'
import { connect } from 'react-redux' // 引入connect函数
import moment from 'moment' // 引入connect函数

import { unitWidth } from '../../config/AdapterUtil'
import * as poductAction from '../../actions/ProductAction' // 导入action方法
import * as httpAction from '../../actions/HttpAction' // 导入action方法
import { TipPop, Header, LongBtn} from '../../components'

class ProductOrder extends Component {
    constructor (props) {
        super(props)
        this.state = {
            amount: null,
            date:  moment(new Date()).format('YYYY-MM-DD'),
            memo: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.order && nextProps.type === 'SUBMIT_PRODUCTSORDER') {
            this.props.navigation.navigate('OrderSuccess',{...nextProps.order})
        }
    }
    goBack() {
        this.refs.input.blur()
        this.refs.inputs.blur()
        this.props.navigation.goBack()
    }

    submit() {
        this.refs.input.blur()
        this.refs.inputs.blur()
        if(!this.state.amount) {
            this.props.isError({
                msg: '请先填写预约额度，再提交',
                errorCode: 2,
            })
        }else if(parseFloat(this.state.amount) < this.props.navigation.state.params.minAmount) {
            this.props.isError({
                msg: '预约额度最少为'+ this.props.navigation.state.params.minAmount + '万',
                errorCode: 2,
            })
        }else {
            this.props.submitProductOrder({
                productId: this.props.navigation.state.params.id, // 产品id
                reservationAmount: this.state.amount, // 预约购买金额
                reservationDate: this.state.date, // 预约时间
                memo: this.state.memo, // 备注
            })
        }
    }

    render() {
        let  { product,  } = this.props
        return(
        <View style={styles.container}>
            <Header title= {'产品预约'} hasBack={true} back={this.goBack.bind(this)} props = {this.props.navigation}/>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.textLight}>{this.props.navigation.state.params.name}</Text>
                    <Text style={styles.textLittle}>当前预约产品</Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.itemBox}>
                    <Text style={styles.itemLeft}>预约额度</Text>
                    <View style={styles.itemBox}>
                        <TextInput style={styles.inputSingle} ref='input'
                        placeholder = {'请填写您的预约额度'} placeholderTextColor={'#808080'}
                        onChangeText={(amount) => this.setState({amount})}
                        value={this.state.amount}/>
                        <Text style={styles.itemRight}>万</Text>
                    </View>
                </View>
                <View style={styles.itemBox}>
                    <Text style={styles.itemLeft}>预约购买日期</Text>
                    <Text style={styles.itemRight}>{this.state.date}</Text>
                </View>
                <View style={styles.itemBox}>
                    <Text style={styles.itemLeft}>备注</Text>
                </View>
                <TextInput style={styles.inputMult}  multiline = {true} ref='inputs'
                onChangeText={(memo) => this.setState({memo})}
                value={this.state.memo}/>
            </View>
            <LongBtn title={'提交预约'} onPress={this.submit.bind(this)} />
            <TipPop navigation = {this.props.navigation} />
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
    textLight: {
        color: '#ffffff',
        fontSize: unitWidth * 36,
        fontFamily:  'PingFang-SC-Medium',
    },
    textLittle: {
        color: '#ffffff',
        fontSize: unitWidth * 24,
        fontFamily:  'PingFang-SC-Regular',
    },
    body: {
        marginTop: unitWidth * 40,
        marginBottom: unitWidth * 110,
        paddingLeft: unitWidth * 35,
        paddingRight: unitWidth * 35,
        paddingBottom: unitWidth * 20,
        backgroundColor: '#ffffff',
        borderColor: '#eeeeee',
        borderTopWidth: unitWidth * 2,
        borderBottomWidth: unitWidth * 2,
    },
    itemBox: {
        borderColor: '#e6e6e6',
        borderBottomWidth: unitWidth * 2,
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
    inputSingle: {
        textAlign: 'right',
        // backgroundColor: 'red',
        width: unitWidth * 240,
        marginRight: unitWidth * 15,
        color: '#808080',
        fontSize: unitWidth * 24,
        fontFamily:  'PingFang-SC-Regular',
    },
    inputMult: {
        height: unitWidth * 165,
        marginTop: unitWidth * 10,
        
        color: '#808080',
        fontSize: unitWidth * 24,
        fontFamily:  'PingFang-SC-Regular',
    },
});
export default connect(
    (state) => ({
      type: state.productsReducer.type,
      order: state.productsReducer.order,
    }),
    (dispatch) => ({
        submitProductOrder: (data) => dispatch(poductAction.submitProductOrder(data)),
        isError: (data) => dispatch(httpAction.isError(data)),
    })
)(ProductOrder)