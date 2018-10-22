import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native'
import { connect } from 'react-redux' // 引入connect函数
import ScrollableTabView from 'react-native-scrollable-tab-view'

import { unitWidth } from '../../config/AdapterUtil'
import { getFirstLetter } from '../../config/Util'
import * as customerAction from '../../actions/CustomerAction' // 导入action方法
import { TipPop, Header, Section, TabBar, ListItem} from '../../components'

class CustomerList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            areaText: null,
            active: 0,
            list: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q','R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#' ],
            customerList: [[],[]],
        }
        props.getCustomerList({
            type: 0
        });
        
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.customerList && nextProps.customerList.length > 0 && nextProps.type === 'GOT_CUSTOMERSLIST') {
            let customerList = nextProps.customerList 
            let customers = {}
            let sections = []
            customerList.forEach((item,index)=>{
                let firstLetter = getFirstLetter(item.name.substr(0,1)).toLocaleUpperCase()
                if(!customers[firstLetter]) {
                    customers[firstLetter] = []
                }
                customers[firstLetter].push(item)
            })
            this.state.list.forEach((item,index) =>{
                if(customers[item]) {
                    sections.push({
                        title: item,
                        data: customers[item]
                    })
                }
            })
            let arr = this.state.customerList
            arr[this.state.active] = sections
            this.setState({
                customerList: arr 
            })
        }
    }

    goBack() {
        // this.props.navigation.navigate("Room")
        this.props.navigation.goBack()
    }

    next() {
        this.props.navigation.navigate("EditCustomer")
    }

    changeTab(index) {
        let arr = this.state.customerList
        if(!arr[index] || arr[index].length === 0) {
            this.setState({
                active: index
            },() =>{
                this.props.getCustomerList({
                    type: index
                });
            }) 
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Header hasBack={true} title={'客户列表'} back={this.goBack.bind(this)} nextTitle={'新建'} next = {this.next.bind(this)} />
                <ScrollableTabView onChangeTab={(obj) => {
                   this.changeTab(obj.i)
                
                }} initialPage= {0}
                tabBarUnderlineStyle = {styles.tabLine}   
                tabBarBackgroundColor='rgb(249,249,249)'
                tabBarTextStyle={styles.tabText} renderTabBar={(obj) =>
                    <View>
                        <View style={styles.tabBarBox}>
                            <View style={styles.tabContent}>
                                {   
                                    obj.tabs.map((item,index) => {
                                        return <View style={[styles.tabTextBox,obj.activeTab === index && styles.tabActive]} key = {index.toString()}>
                                            <Text onPress={() => obj.goToPage(index) } style={[styles.tabText,obj.activeTab === index && styles.textActive]}>{item}</Text>
                                        </View>
                                    })
                                }
                            </View>
                        </View>
                    </View>
                }>   
                    <View tabLabel="全部列表">
                        <Section list = {this.state.customerList[0]} navigation={this.props.navigation}/>
                    </View>
                    <View tabLabel="已投客户">
                        <Section list = {this.state.customerList[1]} navigation={this.props.navigation}/>
                    </View>
                </ScrollableTabView>
                <TipPop navigation = {this.props.navigation} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    tabBarBox: {
        position: 'relative',
        width: Dimensions.get('window').width,
        height: unitWidth * 90,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#a8934b',
    },
    tabContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: unitWidth * 60,
        width: unitWidth * 350,
        borderColor: '#ffffff',
        borderWidth: unitWidth * 2,
        borderRadius: unitWidth * 30,
        backgroundColor: '#ffffff',
    },
    tabTextBox: {
        width: '50%',
        height: '100%',
        borderRadius: unitWidth * 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        color: 'rgb(168,147,45)',
        fontSize: unitWidth * 30,
        fontFamily:  'PingFang-SC-Medium',
    },
    tabActive: {
        backgroundColor: 'rgb(168,147,45)',
    },
    textActive: {
        color: '#ffffff',
    },
});
export default connect(
    (state) => ({
        type: state.customerReducer.type,
        customerList: state.customerReducer.customerList,
    }),
    (dispatch) => ({
        getCustomerList: (data) => dispatch(customerAction.getCustomerList(data)),
    })
)(CustomerList)