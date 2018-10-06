import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import { connect } from 'react-redux' // 引入connect函数
import { NavigationActions } from 'react-navigation'

import { unitWidth } from '../../config/AdapterUtil'
import * as poductAction from '../../actions/ProductAction' // 导入action方法
import { PRODUCT, PRODUCT_STATUS, CURRENCY } from './../../config/StaticData'
import { TipPop, Header, ProductDetailCard, LongBtn} from '../../components/index'

const backAction = NavigationActions.navigate({
    routeName: 'BottomTabNavigator',
    actions: NavigationActions.navigate({routeName: 'BottomTabNavigator',})
})

const toAction = NavigationActions.navigate({
    routeName: 'ProductOrder',
    actions: NavigationActions.navigate({routeName: 'ProductOrder',})
})

class ProductDetail extends Component {
    constructor (props) {
        super(props)
        
        // this.props.navigation.goBack('ServicePage');
        // console.info(this.props)
    }

    componentWillReceiveProps(nextProps) {
        // console.info(nextProps)
        // if(nextProps.productDetail && nextProps.type === 'GOT_PRODUCTSDETAIL') {
        //     console.info(nextProps)
        // }
    }

    goBack() {
        this.props.navigation.dispatch(backAction)
    }

    toOrder() {
        this.props.navigation.dispatch(toAction)
    }
    changeTab(index) {
        if(index === 2 && !this.props.account) {
            // this.props.getProductsDetail({
            //     id: '1',
            //     token: global.token
            // })
        }
    }

    render() {
        let  { product,  } = this.props
        return(
        <View style={styles.container}>
            <Header title= {'产品详情'} hasBack={true} back={this.goBack.bind(this)} props = {this.props.navigation}/>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.textLight}>{product.netValue}</Text>
                    <Text style={styles.textLittle}>当前净值</Text>
                    <View style={styles.textNameBox}>
                        <Text style={styles.textName}>{product.productReview}</Text>
                    </View>
                </View>
                <View style={styles.headerTab}>
                    <View style={[styles.tabBox,styles.rightBorder]}>
                        <Text style={styles.tabTextBig}>{product.riskyIcon}</Text>
                        <Text style={styles.textLittle}>风险等级</Text>
                    </View>
                    <View style={[styles.tabBox,styles.rightBorder]}>
                        <Text style={styles.tabTextBig}>{product.minAmount}万{CURRENCY[product.currency]}</Text>
                        <Text style={styles.textLittle}>起投金额</Text>
                    </View>
                    <View style={styles.tabBox}>
                        <Text style={styles.tabTextBig}>{PRODUCT_STATUS[product.status]}</Text>
                        <Text style={styles.textLittle}>状态</Text>
                    </View>
                </View>
            </View>
            <ProductDetailCard props = {this.props} changeTab={this.changeTab.bind(this)} />
            <LongBtn title={'预约产品'} onPress={this.toOrder.bind(this)} />
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
        // height: unitWidth * 360,
        backgroundColor: 'rgb(168,147,75)',
    },
    headerContent: {
        alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: unitWidth * 60,
        paddingBottom: unitWidth * 30,
    },
    textLight: {
        color: '#ffffff',
        fontSize: unitWidth * 72,
        fontFamily:  'PingFang-SC-Light',
    },
    textLittle: {
        color: '#ffffff',
        fontSize: unitWidth * 22,
        fontFamily:  'PingFang-SC-Regular',
    },
    textNameBox: {
        marginTop: unitWidth * 25,
        paddingLeft: unitWidth * 30,
        paddingRight: unitWidth * 30,
        borderColor: '#ffffff',
        borderWidth: 1,
        borderRadius: unitWidth * 30,
    },
    textName: {
        color: '#ffffff',
        fontSize: unitWidth * 24,
        fontFamily:  'PingFang-SC-Regular',
    },
    headerTab: {
        flexDirection: 'row',
        borderColor: 'rgb(157,134,60)',
        borderTopWidth: unitWidth * 2,
    },
    tabBox: {
        width: '33%',
        height: unitWidth * 90,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightBorder: {
        borderColor: 'rgb(157,134,60)',
        borderRightWidth: unitWidth * 2,
    },
    tabTextBig: {
        color: '#ffffff',
        fontSize: unitWidth * 30,
        fontFamily:  'PingFang-SC-Regular',
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: unitWidth * 96,
        backgroundColor: '#ffffff',
        borderColor: '#e6e6e6',
        borderTopWidth: unitWidth * 2,
    },
    btnImage: {
        width: unitWidth * 280,
        height: unitWidth * 96,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomBtn:{
        color: '#FFFFFF',
        fontSize: unitWidth * 30,
        fontFamily:  'PingFang-SC-Medium',
    },
});
export default connect(
    (state) => ({
      type: state.productsReducer.type,
      product: state.productsReducer.productDetail || PRODUCT,
      account: state.productsReducer.account || {
            accountName: '中信证券股份有限公司', // 开户名
            bankName: '中信银行北京瑞城中心支行', // 募集银行
            accountNo: '7116810187000003312', // 募集账号
            memo: '认购深蓝启明11号证券投资基金', // 客户打款备注
        },
    }),
    (dispatch) => ({
        getProductsDetail: (data) => dispatch(poductAction.getProductsDetail(data)),
        getProductsAccount: (data) => dispatch(poductAction.getProductsAccount(data)),
    })
)(ProductDetail)