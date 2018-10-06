import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    AsyncStorage,
} from 'react-native'
import { connect } from 'react-redux' // 引入connect函数
import { NavigationActions } from 'react-navigation'
import Swiper from 'react-native-swiper'

import { unitWidth } from "../../config/AdapterUtil"
import * as poductAction from '../../actions/ProductAction' // 导入action方法
import { Header, TipPop, ProductCard } from '../../components/index'



const riskAction = NavigationActions.navigate({
    routeName: 'RiskAgreement',
    actions: NavigationActions.navigate({ routeName: 'RiskAgreement', })
})
class ServicePage extends Component {
    constructor(props) {
        super(props)
        // AsyncStorage.setItem('token', JSON.stringify('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1Mzg1NDg2NDYsImV4cCI6MTUzODcyMTQ0NiwidHlwZSI6MCwiaWQiOiIzIiwiZW50SWQiOiIyNSJ9.Z1TEnmVZ640hEMYdiaa8uwXt7C8uhl13v6bDYIap6lQ'),(error, result) =>{})
        AsyncStorage.getItem('token')
            .then((value) => {
                let jsonValue = JSON.parse((value));
                global.token = jsonValue
                console.info(jsonValue)
                this.setState({
                    token: global.token, 
                })
                this.props.getProductsCate(jsonValue);
            })
        this.state = {
            token: global.token,
            list: [],
            page: 1,
            total: 2,
            active: '1',
            category: [],
            products: {},
        };
        // this.props.getProductsCate(this.state.token);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.catesList && nextProps.type === 'GOT_PRODUCTCATE') {
            this.state.products[this.state.active] = nextProps.catesList.list;
            this.setState({
                category: nextProps.catesList["category"],
                active: nextProps.catesList["category"][0].id
            })
        }
        if(nextProps.productsList && nextProps.type === 'GOT_PRODUCTSLIST') {
            this.state.products[this.state.active] = nextProps.productsList.list;
        }
    }
    getdata(id) {
        this.props.getProductsList({
            token: this.state.token,
            id: id,
            page: 1,
            limit: 10,
        });
        this.setState({
            active: id
        })
    }

    scrollEnd(e,state) {
        let id = this.state.category[state.index].id;
        if(!this.state.products[id]) {
            this.getdata(id)
        }
    }
    

    _keyExtractor = (item, index) => item.id;

    renderCateItem = ({ item }) => {
        return (
            <View style = { styles.secondBarItem }>
                <Text onPress={ this.getdata.bind(this,item.id)} style = {styles.secondTitle}>{item.name}</Text>
                {   
                    this.state.active == item.id ? 
                    <View style = { styles.active}></View> : null
                }
                
            </View>
        )
    }

    renderViewItem = ({ item }) => {
        return (
            <View>
                <FlatList data = { this.state.products[this.state.active] }  style = { styles.body } keyExtractor={this._keyExtractor}
                renderItem = {({item}) => <ProductCard props = {this.props} item = {item}></ProductCard> }/>
            </View>
        )
    }

    render() {
        let { token, alert, catesList, productsList } = this.props;
        return ( 
            <View style = { styles.container }>
                <Header title= {'服务'} />
                <View style = { styles.secondBar }>
                    <FlatList
                    data = { this.state.category } 
                    keyExtractor={this._keyExtractor} 
                    horizontal={true}
                    renderItem = {this.renderCateItem}/>
                </View>
                <Swiper style={styles.wrapper} showsButtons = {false} 
                onMomentumScrollEnd={(e, state, context) => this.scrollEnd(e,state)}
                loop={false} showsPagination={false}>
                    {
                       this.state.category.map((item)=>{
                           return <FlatList data = { this.state.products[this.state.active] }  style = { styles.body } keyExtractor={this._keyExtractor} key={(item, index) => item.id}
                           renderItem = {({item}) => <ProductCard props = {this.props} item = {item}></ProductCard> }/>;
                       })
                    }
                </Swiper>
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
      productsList: state.productsReducer.productsList,
    }),
    (dispatch) => ({
        getProductsCate: (data) => dispatch(poductAction.getProductsCate(data)),
        getProductsList: (data) => dispatch(poductAction.getProductsList(data)),
    })
)(ServicePage)