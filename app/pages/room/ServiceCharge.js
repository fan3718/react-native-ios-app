import React, { Component } from 'react';
import { 
    View,
    FlatList,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Octicons'
import { connect } from 'react-redux' // 引入connect函数

import { unitWidth } from '../../config/AdapterUtil'
import * as roomAction from '../../actions/RoomAction' // 导入action方法
import { TipPop, Header, LongBtn, List} from '../../components/index'

class ServiceCharge extends Component {
    constructor (props) {
        super(props)
        this.state ={
            page: 1,
            limit: 20,
        }
        this.props.getServiceList(this.state)
    }


    goBack() {
        this.props.navigation.goBack();
    }

    _keyExtractor = (item, index) => index.toString();

    renderChargeItem = ({ item }) => {
        let list = [
            { label: '产品名称', value: 'xxxxxx', id: 0,},
            { label: '成交时间', value: item.ym, id: 1, },
            { label: '服务费', value: item.commission, id: 2, },
        ]
        return(
            <View style={styles.chargeBox}>
                <List list={list} leftText = {styles.leftText} rightText ={styles.rightText} />
            </View>
            
        )
    }


    render() {
        let { serviceList } = this.props
        return(
            <View style={styles.container}>
                <Header hasBack={true} title={'服务费详情'} back={this.goBack.bind(this)}/>
                <View style={styles.body}>
                    <FlatList data = { serviceList['list'] } keyExtractor={this._keyExtractor}
                    renderItem = {this.renderChargeItem }/>
                </View>
                <TipPop navigation = {this.props.navigation} />
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9f9f9',
    },
    chargeBox: {
        marginTop: unitWidth * 40,
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
      type: state.roomReducer.type,
      serviceList: state.roomReducer.serviceList || {},
    }),
    (dispatch) => ({
        getServiceList: (data) => dispatch(roomAction.getServiceList(data)),
    })
)(ServiceCharge)