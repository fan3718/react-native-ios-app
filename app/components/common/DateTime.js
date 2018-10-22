import React, { Component } from 'react'
import { 
    View,
    Text,
    Picker,
    StyleSheet,
} from 'react-native'
import moment from 'moment'

import { unitWidth } from '../../config/AdapterUtil'

export default class DateTime extends Component {
        constructor(props) {
        super(props)
        let current = props.defaultValue || moment(new Date()).add(1, 'hours')
        let days = moment(moment(current).format('YYYY-MM'), "YYYY-MM").daysInMonth()
        this.state = {
            yearList: this.createArray(2200,1980),
            monthList: this.createArray(12,1),
            dayList: this.createArray(days,1),
            hourList: this.createArray(24),
            minuteList: this.createArray(59),
            year: moment(current).year() + '',
            month: this.addZero(moment(current).month() + 1) + '',
            day: this.addZero(moment(current).date()) + '',
            hour: this.addZero(moment(current).hour()) + '',
            minute: this.addZero(moment(current).minute()) + '',
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.options && nextProps.options && nextProps.options.value && nextProps.options.value != this.props.options.value) {
            let current = nextProps.options.value;
            this.setState({
                year: moment(current).year() + '',
                month: this.addZero(moment(current).month() + 1) + '',
                day: this.addZero(moment(current).date()) + '',
                hour: this.addZero(moment(current).hour()) + '',
                minute: this.addZero(moment(current).minute()) + '',
            })
        }
    }

    addZero(num) {
        return num < 10? '0' + num : num
    }

    getDateTime() {
        let value = `${this.state.year}-${this.state.month}-${this.state.day} ${this.state.hour}:${this.state.minute}`
        if(this.props.type === 'date'){
            value = `${this.state.year}-${this.state.month}-${this.state.day}`
        }else if(this.props.type === 'noyear') {
            value = `${this.state.month}-${this.state.day} ${this.state.hour}:${this.state.minute}`
        }
        this.props.transmitValue(value)
    }

    changeDays() {
        let month = this.state.month
        if(month.length < 2) {
            month = '0' + month
        }
        let days = moment(this.state.year + '-' + month, "YYYY-MM").daysInMonth();
        if(days !== this.state.dayList.length)  {
            this.setState({
                day: this.state.day > days ? days.toString(): this.state.day,
                // dayList: this.createArray(days)
            })
            this.dealDayList(days)
        }
    }

    dealDayList(days) {
        if(days > this.state.dayList.length) {
            this.setState({
                dayList: this.state.dayList.concat(this.createArray(days,this.state.dayList.length + 1)),
            })
        }else{
            this.setState({
                dayList: this.state.dayList.slice(0,days),
            })
        }
    }

    createArray(max,min) {
        let arr = [];
        let i = min || 0
        for(i; i <= max; i++ ) {
            let val = i + ''
            if(i < 10) {
                val = '0' + val
            }
            arr.push(val)
        }
        return arr
    }

    render() {
        let { type } = this.props
        let showModel = []
        if(type === 'datetime') {
            showModel = ['year','month','day','hour','minute']
        }else if(type === 'date') {
            showModel = ['year','month','day',]
        }else if(type === 'noyear') {
            showModel = ['month','day','hour','minute']
        }
        return(
            <View style={styles.container}>
                {
                    showModel.indexOf('year') > -1 ?<Picker key = 'year' style={[styles.pickerFlex,{flex: 1.2,}]}
                    selectedValue={this.state.year} itemStyle={styles.option}
                    onValueChange={(itemValue, itemIndex) => this.setState({year: itemValue},() => this.changeDays()     ) }>
                        {
                            this.state.yearList.map((item) => <Picker.Item key={item} label={item+'年'} value={item} />) 
                        }
                    </Picker> : null
                }
                {
                    showModel.indexOf('month') > -1 ?<Picker key = 'month' style={styles.pickerFlex}
                    selectedValue={this.state.month} itemStyle={styles.option}
                    onValueChange={(itemValue, itemIndex) => this.setState({month: itemValue},() => this.changeDays()) }>
                        {
                            this.state.monthList.map((item) => <Picker.Item key={item} label={item+'月'} value={item} />) 
                        }
                    </Picker> : null
                }
                {
                    showModel.indexOf('day') > -1 ?<Picker key = 'day' style={styles.pickerFlex}
                    selectedValue={this.state.day} itemStyle={styles.option}
                    onValueChange={(itemValue, itemIndex) => this.setState({day: itemValue})}>
                        {
                            this.state.dayList.map((item) => <Picker.Item key={item} label={item+'日'} value={item} />) 
                        }
                    </Picker> : null
                }
                {
                    showModel.indexOf('hour') > -1 ?<Picker key = 'hour' style={styles.pickerFlex}
                    selectedValue={this.state.hour} itemStyle={styles.option}
                    onValueChange={(itemValue, itemIndex) => this.setState({hour: itemValue})}>
                        {
                            this.state.hourList.map((item) => <Picker.Item key={item} label={item+'时'} value={item} />) 
                        }
                    </Picker> : null
                }
                {
                    showModel.indexOf('minute') > -1 ?<Picker key = 'minute' style={styles.pickerFlex}
                    selectedValue={this.state.minute} itemStyle={styles.option}
                    onValueChange={(itemValue, itemIndex) => this.setState({minute: itemValue})}>
                        {
                            this.state.minuteList.map((item) => <Picker.Item key={item} label={item+'分'} value={item} />) 
                        }
                    </Picker> : null
                }
                
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