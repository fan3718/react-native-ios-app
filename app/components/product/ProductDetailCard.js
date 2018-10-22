import React, { Component } from 'react';
import { 
    View,
    Text, 
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Clipboard
 } from 'react-native'
 import Icon from 'react-native-vector-icons/Octicons'

import { unitWidth } from '../../config/AdapterUtil'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import {List,TabBar} from '../index'

export default class ProductDetailCard extends Component {
    constructor (props) {
        super(props)
    }

    toRiskpage() {
        this.props.props.navigation.navigate("RiskReveal",{type:'detail'});

    }
    copyAccount() {
        let account = this.props.props.account
        if(account['accountNo']) {
            Clipboard.setString(account.accountNo);
            this.props.props.isError({
                msg: '复制成功',
                errorCode: 2,
            })
        }else{
            this.props.props.isError({
                msg: '数据不存在，无法复制',
                errorCode: 2,
            }) 
        }
    }
    async consolesA() {
        var content = await Clipboard.getString();
        console.info(content)
    }

    _keyExtractor = (item, index) => item.createTime;

    renderMaterialItem = ({ item }) => {
        return (
            <View style = { styles.material }>
                {/* <Text style = { styles.materialIcon }>{item.type}</Text> */}
                <Icon name="file-pdf" size={unitWidth*70} color="red"/>
                <View style = { styles.materialRight }>
                    <Text style = { styles.materialTitle }>{item.name}</Text>
                    <Text style = { styles.materialTime }>发布时间：{item.createTime.split(' ')[0]}</Text>
                </View>
            </View>
        )
    }

    render() {
        let  { product, account} = this.props.props
        let list = [
            { label: '产品名称', value: product['name'], id: 0,},
            { label: '内部产品编号', value: product['no'], id: 1, },
            { label: '产品类型', value: product['categoryName'], id: 2, },
            { label: '产品规模', value: product['productSize'], id: 3, },
            { label: '认购起点', value: product['minAmount'], id: 4, },
            { label: '存续期限', value: product['term'], id: 5, },
            { label: '产品费用', value: product['scale'], id: 6, },
            { label: '业绩报酬', value: product['annualReturn'], id: 7, },
            { label: '投资范围', value: product['limits'], id: 8, },
            { label: '基金管理人', value: product['fundManager'], id: 9, },
            { label: '基金托管人', value: product['custodian'], id: 10, },
        ]
        let accountList = [
            { label: '开户行', value: account['accountName'], id: 0,},
            { label: '募集银行', value: account['bankName'], id: 1, },
            { label: '募集账号', value: account['accountNo'], id: 2, },
            { label: '打款备注', value: account['memo'], id: 3, },
        ]
        return(
            <ScrollableTabView style={styles.tabbar} onChangeTab={(obj) => {
               this.props.changeTab(obj.i)
              }
            } initialPage= {0}
            tabBarUnderlineStyle = {styles.tabLine}   
            tabBarBackgroundColor='rgb(249,249,249)'
            tabBarTextStyle={styles.tabText} renderTabBar={() => <TabBar tabText={styles.tabText} layout = {styles.tabLayout} lineStyle= {styles.tabLine} />}
            >
                <View style={styles.tabView} tabLabel="产品要素" >
                    <List list={list} childRender = {<View style = { styles.riskItem }>
                        <Text style = { styles.riskLeft }>风险揭示</Text>
                        <Text style = { styles.riskRight } onPress = {this.toRiskpage.bind(this)}>查看风险揭示书</Text>
                    </View>} />
                </View>
                <View style={styles.tabView} tabLabel="产品资料" >
                    <FlatList data = { product.attachment }  style = { styles.body } keyExtractor={this._keyExtractor}
                    renderItem = {this.renderMaterialItem }/>
                </View>
                <View style={styles.tabView} tabLabel="募集账号" >
                    <List list={accountList} childRender = {
                        <View style = { styles.copyPos }>
                            <Text style = { styles.copyText } onPress = {this.copyAccount.bind(this)}>复制募集账号</Text>
                            {/* <Text style = { styles.copyText } onPress = {this.consolesA.bind(this)}>输出</Text> */}
                        </View>} />
                </View>
            </ScrollableTabView>
        )
    }

}
const styles = StyleSheet.create({
    tabBg: {
        backgroundColor: '#f9f9f9'
    },
    tabLayout: {
        // width: '100%',
        height: unitWidth * 95,
        paddingTop: unitWidth * 20,
        backgroundColor: '#f9f9f9',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderColor: '#e6e6e6',
        borderBottomWidth: unitWidth * 2,
    },
    tabView: {
        // flex: 1,
        backgroundColor: '#f9f9f9',
    },
    tabText: {
        color: 'rgb(168,147,75)',
        fontSize: unitWidth * 30,
        fontFamily:  'PingFang-SC-Regular',
    },
    tabLine: {
        backgroundColor: "rgb(168,147,75)",
        marginBottom: unitWidth * 20,
        width: unitWidth * 40,
        marginLeft: unitWidth * 55,
        marginRight: unitWidth * 55,
    },
    riskItem: {
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
    riskLeft: {
        color: '#333333',
        fontSize: unitWidth * 28,
        fontFamily:  'PingFang-SC-Regular',
    },
    riskRight: {
        width: '60%',
        textAlign: 'right',
        color: 'rgb(168,147,75)',
        fontSize: unitWidth * 26,
        fontFamily:  'PingFang-SC-Regular',
    },
    copyPos: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: unitWidth * 20,
        paddingRight: unitWidth * 35,
    },
    copyText: {
        // width: '50%',
        // textAlign: 'right',
        backgroundColor: '#ffffff',
        color: 'rgb(168,147,75)',
        fontSize: unitWidth * 26,
        fontFamily:  'PingFang-SC-Regular',
    },
    material: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        // height: unitWidth * 90,
        borderColor: '#e6e6e6',
        borderTopWidth: unitWidth * 2,
        borderBottomWidth: unitWidth * 2,
        backgroundColor: '#ffffff', 
        marginBottom: unitWidth * 10,
        paddingLeft: unitWidth * 35,
        paddingRight: unitWidth * 35,
        paddingTop: unitWidth * 25,
        paddingBottom: unitWidth * 25,
    },
    materialIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    materialRight: {
        marginLeft: unitWidth * 25,
    },
    materialTitle: {
        color: '#333333',
        fontSize: unitWidth * 30,
        fontFamily:  'PingFang-SC-Regular',
    },
    materialTime: {
        color: '#cccccc',
        fontSize: unitWidth * 22,
        fontFamily:  'PingFang-SC-Regular',
    },
});