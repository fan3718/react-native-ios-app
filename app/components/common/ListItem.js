import React, { Component } from 'react';
import { 
    View,
    Text,
    FlatList,
    StyleSheet,
    ScrollView,
 } from 'react-native'
 
 import { unitWidth } from '../../config/AdapterUtil'

export default class ListItem extends Component {
    constructor(props) {
        super(props)
    }

    render() { 
        const { item, index, rightText, leftText } = this.props
        return(
            <View style = {styles.itemBg}>
                <View style = {[ styles.itemBox,index != 0 && styles.borderTop]}>
                    <Text style = {[styles.itemLeft, leftText]} >{item.label}</Text>
                    <Text style = {[styles.itemRight,rightText]} >{item.value}</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    itemBg: {
        paddingLeft: unitWidth * 35,
        backgroundColor: '#ffffff',
    },
    itemBox: {
        borderColor: '#e6e6e6',
        height: unitWidth * 85,
        paddingRight: unitWidth * 35,
        // width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    borderTop: {
        borderTopWidth: unitWidth * 2,
    },
    itemLeft: {
        color: '#333333',
        fontSize: unitWidth * 28,
        fontFamily:  'PingFang-SC-Regular',
    },
    itemRight: {
        color: '#808080',
        fontSize: unitWidth * 26,
        fontFamily:  'PingFang-SC-Regular',
    },
});