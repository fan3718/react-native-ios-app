import React, { Component } from 'react';
import { 
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
 } from 'react-native'
 
 import ModalPicker from './ModalPicker'
 import { unitWidth } from '../../config/AdapterUtil'

export default class Select extends Component {
    constructor(props) {
        super(props)
        this.state ={
            showName: null,
        }
        
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.options.value != this.props.options.value) {
            this.setText(nextProps.options.value)
        }
    }   

    setText(id) {
        if(this.props.options.type && (this.props.options.type === 'datetime' || this.props.options.type === 'date' || this.props.options.type === 'noyear')) {
            this.setState({
                showName: id
            })
        }else if(this.props.options.type && this.props.options.type === 'region') {
            let areaTree = this.props.options.dataList || []
            let text = ''
            areaTree.forEach((item)=>{
                if(item.id === id[0]) {
                    let cities = item.children || []
                    text += item.name + ' '
                    cities.forEach((city)=>{
                        text += city.id === id[1] ? city.name : ''
                    })
                }
            })
            this.setState({
                showName: text
            })
        }else{
            let list = this.props.options.dataList
            for(let i = 0; i < list.length; i ++) {
                if(list[i]['id'] == id){
                    this.setState({
                        showName: list[i]['name']
                    })
                }
            }
        }
    }

    onConfirm(type,id) {
        this.setText(id)
        this.props.onConfirm(id,type)
    }

    render() { 
        const { options, rightText, leftText, } = this.props
        return(
            <View style = {styles.itemBg}>
                <View style = {[ styles.itemBox, !options.disBottom && styles.borderBottom]}>
                    <Text style = {[styles.itemLeft, leftText]} >{options.label}</Text>
                    <TouchableOpacity onPress={() => { this.refs.model.setModalVisible(true)}}> 
                        { 
                            this.state.showName ? <Text style = {[styles.itemRight,rightText]} >{this.state.showName}</Text> : <Text style = {[styles.itemRight,styles.placeText]} >{options.placeholder}</Text>
                        }
                    </TouchableOpacity>
                </View>
                <ModalPicker ref = 'model' type = { options.type || ''} dataList = { options.dataList } defaultValue = {options.value} onConfirm={this.onConfirm.bind(this,options['key'])}/> 
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
        width: '100%',
        paddingRight: unitWidth * 35,
        // width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    borderBottom: {
        borderBottomWidth: unitWidth * 2,
    },
    itemLeft: {
        color: '#333333',
        fontSize: unitWidth * 28,
        fontFamily:  'PingFang-SC-Medium',
    },
    itemRight: {
        color: '#333333',
        fontSize: unitWidth * 26,
        fontFamily:  'PingFang-SC-Regular',
    },
    placeText: {
        color: '#808080',
    },
});