import React, { Component } from 'react'
import { 
    View,
    Text,
    Picker,
    StyleSheet,
} from 'react-native'
import moment from 'moment'

import { unitWidth } from '../../config/AdapterUtil'

export default class Region extends Component {
        constructor(props) {
        super(props)
        let current = props.defaultValue || [ '110000', '110100']
        this.state = {
            province: current[0] || '110000',
            city: current[1] || '110100',
            cityList: [],
        }
    }
    componentDidMount() {
        this.changeProvince(this.state.province)
    }

    getAdress() {
        let value = [ this.state.province, this.state.city]
        this.props.transmitValue(value)
    }

    changeProvince(value) {
        let areaTree = this.props.dataList
        areaTree.forEach((item)=>{
            if(item.id === value) {
                this.setState({
                    cityList: item.children || [],
                    city: item.children[0]['id']
                })
            }
        })
    }

    render() {
        let { dataList } = this.props
        return(
            <View style={styles.container}>
                <Picker key = 'province' style={styles.pickerFlex}
                selectedValue={this.state.province} itemStyle={styles.option}
                onValueChange={(itemValue, itemIndex) => this.setState({province: itemValue},() => this.changeProvince(itemValue)) }>
                    {
                        dataList.map((item) => <Picker.Item key={item.id} label={item.name} value={item.id} />) 
                    }
                </Picker>
                <Picker key = 'city' style={styles.pickerFlex}
                selectedValue={this.state.city} itemStyle={styles.option}
                onValueChange={(itemValue, itemIndex) => this.setState({city: itemValue}) }>
                    {
                        this.state.cityList.map((item) => <Picker.Item key={item.id} label={item.name} value={item.id} />) 
                    }
                </Picker>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-around',
    },
    pickerFlex: {
        flex: 1,
        paddingTop: unitWidth * 28,
    },
    option: {
        color: '#a8934b',
        fontSize: unitWidth * 32,
        fontFamily:  'PingFang-SC-Regular',
    },
})