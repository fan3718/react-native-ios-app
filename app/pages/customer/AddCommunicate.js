import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native';
import { connect } from 'react-redux' // 引入connect函数

import { unitWidth } from '../../config/AdapterUtil'
import * as customerAction from '../../actions/CustomerAction' // 导入action方法
import { TipPop, Header, Select, ListItem} from '../../components'

class AddCommunicate extends Component {
    constructor (props) {
        super(props)
        this.state = {
            customerId: this.props.navigation.state.params.id, // 客户id
            customerName: this.props.navigation.state.params.name, // 客户姓名
            communicationTime: null, // 沟通时间
            remindTime: null, // 下次提醒时间
            communicationContent: '', // 沟通内容
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.type === 'ADD_COMMUNICATE') {
            this.props.navigation.goBack()
        }
    }

    goBack() {
        this.props.navigation.goBack()
    }

    save() {
        this.refs.input.blur()
        console.info(this.state)
        if(this.props.navigation.state.params && this.props.navigation.state.params.id) {
            this.props.addCommunicate({
                ...this.state,
                id: this.props.navigation.state.params.id,
            })
        }
        
    }

    onConfirm(value, type) {
        switch(type) {
            case 'communicationTime': this.setState({ communicationTime: value, });break
            case 'remindTime': this.setState({ remindTime: value, });break
        }
        
    }
    render() {

        return(
            <View style={styles.container}>
                <Header hasBack={true} title={'添加沟通记录'} back={this.goBack.bind(this)}
                nextTitle={'保存'} next = {this.save.bind(this)}/>
                <View style={styles.body}>
                    <ListItem item = {{ label: '客户姓名', value: this.state.customerName }} leftText={styles.leftText} rightText={styles.rightText}/>
                    <Select options = {{label: '沟通时间', value: this.state.communicationTime, placeholder: ' 请选择时间', key:'communicationTime', type: 'datetime' }}  onConfirm = {this.onConfirm.bind(this)} />
                    <Select options = {{label: '下次提醒时间', value: this.state.remindTime, placeholder: ' 请选择时间', key:'remindTime', type: 'datetime' }}  onConfirm = {this.onConfirm.bind(this)} />
                    <View style={styles.itemBox}>
                        <Text style={styles.itemLeft}>备注</Text>
                    </View>
                    <TextInput ref='input' style={styles.inputMult}  multiline = {true} placeholder={'请填写沟通记录（字数限制在200字以内）'} placeholderTextColor={'#cccccc'} maxLength={200}
                    onChangeText={(text) => this.setState({communicationContent: text})}
                    value={this.state.communicationContent}/>
                </View>
                <Text style={styles.limitText}>({this.state.communicationContent.length}/200)</Text>
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
        height: unitWidth * 240,
        width: '100%',
        paddingBottom: unitWidth * 20,
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
        type: state.customerReducer.type,
    }),
    (dispatch) => ({
        addCommunicate: (data) => dispatch(customerAction.addCommunicate(data)),
    })
)(AddCommunicate)