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
export default class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    render() { 
        const { list, childRender, leftText, rightText } = this.props
        return(
            <ScrollView>
                <View style = {styles.container}>
                    {
                        list.map((item,index) => {
                            return <ListItem item = {item} leftText={leftText} rightText={rightText} index={index} key = {index + item.id}/>
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
        borderBottomWidth: unitWidth * 2,
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