import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native'
import { connect } from 'react-redux' // 引入connect函数
import { NavigationActions } from 'react-navigation'
import moment from 'moment' // 引入connect函数

import { unitWidth } from '../../config/AdapterUtil'
import * as orderAction from '../../actions/OrderAction' // 导入action方法
import * as httpAction from '../../actions/HttpAction' // 导入action方法
import { PRODUCT, PRODUCT_STATUS, CURRENCY } from '../../config/StaticData'
import { TipPop, Header, LongBtn} from '../../components'


class FeedBack extends Component {
    constructor (props) {
        super(props)
        this.state = {
            feedBack: '',
            id: this.props.navigation.state.params.id,
        }
        AsyncStorage.getItem('token')
            .then((value) => {
                let jsonValue = JSON.parse((value));
                global.token = jsonValue
                // console.info(jsonValue)
            })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.type === 'ACCEPT_ORDER') {
            this.props.navigation.navigate("MyOrder");
        }
    }

    goBack() {
        this.props.navigation.navigate("OrderDetail");
    }

    submit() {
        this.props.navigation.navigate("MyOrder");
        if(!this.state.amount) {
            this.props.isError({
                msg: '请先填写反馈缘由，再点击确认发送',
                errorCode: 2,
            })
        }else {
            this.props.sendFeedback({
                token: global.token,
                feedBack: this.state.feedBack, // 产品id
                id: this.state.id, 
            })
        }
    }

    render() {
        return(
        <View style={styles.container}>
            <Header title= {'发送反馈'} hasBack={true} back={this.goBack.bind(this)} props = {this.props.navigation}/>
            <View style={styles.body}>
                <View style={styles.itemBox}>
                    <Text style={styles.itemLeft}>反馈缘由</Text>
                </View>
                <TextInput style={styles.inputMult}  multiline = {true} placeholder = {'在这里天蝎给客户的反馈信息'} placeholderTextColor={'#cccccc'}
                onChangeText={(feedBack) => this.setState({feedBack})}
                value={this.state.feedBack}/>
            </View>
            <LongBtn title={'确认发送'} onPress={this.submit.bind(this)} />
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
    body: {
        marginTop: unitWidth * 40,
        marginBottom: unitWidth * 400,
        paddingBottom: unitWidth * 20,
        backgroundColor: '#ffffff',
        borderColor: '#eeeeee',
        borderTopWidth: unitWidth * 2,
        borderBottomWidth: unitWidth * 2,
    },
    itemBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#e6e6e6',
        borderBottomWidth: unitWidth * 2,
        height: unitWidth * 85,
        // width: '100%',
        paddingLeft: unitWidth * 35,
        paddingRight: unitWidth * 35,
    },
    itemLeft: {
        color: '#333333',
        fontSize: unitWidth * 28,
        fontFamily:  'PingFang-SC-Medium',
    },
    inputMult: {
        height: unitWidth * 310,
        padding: unitWidth * 35,
        paddingTop: unitWidth * 35,
        color: '#333333',
        fontSize: unitWidth * 24,
        fontFamily:  'PingFang-SC-Regular',
    },
});
export default connect(
    (state) => ({
      type: state.productsReducer.type,
    }),
    (dispatch) => ({
        sendFeedback: (data) => dispatch(orderAction.sendFeedback(data)),
        isError: (data) => dispatch(httpAction.isError(data)),
    })
)(FeedBack)