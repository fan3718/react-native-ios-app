import React, { Component } from 'react'
import {
    WebView,
} from 'react-native'
import { unitWidth } from '../../config/AdapterUtil'
export default class NewsDetail extends Component {
    constructor(props) {
        super(props)
        // this.props.navigation.goBack('NewsPage')
    }

    render() {
        return (
            <WebView contentInset={{top: - unitWidth * 60}} source={{uri: 'http://puhui.noonme.com/html/information/view?id=' + this.props.navigation.state.params.id}}/>
        )
    }
}