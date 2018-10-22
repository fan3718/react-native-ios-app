import React, { Component } from 'react';
import { 
    View,
    Text, 
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux' // 引入connect函数
import {LocaleConfig, Calendar, CalendarList, Agenda} from 'react-native-calendars'
import moment from 'moment'

import { REMIND_TYPE } from '../../config/StaticData'
import { unitWidth } from '../../config/AdapterUtil'
import * as remindAction from '../../actions/RemindAction' // 导入action方法
import { Header,} from '../../components'


LocaleConfig.locales['fr'] = {
//   monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
//   monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
//   dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六']
};

LocaleConfig.defaultLocale = 'fr';

const schedule = {key:'vacation', color: 'red', selectedDotColor: '#a8934b'};

class JobCalendars extends Component {
    constructor (props) {
        super(props)
        this.state = {
            selectedDate: moment(new Date()).format('YYYY-MM-DD'),
            markedDates: {
                '2018-10-25': {marked: true},
                '2018-10-26': {marked: true},
            },
            sectionID: null
        }
        this.state.markedDates[this.state.selectedDate]= {selected: true,}
        this.props.getRemindsList({
            date: this.state.selectedDate,
        })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.type === 'DELETE_REMIND') {
            this.props.getRemindsList({
                date: this.state.selectedDate,
            })
        }
    }

    goBack() {
        this.props.navigation.goBack()
    }

    goNext() {
        this.props.navigation.navigate("EditRemind")
    }

    toRemindDetail(id) {
        this.props.navigation.navigate("ViewRemind",{id: id})
    }

    onDayPress(day) {
        this.setState({//取消上一个状态日期的样式
            selectedDate: day.dateString,
            markedDates: {
                ...this.state.markedDates,
                [this.state.selectedDate]: {
                    ...this.state.markedDates[this.state.selectedDate],
                    selected: false,
                }
            }
        },() =>{
            this.setState({//添加当前日期的选中状态
                markedDates: {
                    ...this.state.markedDates,
                    [this.state.selectedDate]: {
                        ...this.state.markedDates[this.state.selectedDate],
                        selected: true,
                    }
                }
            })
            this.props.getRemindsList({//跟新当前日期下的事项列表
                date: this.state.selectedDate,
            })
        });
    }
    
    _keyExtractor = (item, index) => item.id.toString();

    renderRemindlItem = ({ item }) => {

        const swipeoutBtns = [
            {
                text: '删除',
                backgroundColor: '#e80f0f',
                underlayColor: '#e80f0f',
                color: '#ffffff',
                type: 'delete',
                onPress: () => {
                    this.props.deleteRemind({
                        id: this.state.sectionID,
                    })
                }
            }
        ]

        return (
            <Swipeout right={swipeoutBtns} backgroundColor={'#ffffff'} buttonWidth={unitWidth * 158} 
            sectionID={item.id} close={ this.state.sectionID !== item.id }
            onOpen={(sectionID, rowID) => {
                this.setState({
                    sectionID,
                });
            }} style = { styles.remindCard }>
                <TouchableOpacity activeOpacity={1}
                    onPress={ this.toRemindDetail.bind(this,item.id) }>
                    <View style = { styles.cardPadding }>
                        <View style = { styles.remindAlign }>
                            <View style = { [styles.cardTag, item.seq === 1 && styles.firstLevel, item.seq === 2 && styles.secondLevel, item.seq === 3 && styles.thirdLevel] }></View>
                            <Text style = { styles.remindTitle }>{item.customerName}</Text>
                            <Text style = { styles.remindTime }>{item.reminderDate.split(' ')[1]+ ' '} </Text>
                        </View>
                        <View style = { styles.remindAlign }>
                            <Text style = { styles.memoText }>{ item.memo || '无备注'} </Text>
                            <Text style = { styles.memoText }>{'【' + REMIND_TYPE.object[item.reminderType] + '】'}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeout>
        )
    }
    
    render() {
        let { remindList } = this.props
        return(
            <View style={styles.container}>
                <Header hasBack={true} title={'工作台历'} back={this.goBack.bind(this)}
                nextRender={<Icon name="plus" onPress={this.goNext.bind(this)} size={unitWidth*40} color="#ffffff"/>} next = {this.goNext.bind(this)}/>
                <Calendar minDate={'2018-10-01'}
                onDayPress={this.onDayPress.bind(this)}
                monthFormat={'yyyy/MM'}
                onMonthChange={(month) => {console.log('month changed', month)}}
                firstDay={0}
                markedDates={this.state.markedDates} 
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#f9f9f9',
                    textSectionTitleColor: '#a8934b',
                    selectedDayBackgroundColor: '#a8934b',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#a8934b',
                    dayTextColor: '#333333',
                    textDisabledColor: '#cccccc',
                    dotColor: '#a8934b',
                    selectedDotColor: '#ffffff',
                    arrowColor: '#a8934b',
                    monthTextColor: '#a8934b',
                    textDayFontFamily: 'PingFang-SC-Medium',
                    textMonthFontFamily: 'PingFang-SC-Medium',
                    textDayHeaderFontFamily: 'PingFang-SC-Medium',
                    textMonthFontWeight: 'bold',
                    textDayFontSize: unitWidth *  24,
                    textMonthFontSize: unitWidth * 30,
                    textDayHeaderFontSize: unitWidth * 24
                }}/>
                <Text style={styles.greyTitle}>今日待办</Text>
                <View style={styles.remindBox}>
                    <FlatList data = { remindList } keyExtractor={this._keyExtractor}
                    renderItem = {this.renderRemindlItem }/>
                </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#ffffff',
    },
    remindBox: {
        flex:1,
    },
    greyTitle: {
        height: unitWidth * 90,
        paddingTop: unitWidth * 30,
        paddingLeft: unitWidth * 40,
        backgroundColor: '#f9f9f9',
        color: '#808080',
        fontSize: unitWidth * 28,
        fontFamily:  'PingFang-SC-Regular',
    },
    remindCard: {
        paddingLeft: unitWidth * 40,
    },
    cardPadding: {
        borderColor: '#f2f2f2',
        borderBottomWidth: unitWidth * 2,
        paddingLeft: unitWidth * 25,
        paddingTop: unitWidth * 30,
        paddingRight: unitWidth * 40,
        paddingBottom: unitWidth * 10,
    },
    remindAlign: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
    },
    cardTag: {
        position: 'absolute',
        left: - unitWidth * 20,
        backgroundColor: 'red',
        height: unitWidth * 24,
        width: unitWidth * 4,
    },
    firstLevel: {
        backgroundColor: '#e80f0f',
    },
    secondLevel: {
        backgroundColor: '#d692fd',
    },
    thirdLevel: {
        backgroundColor: '#eeaf28',
    },
    remindTitle: {
        color: '#333333',
        fontSize: unitWidth * 30,
        fontFamily:  'PingFang-SC-Regular',
    },
    remindTime: {
        color: '#808080',
        fontSize: unitWidth * 26,
        fontFamily:  'PingFang-SC-Regular',
    },
    memoText: {
        color: '#808080',
        fontSize: unitWidth * 24,
        fontFamily:  'PingFang-SC-Regular',
        paddingTop: unitWidth * 10,
        paddingBottom: unitWidth * 10,
    },
});
export default connect(
    (state) => ({
        type: state.remindReducer.type,
        remindList: state.remindReducer.remindList,
    }),
    (dispatch) => ({
        getRemindsList: (data) => dispatch(remindAction.getRemindsList(data)),
        deleteRemind: (data) => dispatch(remindAction.deleteRemind(data)),
    })
)(JobCalendars)