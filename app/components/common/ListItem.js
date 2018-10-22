import React, { Component } from 'react';
import { 
    View,
    Text,
    FlatList,
    StyleSheet,
    ScrollView,
    TextInput,
} from 'react-native'
 
import { unitWidth } from '../../config/AdapterUtil'


export default class ListItem extends Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.blur) {
            let item = this.props.item
            if(item['type'] &&  item.type === 'input') {
                this.refs[item.key].blur()
            }
        }
    }

    render() { 
        const { item, rightText, leftText, blur } = this.props
        return(
            <View style = {styles.itemBg}>
                <View style = {[ styles.itemBox, !item.disBottom && styles.borderBottom]}>
                    <Text style = {[styles.itemLeft, leftText]} >{item.label}</Text>
                    <View style = {styles.rightBox}>
                        {
                            item['type'] &&  item.type === 'input'? <TextInput ref={item.key} style={[styles.inputSingle,rightText]} 
                            placeholder = {item.placeholder} placeholderTextColor={'#808080'}
                            onChangeText={(text) => this.props.onChange(text)}
                            value={item.value + ''}/>: null   
                        }
                        {
                            item['type'] &&  item.type === 'link'? <Text style = {[styles.itemRight,rightText]} onPress={()=> this.props.press()}>{item.value}</Text>: null   
                        }
                        {
                            !item['type'] ? <Text style = {[styles.itemRight,rightText]}>{item.value}</Text>: null   
                        }
                        {
                            item['extra'] ?<Text style = {[styles.itemRight,styles.extraText,rightText]} >{item.extra}</Text> : null
                        }
                    </View>
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
    borderBottom: {
        borderBottomWidth: unitWidth * 2,
    },
    itemLeft: {
        color: '#333333',
        fontSize: unitWidth * 28,
        fontFamily:  'PingFang-SC-Regular',
    },
    rightBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    extraText: {
        paddingLeft: unitWidth * 10,
    },
    itemRight: {
        color: '#808080',
        fontSize: unitWidth * 26,
        fontFamily:  'PingFang-SC-Regular',
    },
    inputSingle: {
        textAlign: 'right',
        width: unitWidth * 440,
        // marginRight: unitWidth * 10,
        color: '#808080',
        fontSize: unitWidth * 24,
        fontFamily:  'PingFang-SC-Regular',
    },
    inputMult: {
        height: unitWidth * 165,
        marginTop: unitWidth * 10,
        
        color: '#808080',
        fontSize: unitWidth * 24,
        fontFamily:  'PingFang-SC-Regular',
    },
});