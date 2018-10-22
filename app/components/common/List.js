import React, { Component } from 'react';
import { 
    View,
    Text,
    FlatList,
    StyleSheet,
    ScrollView,
 } from 'react-native'
 
import { unitWidth } from '../../config/AdapterUtil'
import ListItem from './ListItem'
import Select from './Select'

export default class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    render() { 
        const { style, list, childRender, leftText, rightText, blur } = this.props
        let selectType = ['select','datetime','date','region','noyear']
        return(
            <ScrollView>
                <View style = {[styles.container,style]}>
                    {
                        list.map((item,index) => {
                            if(item['type'] && selectType.indexOf(item.type) > -1) {
                                return <Select options = {item}  leftText={leftText} rightText={rightText} onConfirm = {(text) => this.props.editState(text,item['key']) } key = {index.toString()} />
                            }else if(item['type'] &&  item.type === 'input'){
                                return <ListItem item = {item}  blur = {blur}  leftText={leftText} rightText={rightText}  onChange={(text)=>
                                    this.props.editState(text,item['key'])
                                } key = {index.toString()}/>
                            }else{
                                return <ListItem item = {item} leftText={leftText} rightText={rightText}  key = {index.toString()}/>
                            }
                            
                        })
                    }
                </View>
                {
                    childRender? childRender : null
                }
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        borderColor: '#e6e6e6',
        // borderBottomWidth: unitWidth * 2,
    },
    itemBg: {
        paddingLeft: unitWidth * 35,
        paddingRight: unitWidth * 35,
        backgroundColor: '#ffffff',
    },
    itemBox: {
        borderColor: '#e6e6e6',
        height: unitWidth * 85,
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