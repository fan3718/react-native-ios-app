import React, { Component } from 'react'
import {
    WebView
} from 'react-native'

export default class NewsDetail extends Component {
    static navigationOptions = {
        headerTitle: '资讯详情',
        titleStyle: {color: '#ffffff'},
        headerStyle:{backgroundColor:'rgb(168,147,75)'},
    };

    constructor(props) {
        super(props)
        // this.props.navigation.goBack('NewsPage')
    }

    render() {
        return ( 
            <WebView source={{uri: 'http://puhui.noonme.com/html/information/view?id=' + this.props.navigation.state.params.id}}/>
        )
    }
}