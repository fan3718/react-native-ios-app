import React, { Component } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { connect } from 'react-redux' // 引入connect函数

import { unitWidth } from '../../config/AdapterUtil'
import * as performAction from '../../actions/PerformAction' // 导入action方法
import { TipPop, Header, PerformSection, TabBar, TopModal} from '../../components/index'

class PerformDetail extends Component {
    constructor (props) {
        super(props)
        this.state = {
            type: [0,1], // 状态 待受理2 已确认5  已拒绝1
            page: {0:0,1:0},//第几页
            totalPage: {},//共几条
            performList: {0:[],1:[]},
            limit: 20, // [可选] 每页条数
            activeTab: 0,
        }
        this.getList(0)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.performList && nextProps.type === 'GOT_PERFORMLIST') {
            let type = this.state.type[this.state.activeTab]
            let list = this.getSectionData(nextProps.performList.list,type)
            let page = nextProps.performList.page
            this.setState({
                page: {
                    ...this.state.page,
                    [type]: page.page,
                },
                totalPage: {
                    ...this.state.totalPage,
                    [type]: page.totalPage,
                },
                performList: {
                    ...this.state.performList,
                    [type]: this.state.performList[type].concat(list),
                }
            })
        }
    }

    getSectionData(list,type) {
        let sections = [];
        list.forEach(item => {
            let date = ''
            if(type === 0) {
                date = item.signDate.slice(0,10)
            }else {
                date = item.reservationDate.slice(0,10)
            }
            let hasSameDate = false
            sections.forEach(section => {
                if(section.title === date) {
                    section.data.push(item)
                    hasSameDate = true
                }
            })
            if(!hasSameDate) {
                sections.push({
                    title: date,
                    data: [item]
                })
            }
        })
        return sections
    }

    goBack() {
        this.props.navigation.goBack()
    }

    getList(type) {
        this.props.getPerformList({
            type: type, // 状态 待受理2 已确认5  已拒绝1
            page: this.state.page[type] + 1, // [可选] 当前页
            limit: this.state.limit, // [可选] 每页条数
        })
    }

    scrollEnd(type) {
        if(this.state.totalPage[type] > this.state.page[type]) {
            this.getList(type)
        }
    }

    next() {
        this.props.getAdvisorList();
        this.refs.topModel.setModalVisible()
    }

    render() {
        const { advisorList } = this.props
        return(
        <View style={styles.container}>
            <Header hasBack={true} title= {'业绩详情'} back={this.goBack.bind(this)} props = {this.props.navigation} nextTitle={'筛选'} next = {this.next.bind(this)}/>
            <ScrollableTabView onChangeTab={(obj) => {
                this.setState({
                    activeTab: obj.i
                },()=> {
                    let type = this.state.type[obj.i]
                    if(!this.state.totalPage[type] && this.state.totalPage[type] !== 0){
                        this.getList(type)
                    }
                })
               
              } 
            } initialPage= {0}
            tabBarUnderlineStyle = {styles.tabLine}   
            tabBarBackgroundColor='rgb(249,249,249)'
            tabBarTextStyle={styles.tabText} renderTabBar={() =>
                <TabBar width = {200} tabWidth = {{width: unitWidth * 200}}
                lineStyle ={styles.lineStyle}
                />
            }>   
                <View tabLabel="已完成额度">
                    <PerformSection perform = {this.state.performList[0]} onEnd = {this.scrollEnd.bind(this,0)}/>
                </View>
                <View tabLabel="预约额度">
                    <PerformSection perform = {this.state.performList[1]} onEnd = {this.scrollEnd.bind(this,1)} />
                </View>
            </ScrollableTabView>
            <TopModal ref='topModel' data = {advisorList} />
            {/* <TipPop navigation = {this.props.navigation}></TipPop> */}
        </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#ffffff',
    },
    tabText: {
        color: 'rgb(168,147,75)',
        fontSize: unitWidth * 30,
        fontFamily:  'PingFang-SC-Regular',
    },
    tabLine: {
        position: 'absolute',
        width: unitWidth * 40,
        marginLeft: unitWidth * 105,
        marginBottom: unitWidth * 20,
        borderColor: "rgb(168,147,75)",
        borderBottomWidth: unitWidth * 7,
    },
    lineStyle: {
        marginLeft: unitWidth * 75,
        marginRight: unitWidth * 75,
    },
});
export default connect(
    (state) => ({
      type: state.performReducer.type,
      performList: state.performReducer.performList,
      advisorList: state.performReducer.advisorList,
    }),
    (dispatch) => ({
        getPerformList: (data) => dispatch(performAction.getPerformList(data)),
        getAdvisorList: () => dispatch(performAction.getAdvisorList()),
    })
)(PerformDetail)