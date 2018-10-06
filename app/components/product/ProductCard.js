import React, { Component } from 'react';
import { 
    View,
    Text, 
    Image,
    TouchableOpacity,
    StyleSheet
 } from 'react-native'
 import Icon from 'react-native-vector-icons/Entypo'
 import { NavigationActions } from 'react-navigation'

import { unitWidth } from '../../config/AdapterUtil'
import { PRODUCT_STATUS, CURRENCY } from '../../config/StaticData'


const detailAction = NavigationActions.navigate({
    routeName: 'NewsDetail',
    actions: NavigationActions.navigate({ routeName: 'NewsDetail', })
})

const riskAction = NavigationActions.navigate({
    routeName: 'RiskReveal',
    actions: NavigationActions.navigate({ routeName: 'RiskReveal', })
})

export default class ProductCard extends Component {
  constructor(props) {
    super(props)
  }

  toDetail(item) {
    this.props.props.navigation.dispatch(riskAction);
    // this.props.props.navigation.navigate("NewsDetail",{id:item.id});
  }


  render() { 
    const { item } = this.props
    return(
        <View style = {styles.cardBox}>
            <TouchableOpacity onPress={this.toDetail.bind(this,item)}>
                <View style = {styles.cardHeader}>
                    <View style = {styles.cardHeaderLeft}>
                        <Text style = {styles.headerTitle}>{item.name}</Text>
                        <View style = {[styles.cardTag, styles.cardTagone]}>
                            <Text style = {styles.TagStatusOne}>{PRODUCT_STATUS[item.status]}</Text>
                        </View>
                        {   item.riskyIcon?
                            <View style = {styles.cardTag}>
                                <Text style = {styles.TagTitle}>{item.riskyIcon}产品</Text>
                            </View> : null
                        } 
                        <View style = {styles.cardTag}>
                            <Text style = {styles.TagTitle}>R2 产品</Text>
                        </View>
                    </View>
                    <Icon name="chevron-thin-right" size={unitWidth*34} color="rgb(204,204,204)"/>
                </View>
                <View style = {styles.cardBody}>
                    <View style = {styles.contentFirst}>
                        <Text style = {styles.bigTitle}>{item.minAmount}
                            <Text style = {styles.unitTitle}>万{CURRENCY[item.currency]}</Text>
                        </Text>
                        <Text style = {styles.littleTitle}>起投金额</Text>
                    </View>
                    <View style = {styles.contentSecond}>
                        <Text style = {styles.middleTitile}>{item.term}
                            <Text style = {styles.unitTitle}>年</Text>
                        </Text>
                        <Text style = {styles.littleTitle}>存续期</Text>
                    </View>
                    <View style = {styles.contentThird}>
                        <Text style = {styles.middleTitile}>{item.netValue? item.netValue : '----'}
                            {/* <Text style = {styles.unitTitle}>万</Text> */}
                        </Text>
                        <Text style = {styles.littleTitle}>当前净值</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
  }
}
const styles = StyleSheet.create({
    cardBox: {
        // height: unitWidth * 210,
        marginTop: unitWidth * 32,
        paddingLeft: unitWidth * 32,
        paddingRight: unitWidth * 32,
        paddingBottom: unitWidth * 32,
        backgroundColor: '#ffffff',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: unitWidth * 12,
        paddingBottom: unitWidth * 12,
    },
    cardHeaderLeft: {
        flexDirection: 'row',
    },
    headerTitle: {
        color: '#333333',
        fontSize: unitWidth * 30,
        fontFamily:  'PingFang-SC-Medium',
        paddingRight: unitWidth * 20,
    },
    cardTag: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#cccccc',
        paddingLeft: unitWidth * 15,
        paddingRight: unitWidth * 15,
        marginLeft: unitWidth * 10,
        marginRight: unitWidth * 10,
        borderRadius: unitWidth * 20,
    },
    TagTitle: {
        color: '#a8934b',
        fontSize: unitWidth * 20,
        fontFamily:  'PingFang-SC-Regular',
    },
    cardTagone:{
        backgroundColor: 'rgb(172,151,79)',
    },
    TagStatusOne: {
        color: '#ffffff',
        fontSize: unitWidth * 20,
        fontFamily:  'PingFang-SC-Regular',
    },
    
    cardBody: {
        flexDirection: 'row',
        // alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingTop: unitWidth * 30,
        paddingBottom: unitWidth * 30,
        paddingLeft: unitWidth * 30,
        borderTopWidth: 0.5,
        borderColor: '#cccccc',
    },
    contentFirst: {

    },
    contentSecond: {
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    contentThird: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    bigTitle: {
        color: '#b19c53',
        fontSize: unitWidth * 72,
        fontFamily:  'PingFang-SC-Regular', 
    },
    unitTitle: {
        color: '#808080',
        fontSize: unitWidth * 24,
        fontFamily:  'PingFang-SC-Regular',
    },
    middleTitile: {
        color: '#333333',
        fontSize: unitWidth * 36,
        fontFamily:  'PingFang-SC-Light',
    },
    littleTitle: {
        color: '#808080',
        fontSize: unitWidth * 22,
        fontFamily:  'PingFang-SC-Regular',
    },


    cardTitle: {
        paddingTop: unitWidth * 30,
        color: '#333333',
        fontSize: unitWidth * 30,
        fontFamily:  'PingFang-SC-Medium',
    },
    cardImg: {
        width: '26%',
    },
});