import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native'
import { connect } from 'react-redux' // 引入connect函数

import { GENDER, REMIND_SOURCE, CONTACT_TIME, INTENTION } from '../../config/StaticData'
import { unitWidth } from '../../config/AdapterUtil'
import * as customerAction from '../../actions/CustomerAction' // 导入action方法
import { TipPop, Header, List} from '../../components'

class ViewCustomer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            areaText: null
        }
        this.props.getAreaTree()
        this.props.getCustomerDetail({id:this.props.navigation.state.params.id})
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.areaTree && nextProps.areaTree.length > 0 && nextProps.customer['province']) {
            this.getArea(nextProps)
        }
    } 

    goBack() {
        this.props.navigation.goBack()
    }
    next() {
        this.props.navigation.navigate("EditCustomer",{id: this.props.navigation.state.params.id})
    }

    getArea(nextProps) {
        let areaTree = nextProps.areaTree || []
        let text = ''
        areaTree.forEach((item)=>{
            if(item.id === nextProps.customer['province']) {
                let cities = item.children || []
                text += item.name + ' '
                cities.forEach((city)=>{
                    text += city.id === nextProps.customer['city'] ? city.name : ''
                })
            }
        })
        this.setState({
            areaText: text
        })
    }

    toAddCommunicate() {
        this.props.navigation.navigate("AddCommunicate",{id: this.props.navigation.state.params.id,name: this.props.customer['name']})
    }

    render() {
        let { customer } = this.props
        let mainList = [
            {   label: '客户姓名', value: customer['name'],},
            {   label: '称呼', value: GENDER.object[customer['gender']],},
            {   label: '客户来源', value: REMIND_SOURCE.object[customer['source']], dataList: REMIND_SOURCE.array},
            {   label: '所在地区', value: this.state.areaText, dataList: this.props.areaTree},
            {   label: '客户意向', value: INTENTION.object[customer['intention']], },
            {   label: '可联系时间', value: CONTACT_TIME.object[customer['contactTime']], disBottom: true,},
        ]
        let detailList = [
            {   label: '手机号码', value: customer['mobile'],},
            {   label: '微信号码', value: customer['wechatId'],},
            {   label: '电子邮箱', value: customer['email'], },
            {   label: '年龄', value: customer['age'], extra: '岁'},
            {   label: '职业', value: customer['profession'], },
            {   label: '出生日期', value: customer['birthday'],},
            {   label: '设置生日提醒', value: customer['birthdayRemindDate'], },
            {   label: '兴趣爱好', value: customer['hobby'], },
            {   label: '身份证号', value: customer['documentNo'], },
            {   label: '联系地址', value: customer['address'], disBottom: true,},
        ]
        let backList = [
            {   label: '可投资金额', value: customer['investAmount'], extra: '万'},
            {   label: '开户行', value: customer['bank'],},
            {   label: '银行账户', value: customer['bankAcount'], disBottom: true,},
        ]

        return(
            <View style={styles.container}>
                <Header hasBack={true} title={'客户详情'} back={this.goBack.bind(this)}
                nextTitle={'编辑'} next = {this.next.bind(this)}/>
                <ScrollView style={styles.body}>
                    <List style = {styles.listBox} list={mainList} leftText = {styles.leftText} rightText ={styles.rightText} />
                    <View style = { [styles.listBox,styles.linkItem] }>
                        <Text style = { styles.linkLeft }>沟通记录</Text>
                        <Text style = { styles.linkRight } onPress = {this.toAddCommunicate.bind(this)}>添加沟通记录</Text>
                    </View>
                    <List style = {styles.listBox} list={detailList} leftText = {styles.leftText} rightText ={styles.rightText} />
                    <List style = {styles.listBox} list={backList} leftText = {styles.leftText} rightText ={styles.rightText} />
                    <View style={styles.itemBox}>
                        <Text style={styles.itemLeft}>备注</Text>
                    </View>
                    <Text style={styles.inputMult}>{customer['memo']}</Text>
                </ScrollView>
                <TipPop navigation = {this.props.navigation} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    body: {
        // paddingTop: unitWidth * 40,
        // paddingBottom: unitWidth * 80,
    },
    listBox: {
        marginTop: unitWidth * 40,
        backgroundColor: '#ffffff',
        borderColor: '#e6e6e6',
        borderBottomWidth: unitWidth * 2,
        borderTopWidth: unitWidth * 2,
    },
    leftText: {
        color: '#333333',
        fontSize: unitWidth * 28,
        fontFamily:  'PingFang-SC-Regular',
    },
    rightText: {
        color: '#333333',
        fontSize: unitWidth * 28,
        fontFamily:  'PingFang-SC-Regular',
    },
    itemBox: {
        height: unitWidth * 85,
        // width: '100%',
        paddingLeft: unitWidth * 35,
        paddingRight: unitWidth * 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
    },
    inputMult: {
        backgroundColor: '#ffffff',
        height: unitWidth * 180,
        width: '100%',
        marginBottom: unitWidth * 60,
        paddingLeft: unitWidth * 35,
        paddingRight: unitWidth * 35,
        color: '#cccccc',
        fontSize: unitWidth * 28,
        fontFamily:  'PingFang-SC-Regular',
    },
    linkItem: {
        height: unitWidth * 85,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: unitWidth * 35,
        paddingRight: unitWidth * 35,
    },
    linkLeft: {
        color: '#333333',
        fontSize: unitWidth * 28,
        fontFamily:  'PingFang-SC-Regular',
    },
    linkRight: {
        width: '60%',
        textAlign: 'right',
        color: 'rgb(168,147,75)',
        fontSize: unitWidth * 26,
        fontFamily:  'PingFang-SC-Regular',
    },
});
export default connect(
    (state) => ({
        type: state.customerReducer.type,
        customer: state.customerReducer.customer || {},
        areaTree: state.customerReducer.areaTree,
    }),
    (dispatch) => ({
        getCustomerDetail: (data) => dispatch(customerAction.getCustomerDetail(data)),
        getAreaTree: (data) => dispatch(customerAction.getAreaTree(data)),
    })
)(ViewCustomer)