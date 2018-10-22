import React, { Component } from 'react'
import {
    View,
    StyleSheet,
} from 'react-native'
import { connect } from 'react-redux' // 引入connect函数
import ScrollableTabView from 'react-native-scrollable-tab-view'

import { unitWidth } from "../../config/AdapterUtil"
import * as poductAction from '../../actions/ProductAction' // 导入action方法
import { Header, TipPop, ProductCard, TabBar } from '../../components/index'

class ServicePage extends Component {
    constructor(props) {
        super(props)
        this.props.getProductsCate()
        this.state = {
            page: {},//第几页
            totalPage: {},//共几条
            limit: 20,//每页获取条数
            catesList: [],
            products: {},
            catesIds:[],
            activeTab: 0,
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.catesList && nextProps.type === 'GOT_PRODUCTCATE') {
            let catesList = nextProps.catesList["category"];
            let catesIds = []
            let page = nextProps.catesList.page
            catesList.forEach(element => {
                catesIds.push(element.id)
            });
            let id = nextProps.catesList["category"][0].id
            
            this.setState({
                catesIds: catesIds,
                catesList: nextProps.catesList["category"],
                page: {
                    ...this.state.page,
                    [id]: page.page,
                },
                totalPage: {
                    ...this.state.totalPage,
                    [id]: page.totalPage,
                },
                products: {
                    ...this.state.products,
                    [id]: nextProps.catesList.list,
                }
            })
        }
        if(nextProps.productsList && nextProps.type === 'GOT_PRODUCTSLIST') {
                let id = this.state.catesIds[this.state.activeTab]
                let page = nextProps.productsList.page
                if(!this.state.products[id]){
                    this.state.products[id] = []
                }
                this.setState({
                    page: {
                        ...this.state.page,
                        [id]: page.page,
                    },
                    totalPage: {
                        ...this.state.totalPage,
                        [id]: page.totalPage,
                    },
                    products: {
                        ...this.state.products,
                        [id]: this.state.products[id].concat(nextProps.productsList['list'] || []),
                    }
                })
        }
    }
    getdata(id) {
        this.props.getProductsList({
            categoryId: id,
            page: this.state.page[id] + 1 ||  1,
            limit: this.state.limit,
        });
    }

    scrollEnd(id) {
        console.info(id)
        if(this.state.totalPage[id] > this.state.page[id]) {
            this.getdata(id)
        }
    }
    

    render() {
        return ( 
            <View style = { styles.container }>
                <Header title= {'服务'} />
                <ScrollableTabView onChangeTab={(obj) => {
                    this.setState({
                        activeTab: obj.i
                    },()=> {
                        let id = this.state.catesIds[obj.i];
                        if(!this.state.totalPage[id] && this.state.totalPage[id] !== 0){
                            this.getdata(id)
                        }
                    })
                }} initialPage= {0}
                tabBarUnderlineStyle = {styles.tabLine}   
                tabBarBackgroundColor='rgb(249,249,249)'
                tabBarTextStyle={styles.tabText} renderTabBar={() =>
                    <TabBar/>
                }>  
                    {
                        this.state.catesList.map((item,index)=>
                        <View tabLabel={item.name} key={item.id.toString()}>
                            <ProductCard products={this.state.products[item.id]} onEnd={this.scrollEnd.bind(this,item.id)} navigation ={this.props.navigation}/>
                        </View>
                        )
                    }
                </ScrollableTabView>
                <TipPop navigation = {this.props.navigation}></TipPop>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgb(249,249,249)',
    },
    headerBar: {
        alignItems:'center',
        justifyContent:'center',
        width: '100%',
        height: unitWidth * 130,
        paddingTop: 20,
        backgroundColor: 'rgb(168,147,75)',
    },
    headerTitle: {
      color: '#ffffff',
      fontSize: unitWidth * 40,
      fontFamily:  'PingFang-SC-Medium',
    },
    secondBar: {
        alignItems:'center',
        width: "100%",
        backgroundColor: 'rgb(168,147,75)',
        paddingBottom: unitWidth * 2,
    },
    secondBarItem: {
    //   flexDirection: 'row',
      alignItems: 'center',
      
    },
    secondTitle: {
        color: '#ffffff',
        fontSize: unitWidth * 30,
        fontFamily:  'PingFang-SC-Medium',
        marginLeft: unitWidth * 15,
        marginRight: unitWidth * 15,
        paddingBottom: unitWidth * 10,
    },
    active: {
      width: unitWidth * 40,
      borderColor: "#ffffff",
      borderBottomWidth: unitWidth * 7,
    },
    body: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'flex-start',
        width: '100%',
    },
    cardBox: {
        marginTop: unitWidth * 30,
        backgroundColor: '#ffffff',
    },
});
export default connect(
    (state) => ({
      type: state.productsReducer.type,
      catesList: state.productsReducer.catesList,
      productsList: state.productsReducer.productsList || {},
    }),
    (dispatch) => ({
        getProductsCate: (data) => dispatch(poductAction.getProductsCate(data)),
        getProductsList: (data) => dispatch(poductAction.getProductsList(data)),
    })
)(ServicePage)