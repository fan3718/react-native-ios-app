import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
} from 'react-native'
import { connect } from 'react-redux' // 引入connect函数

import { GENDER, REMIND_SOURCE, CONTACT_TIME, INTENTION } from '../../config/StaticData'
import { unitWidth } from '../../config/AdapterUtil'
import * as customerAction from '../../actions/CustomerAction' // 导入action方法
import * as httpAction from '../../actions/HttpAction' // 导入action方法
import { TipPop, Header, List, } from '../../components'

class EditCustomer extends Component {

    constructor (props) {
        super(props)
        this.state = {
            name: '', // 客户姓名
            source: '', // 客户来源 1,员工推荐  2,老客户推荐  3,市场活动 4,电话销售 5,内部员工  6,销售人员自有资源  7,老客户续投  8,后台录入 9,其他销售方式
            gender: '', // 称呼 性别 0,女 1，男
            mobile: '', // 手机号
            wechatId: '', // 微信号
            email: '', // 邮箱
            contactTime: '', // 可联系时间 1.工作日上班时间 2.工作日非上班时间18：00--22:00 3.节假日10:00--18:00
            intention: '', // 客户意向 1非常有意向 2较有意向 3一般需继续了解 4可能性较小或尚未明确情况 5可能性极小或不可能
            province: '', // 省
            city: '', // 市
            age: '', // 年龄
            profession: '', // 职业
            birthday: '', // 出生日期
            birthdayRemindDate: '', // 生日提醒日期
            hobby: '', // 兴趣爱好
            documentNoType: 1, // 证件类型 1身份证 2军官证 3签证
            documentNo: '', // 证件号码
            address: '', // 联系地址
            investAmount: '', // 可投资金额
            bank: '', // 开户行
            bankAcount: '', // 银行账户 
            memo: '', // 备注
            areaText: '',
            blur: false,
        }
        this.props.getAreaTree()
        if(this.props.navigation.state.params && this.props.navigation.state.params.id) {
            this.props.getCustomerDetail({id:this.props.navigation.state.params.id})
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.type === 'ADD_CUSTOMER' || nextProps.type === 'MODIFY_CUSTOMER') {
            this.props.navigation.navigate("CustomerList")
        }
        if(nextProps.customer && nextProps.type === 'GOT_CUSTOMERDETAIL') {
            this.setState({
                ...nextProps.customer
            })
        }
        if(nextProps.areaTree && nextProps.areaTree.length > 0 && nextProps.customer &&  nextProps.customer['province']) {
            this.getArea(nextProps)
        }
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

    goBack() {
        this.setState({
            blur: true
        })
        this.refs.input.blur()
        this.props.navigation.goBack()
    }
    save() {
        if(this.state.name === '') {
            this.props.isError({msg:'请填写客户姓名',errorCode: 2})
            return false;
        }else if(this.state.gender === '') {
            this.props.isError({msg:'请选择称呼',errorCode: 2})
            return false;
        }else if(this.state.contactTime === '') {
            this.props.isError({msg:'请选择可联系时间',errorCode: 2})
            return false;
        }else if(this.state.source === '') {
            this.props.isError({msg:'请选择客户来源',errorCode: 2})
            return false;
        }else if(this.state.mobile === '') {
            this.props.isError({msg:'请填写手机号',errorCode: 2})
            return false;
        }else if(this.state.age === '') {
            this.props.isError({msg:'请填写年龄',errorCode: 2})
            return false;
        }else if(this.state.investAmount === '') {
            this.props.isError({msg:'请填写可投资金额',errorCode: 2})
            return false;
        }
        //input 失去焦点，键盘收回
        this.refs.input.blur()
        this.setState({
            blur: true
        })
        let params = this.state
        delete params['blur']
        if(this.props.navigation.state.params && this.props.navigation.state.params.id) {
            this.props.modifyCustomer({
                ...params,
                id: this.props.navigation.state.params.id,
            })
        }else{
            this.props.addCustomer({
                ...params,
            })
        }
    }

    editState(value, type) {
        switch(type) {
            case 'name': this.setState({ name: value, });break
            case 'gender': this.setState({ gender: value, });break
            case 'source': this.setState({ source: value, });break
            case 'province': this.setState({ province: value[0], city: value[1]});break
            case 'intention': this.setState({ intention: value, });break
            case 'mobile': this.setState({ mobile: value, });break
            case 'wechatId': this.setState({ wechatId: value, });break
            case 'email': this.setState({ email: value, });break
            case 'contactTime': this.setState({ contactTime: value, });break
            case 'age': this.setState({ age: value, });break
            case 'profession': this.setState({ profession: value, });break
            case 'birthday': this.setState({ birthday: value, });break
            case 'birthdayRemindDate': this.setState({ birthdayRemindDate: value, });break
            case 'hobby': this.setState({ hobby: value, });break
            case 'documentNo': this.setState({ documentNo: value, });break
            case 'address': this.setState({ address: value, });break
            case 'investAmount': this.setState({ investAmount: value, });break
            case 'bank': this.setState({ bank: value, });break
            case 'bankAcount': this.setState({ bankAcount: value, });break
        }
        
    }

    render() {
        let mainList = [
            {   label: '客户姓名', value: this.state.name, key : 'name', type: 'input', 
                placeholder: '请输入姓名'},
            {   label: '称呼', value: this.state.gender, key : 'gender', type: 'select',
                placeholder: '请选择称呼', dataList: GENDER.array },
            {   label: '客户来源', value: this.state.source, key : 'source', type: 'select',
                placeholder: '请选择客户来源', dataList: REMIND_SOURCE.array},
            {   label: '所在地区', value: [this.state.province,this.state.city], key : 'province', type: 'region',
                placeholder: '请选择客户所在地区', dataList: this.props.areaTree},
            {   label: '客户意向', value: this.state.intention, key : 'intention', type: 'select',
                placeholder: '请选择客户意向', dataList: INTENTION.array},
            {   label: '可联系时间', value: this.state.contactTime, key : 'contactTime', type: 'select',
                placeholder: '请选择可联系时间', dataList: CONTACT_TIME.array, disBottom: true,},
        ]
        let detailList = [
            {   label: '手机号码', value: this.state.mobile, key : 'mobile', type: 'input', 
                placeholder: '请输入手机号码'},
            {   label: '微信号码', value: this.state.wechatId, key : 'wechatId', type: 'input', 
            placeholder: '请输入微信号码'},
            {   label: '电子邮箱', value: this.state.email, key : 'email', type: 'input', 
            placeholder: '请输入电子邮箱'},
            {   label: '年龄', value: this.state.age, key : 'age', type: 'input', 
            placeholder: '请输入年龄',extra: '岁'},
            {   label: '职业', value: this.state.profession, key : 'profession', type: 'input', 
            placeholder: '请输入职业'},
            {   label: '出生日期', value: this.state.birthday, key : 'birthday', type: 'date', 
            placeholder: '请选择出生日期'},
            {   label: '设置生日提醒', value: this.state.birthdayRemindDate, key : 'birthdayRemindDate', type: 'noyear', 
            placeholder: '请设置生日提醒'},
            {   label: '兴趣爱好', value: this.state.hobby, key : 'hobby', type: 'input', 
            placeholder: '请输入爱好'},
            {   label: '身份证号', value: this.state.documentNo, key : 'documentNo', type: 'input', 
            placeholder: '请输入身份证号'},
            {   label: '联系地址', value: this.state.address, key : 'address', type: 'input', 
            placeholder: '请输入客户地址', disBottom: true,},
        ]
        let backList = [
            {   label: '可投资金额', value: this.state.investAmount, key : 'investAmount', type: 'input', 
            placeholder: '请输入金额',extra: '万'},
            {   label: '开户行', value: this.state.bank, key : 'bank', type: 'input', 
            placeholder: '请输入开户行'},
            {   label: '银行账户', value: this.state.bankAcount, key : 'bankAcount', type: 'input', 
            placeholder: '请输入银行账户', disBottom: true,},
        ]

        return(
            <View style={styles.container}>
                <Header hasBack={true} title={this.props.navigation.state.params && this.props.navigation.state.params.id? '编辑客户': '新建客户'} back={this.goBack.bind(this)}
                nextTitle={'完成'} next = {this.save.bind(this)}/>
                <ScrollView style={styles.body}>
                    <List style = {styles.listBox} blur = {this.state.blur} list={mainList} editState={this.editState.bind(this)} leftText = {styles.leftText} rightText ={styles.rightText} />
                    <List style = {styles.listBox}  blur = {this.state.blur}  list={detailList} editState={this.editState.bind(this)} leftText = {styles.leftText} rightText ={styles.rightText} />
                    <List style = {styles.listBox}  blur = {this.state.blur}  list={backList} editState={this.editState.bind(this)} leftText = {styles.leftText} rightText ={styles.rightText} 
                    />
                    <View style={styles.itemBox}>
                        <Text style={styles.itemLeft}>备注</Text>
                    </View>
                    <TextInput ref='input' style={styles.inputMult}  multiline = {true} placeholder={'请填写备注'} placeholderTextColor={'#cccccc'}
                    onChangeText={(memo) => this.setState({memo: memo})}
                    value={this.state.memo}/>
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
});
export default connect(
    (state) => ({
        type: state.customerReducer.type,
        customer: state.customerReducer.customer,
        areaTree: state.customerReducer.areaTree,
    }),
    (dispatch) => ({
        modifyCustomer: (data) => dispatch(customerAction.modifyCustomer(data)),
        getCustomerDetail: (data) => dispatch(customerAction.getCustomerDetail(data)),
        addCustomer: (data) => dispatch(customerAction.addCustomer(data)),
        getAreaTree: (data) => dispatch(customerAction.getAreaTree(data)),
        isError: (data) => dispatch(httpAction.isError(data)),
    })
)(EditCustomer)