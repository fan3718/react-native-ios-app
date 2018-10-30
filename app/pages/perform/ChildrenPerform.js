import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { connect } from 'react-redux' // 引入connect函数

import { unitWidth } from '../../config/AdapterUtil'
import * as performAction from '../../actions/PerformAction' // 导入action方法
import { TipPop, Header, SaleChart, LongBtn} from '../../components/index'


class ChildrenPerform extends Component {
    constructor (props) {
        super(props)
        props.getPerform()
    }

    goBack() {
        this.props.navigation.navigate('Room')
    }


    performDetail() {
        this.props.navigation.navigate('PerformDetail')
    }

    render() {
        let  { perform,  } = this.props
        return(
        <View style={styles.container}>
            <Header title= {'子公司业绩'} hasBack={true} back={this.goBack.bind(this)} props = {this.props.navigation}/>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.textLight}>{perform['sign']}
                        <Text style={styles.textLittle}>/{perform['target']}</Text>
                    </Text>
                    <Text style={styles.textLittle}>(单位：万)</Text>
                </View>
                <View style={styles.headerTab}>
                    <View style={[styles.tabBox,styles.rightBorder]}>
                        <Text style={styles.tabTextBig}>{perform['target']} 万</Text>
                        <Text style={styles.textLittle}>目标额度</Text>
                    </View>
                    <View style={[styles.tabBox,styles.rightBorder]}>
                        <Text style={styles.tabTextBig}>{perform['sign']} 万</Text>
                        <Text style={styles.textLittle}>已完成额度</Text>
                    </View>
                    <View style={styles.tabBox}>
                        <Text style={styles.tabTextBig}>{perform['order']} 万</Text>
                        <Text style={styles.textLittle}>预约额度</Text>
                    </View>
                </View>
            </View>
            <ScrollView style={styles.section}>
                <View style={styles.sectionTitle}>
                    <Text style={styles.sectionText}>额度占比</Text>
                </View>
                <View style={styles.sectionContent}>
                    <SaleChart data = {perform}/>
                </View>
            </ScrollView>
            <LongBtn title={'查看业绩详情'} onPress={this.performDetail.bind(this)} />
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
    section: {
        marginTop: unitWidth * 40,
        marginBottom: unitWidth * 120,
        paddingLeft: unitWidth * 40,
        backgroundColor: '#ffffff',
        borderColor: '#e6e6e6',
        borderTopWidth: unitWidth * 2,
        borderBottomWidth: unitWidth * 2,
      },
      sectionTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: unitWidth * 65,
        borderColor: '#e6e6e6',
        paddingRight: unitWidth * 40,
        borderBottomWidth: unitWidth * 2,
      },
      sectionText: {
          color: '#333333',
          fontSize: unitWidth * 30,
          fontFamily:  'PingFang-SC-Regular',
      },
      sectionRightText: {
          color: '#333333',
          fontSize: unitWidth * 26,
          fontFamily:  'PingFang-SC-Regular',
      },
      sectionContent: {
          // flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: unitWidth * 480,
          paddingTop: unitWidth * 40,
          paddingBottom: unitWidth * 40,
      },
});
export default connect(
    (state) => ({
      type: state.performReducer.type,
      perform: state.performReducer.perform||{},
    }),
    (dispatch) => ({
        getPerform: (data) => dispatch(performAction.getPerform(data)),
    })
)(ChildrenPerform)