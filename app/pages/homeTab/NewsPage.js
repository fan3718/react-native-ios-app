import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native'
import { connect } from 'react-redux' // 引入connect函数

import { unitWidth } from '../../config/AdapterUtil'
import * as newsAction from '../../actions/NewsAction' // 导入action方法
import { Header, TipPop, NewsCard } from '../../components/index'

class NewsPage extends Component {
    constructor(props) {
        super(props)
        // this.props.navigation.dispatch(modelAction)
        this.state = {
            token: global.token,
            news: [],
            page: 1,
            total: 2,
        };
        this.getdata();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.newsList && nextProps.type === 'GOT_NEWSLIST') {
            this.setState({
                news: nextProps.newsList.list,
            })
        }
    }
    getdata() {
        this.props.getNewsList({
            page: 1,
            limit: 10,
        });
    }

    _keyExtractor = (item, index) => item.id.toString();

    render() {
        return ( 
            <View style = { styles.container }>
                <Header title= {'资讯'} />
                <FlatList data = { this.state.news }  style = { styles.body } keyExtractor={this._keyExtractor}
                renderItem = {({item}) => <NewsCard props = {this.props} item = {item}></NewsCard> }/>
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
        fontSize: 30,
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
        fontSize: unitWidth * 30,
        fontFamily:  'PingFang-SC-Medium',
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
      type: state.newsReducer.type,
      newsList: state.newsReducer.newsList,
    }),
    (dispatch) => ({
        getNewsList: (data) => dispatch(newsAction.getNewsList(data)),
    })
  )(NewsPage)