import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux' // 引入connect函数

import { REMINDTYPE, REMINDSEQ } from '../../config/StaticData'
import { unitWidth } from '../../config/AdapterUtil'
import * as remindAction from '../../actions/RemindAction' // 导入action方法
import { TipPop, Header, List} from '../../components'

class ViewRemind extends Component {
    constructor (props) {
        super(props)
        this.props.getRemindDetail({
            id: this.props.navigation.state.params.id
        })
    }

    upDate() {
        this.props.getRemindDetail({
            id: this.props.navigation.state.params.id
        })
    }

    goBack() {
        // this.props.navigation.navigate("JobCalendars");
        this.props.navigation.goBack()
    }

    edit() {
        this.props.navigation.navigate("EditRemind",{id:this.props.remind.id,callback: this.upDate.bind(this)});
    }

    render() {
        let { remind } = this.props
        let list = [
            { label: '提醒类型', value: REMINDTYPE.object[remind['reminderType']], id: 0,},
            { label: '客户名称', value: remind['customerName'], id: 1, },
            { label: '提醒时间', value: remind['reminderDate'], id: 2, },
            { label: '事项等级', value: REMINDTYPE.object[remind['seq']], id: 3, hasBottom: false},
            { label: '备注', value: '', id: 4, },
        ]
        return(
            <View style={styles.container}>
                <Header hasBack={true} title={'待办事项'} back={this.goBack.bind(this)}
                nextTitle={'编辑'} next = {this.edit.bind(this)}/>
                <View style={styles.body}>
                    
                    <List rightText={styles.rightText} leftText = {styles.itemLeft} list={list} childRender = {
                        <View>
                            <Text style = { styles.inputMult }>{remind.memo}</Text>
                        </View>} />
                </View>
                { remind['memo'] ? <Text style={styles.limitText}>({remind.memo.length}/30)</Text> : null}
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
        remind: state.remindReducer.remind || {},
    }),
    (dispatch) => ({
        getRemindDetail: (data) => dispatch(remindAction.getRemindDetail(data)),
    })
)(ViewRemind)