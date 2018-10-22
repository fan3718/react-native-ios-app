import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native';
import { connect } from 'react-redux' // 引入connect函数

import { REMIND_TYPE, REMIND_SEQ } from '../../config/StaticData'
import { unitWidth } from '../../config/AdapterUtil'
import * as remindAction from '../../actions/RemindAction' // 导入action方法
import { TipPop, Header, Select, ListItem} from '../../components'

class EditRemind extends Component {
    constructor (props) {
        super(props)
        this.state = {
            reminderType: null, // 提醒类型
            customerName: null, // 客户姓名
            reminderDate: null, 
            seq: null, // 事项等级
            memo: '', // 备注信息
        }
        if(this.props.navigation.state.params && this.props.navigation.state.params.id){
            this.props.getRemindDetail({
                id: this.props.navigation.state.params.id
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.remind && nextProps.type === 'GOT_REMINDDETAIL') {
            this.setState({
                reminderType: nextProps.remind.reminderType, // 提醒类型
                customerName: nextProps.remind.customerName, // 客户姓名
                reminderDate: nextProps.remind.reminderDate.slice(0,16), 
                seq: nextProps.remind.seq, // 事项等级
                memo: nextProps.remind.memo, // 备注信息
            })
        }
    }

    goBack() {
        this.refs.input.blur()
        // this.props.navigation.navigate("JobCalendars");
        if(this.props.navigation.state.params && this.props.navigation.state.params.id) {
            this.props.navigation.state.params.callback()
        }
        this.props.navigation.goBack()
    }
    save() {
        this.refs.input.blur()
        if(this.props.navigation.state.params && this.props.navigation.state.params.id) {
            this.props.modifyRemind({
                ...this.state,
                id: this.props.navigation.state.params.id,
            })
        }else{
            this.props.addCustomer({
                ...this.state,
            })
        }
        
    }

    selected() {
        this.props.navigation.navigate("CustomerList")
    }

    onConfirm(value,type) {
        switch(type) {
            case 'reminderType': this.setState({ reminderType: value, });break
            case 'reminderDate': this.setState({ reminderDate: value, });break
            case 'seq': this.setState({ seq: value, });break
        }
        
    }
    render() {

        return(
            <View style={styles.container}>
                <Header hasBack={true} title={this.props.navigation.state.params && this.props.navigation.state.params.id? '编辑事项': '新建事项'} back={this.goBack.bind(this)}
                nextTitle={'保存'} next = {this.save.bind(this)}/>
                <View style={styles.body}>
                    <Select options = {{label: '提醒类型', value: this.state.reminderType, placeholder: ' 请选择类型', key:'reminderType',
                    dataList: REMIND_TYPE.array }}  onConfirm = {this.onConfirm.bind(this)} />
                    <ListItem item = {{label: '客户名称', value: this.state.customerName || '请选择客户', placeholder: '请选择客户',type:'link'}} leftText={styles.leftText} rightText={styles.rightText} hasTop={false} hasBottom ={true}  press={this.selected.bind(this)}/>
                    <Select options = {{label: '提醒时间', value: this.state.reminderDate, placeholder: ' 请选择时间', key:'reminderDate', type: 'datetime' }}  onConfirm = {this.onConfirm.bind(this)} />
                    <Select options = {{label: '事项等级', value: this.state.seq, placeholder: ' 请选择等级', key:'seq',
                    dataList: REMIND_SEQ.array }}  onConfirm = {this.onConfirm.bind(this)} />
                    <View style={styles.itemBox}>
                        <Text style={styles.itemLeft}>备注</Text>
                    </View>
                    <TextInput ref='input' style={styles.inputMult}  multiline = {true} placeholder={'请填写备注（字数限制在30字以内）'} placeholderTextColor={'#cccccc'} maxLength={30}
                    onChangeText={(memo) => this.setState({memo: memo})}
                    value={this.state.memo}/>
                </View>
                <Text style={styles.limitText}>({this.state.memo.length}/30)</Text>
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
        marginTop: unitWidth * 40,
        backgroundColor: '#ffffff',
    },
    leftText: {
        color: '#333333',
        fontSize: unitWidth * 28,
        fontFamily:  'PingFang-SC-Medium',
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
    },
    itemLeft: {
        color: '#333333',
        fontSize: unitWidth * 28,
        fontFamily:  'PingFang-SC-Medium',
    },
    inputMult: {
        height: unitWidth * 120,
        width: '100%',
        // marginTop: unitWidth * 10,
        paddingLeft: unitWidth * 35,
        paddingRight: unitWidth * 35,
        color: '#cccccc',
        fontSize: unitWidth * 28,
        fontFamily:  'PingFang-SC-Regular',
    },
    limitText: {
        paddingTop: unitWidth * 20,
        paddingRight: unitWidth * 35,
        textAlign: 'right',
        color: '#a8934b',
        fontSize: unitWidth * 28,
        fontFamily:  'PingFang-SC-Regular',
    },
});
export default connect(
    (state) => ({
        type: state.remindReducer.type,
        remind: state.remindReducer.remind,
    }),
    (dispatch) => ({
        getRemindDetail: (data) => dispatch(remindAction.getRemindDetail(data)),
        addRemind: (data) => dispatch(remindAction.addRemind(data)),
        modifyRemind: (data) => dispatch(remindAction.modifyRemind(data)),
    })
)(EditRemind)