import React, { Component } from 'react'
import { 
    View,
    Text,
    Animated,
    Modal,
    Picker,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import { unitWidth } from '../../config/AdapterUtil'
import DateTime from './DateTime'
import Region from './Region'



const BOTTOM = unitWidth * 500
export default class ModalPicker extends Component {
    constructor(props) {
        super(props)
        const { dataList, defaultValue } = props
        this.state = {
            modalVisible: false,
            bottom: new Animated.Value(-BOTTOM),
            selectedValue: defaultValue,
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.defaultValue != this.props.defaultValue) {
            if(nextProps.type && (nextProps.type === 'datetime'|| nextProps.type === 'region'|| nextProps.type === 'date'|| nextProps.type === 'noyear')) {
                this.setState({
                    selectedValue: nextProps.defaultValue
                })
            }else{
                this.setState({
                    selectedValue: parseInt(nextProps.defaultValue)
                })
            }
            
        }
    }
    setModalVisible(visible) {
        // this.setState({ modalVisible: visible });
        if(visible) {
            this.toShow()
        }else{
            this.toHide()
        }
    }

    toHide() {
        Animated.timing(
            // Animate value over time
            this.state.bottom, // The value to drive
            {
              toValue: -BOTTOM || -500, // Animate to final value of 1
              duration: 500,
            }
          ).start(() => this.setState({ modalVisible: false }));
    }
    toShow() {
        this.setState({ modalVisible: true })
        Animated.timing(
            // Animate value over time
            this.state.bottom, // The value to drive
            {
              toValue: 0, // Animate to final value of 1
              duration: 500,
            }
          ).start();
    }

    onOk() {
        this.setModalVisible(false);
        if(this.props.type && (this.props.type === 'datetime' || this.props.type === 'date' || this.props.type === 'noyear')) {
            this.refs.dateTime.getDateTime()
        }else if(this.props.type && this.props.type === 'region') {
            this.refs.region.getAdress()
        }else{
            if(!this.state.selectedValue){//没有选中的值时，默认列表第一个输出
                let dataList = this.props.dataList
                if(dataList && dataList.length > 0) {
                    this.setState({
                        selectedValue: dataList[0]['id']
                    },()=> this.props.onConfirm(this.state.selectedValue) )
                }
            }else{
                this.props.onConfirm(this.state.selectedValue)
            }
        }
    }

    transmitValue(value) {
        this.props.onConfirm(value)
    }

    render() { 
        const { dataList, type } = this.props
        let content = null
        if(type && (type === 'datetime' || type === 'date' || type === 'noyear')) {
            content = <DateTime ref = 'dateTime' defaultValue = {this.state.selectedValue} transmitValue={this.transmitValue.bind(this)} type = {type} />
        }else if(type && type === 'region') {
            content = <Region ref = 'region' defaultValue = {this.state.selectedValue} transmitValue={this.transmitValue.bind(this)} dataList={dataList} type = {type} />
        }else{
            content = <Picker
                selectedValue={this.state.selectedValue} itemStyle={styles.option}
                onValueChange={(itemValue, itemIndex) => {this.setState({selectedValue: itemValue})}}>
                    {
                        dataList && dataList.length > 0 ?dataList.map((item) => <Picker.Item key={item.id.toString()} label={item.name} value={item.id} />) : null
                    }
                </Picker>
        }
        return(
            <Modal
            animationType="none"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
                console.info("Modal has been closed.");
            }}>
                <TouchableOpacity style={styles.container} activeOpacity={1}
                onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                }}>
                    
                    <Animated.View  style = {[styles.modelBox,{
                    bottom:this.state.bottom,//将动画对象赋值给需要改变的样式属性
                    }]}>
                        <TouchableOpacity activeOpacity={1}>
                            <View style = {styles.modelHeader}>
                                <Text style = {styles.btnText} onPress={() => {
                                    this.setModalVisible(false);
                                }}>取消</Text>
                                <Text style = {styles.btnText} onPress={this.onOk.bind(this)}>确定</Text>
                            </View>
                            <View style = {styles.modelBody}>
                                {content}
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                </TouchableOpacity>
            </Modal> 
        
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    modelBox: {
        position: 'absolute',
        bottom: -BOTTOM,
        height: BOTTOM,
        width: '100%',
        backgroundColor: '#ffffff'
    },
    modelHeader: {
        height: unitWidth * 60,
        padding: unitWidth * 10,
        paddingLeft: unitWidth * 30,
        paddingRight: unitWidth * 30,
        borderBottomWidth: unitWidth * 2,
        borderColor: '#cccccc',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    btnText: {
        color: '#a8934b',
        fontSize: unitWidth * 28,
        fontFamily:  'PingFang-SC-Regular',
    },
    modelBody: {
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    option: {
        color: '#a8934b',
        fontSize: unitWidth * 32,
        fontFamily:  'PingFang-SC-Regular',
    },
})