import React, { Component } from 'react';
import { 
    View,
    Text, 
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage
} from 'react-native'
import Icon from 'react-native-vector-icons/Octicons'
import { connect } from 'react-redux' // 引入connect函数

import { unitWidth } from '../../config/AdapterUtil'
import * as orderAction from '../../actions/OrderAction' // 导入action方法
import { TipPop, Header, LongBtn, List} from '../../components/index'

class OrderDetail extends Component {
    constructor (props) {
        super(props)
        AsyncStorage.getItem('token')
            .then((value) => {
                let jsonValue = JSON.parse((value));
                global.token = jsonValue
                console.info(jsonValue)
                this.setState({
                    token: global.token, 
                })
                // this.props.getOrderDetail({
                //     token: global.token,
                //     id: this.props.navigation.state.params.id,
                // })
            })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.type === 'ACCEPT_ORDER') {
            this.goBack.bind(this)
        }
    }

    goBack() {
        this.props.navigation.navigate("MyOrder");
    }

    goNext(id) {
        this.props.navigation.navigate("FeedBack",{id: id});
    }

    accept() {
        console.info(231)
        // this.props.acceptOrder({
        //     token: global.token,
        //     id: this.state.id, 
        // })
    }

    render() {
        let  { orderDetail } = this.props
        let orderContent = [
            { label: '客户姓名', value: orderDetail.customerName, id: 0, noBorder: true},
            { label: '预约额度', value: orderDetail.reservationAmount + '万', id: 1, },
            { label: '预约时间', value: orderDetail.reservationDate, id: 2, },
            { label: '产品编码', value: orderDetail.no, id: 3, },
            { label: '产品名称', value: orderDetail.productName, id: 4, },
        ]
        return(
            <View>
                <Header hasBack={true} title={'预约详情'} back={this.goBack.bind(this)}
                nextTitle = { orderDetail.status === 2?   '放弃' : null } next = {this.goNext.bind(this,orderDetail.id)}/>
                <View style = { styles.body }>
                    <List list={orderContent} leftText = {styles.leftText} rightText = {styles.rightText} childRender = {<View style = { styles.otherItem }>
                        <Text style = { styles.otherLeft }>电话号码</Text>
                        <Text style = { styles.otherRight }>{orderDetail.mobile}</Text>
                    </View>} />
                </View>
                {
                    orderDetail.status === 2? <LongBtn title={'接受预约'} onPress={this.accept.bind(this)} /> : null
                }
                
                <TipPop navigation = {this.props.navigation} />
            </View>
        )
    }

}
const styles = StyleSheet.create({
    body: {
        paddingTop: unitWidth * 40,
    },
    otherItem: {
        borderColor: '#e6e6e6',
        borderTopWidth: unitWidth * 2,
        borderBottomWidth: unitWidth * 2,
        height: unitWidth * 85,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: unitWidth * 20,
        marginBottom: unitWidth * 90,
        paddingLeft: unitWidth * 35,
        paddingRight: unitWidth * 35,
        backgroundColor: '#ffffff',
    },
    otherLeft: {
        color: '#333333',
        fontSize: unitWidth * 28,
        fontFamily:  'PingFang-SC-Medium',
    },
    otherRight: {
        width: '60%',
        textAlign: 'right',
        color: '#a8934b',
        fontSize: unitWidth * 28,
        fontFamily:  'PingFang-SC-Medium',
    },
    
    leftText: {
        fontFamily:  'PingFang-SC-Medium',
    },
    rightText: {
        color: '#333333',
        fontSize: unitWidth * 28,
        fontFamily:  'PingFang-SC-Regular',
    },
});
export default connect(
    (state) => ({
      type: state.orderReducer.type,
      orderDetail: state.orderReducer.orderDetail || {
        id: 1, // 预约单id
        no: 'PHCFTZ0000461807160001', // 预约单号
        productName: '产品名称', // 产品名称
        customerName: '客户姓名', // 客户姓名
        mobile: '15201128511', // 手机号
        status: 2, // 预约状态 待受理2 已确认5  已拒绝1
        reservationAmount: 100, // 预约购买额度
        reservationDate: '2017-07-27', // 预约购买日期
        signAmount: 100, // 签约金额
        currency: 1, // 币种 1：元；2：美元；3：欧元；4：英镑；5：港币；6：瑞士法郎；
        signDate: '2017-07-27 09:21:22', // 签约日期
        reserveSource: 1, // 预约单来源 1：客户预约 2：咨询顾问预约 3：后台录入
        rejectReason: '反馈信息', // 反馈信息
      },
    }),
    (dispatch) => ({
        getOrderDetail: (data) => dispatch(orderAction.getOrderDetail(data)),
        acceptOrder: (data) => dispatch(orderAction.acceptOrder(data)),
    })
)(OrderDetail)