import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { NavigationActions } from 'react-navigation'

import { RISK_REVEAL } from './../../config/StaticData'
import { unitWidth } from '../../config/AdapterUtil'
import { Header, } from '../../components/index'

const detailAction = NavigationActions.navigate({
  routeName: 'ProductDetail',
  actions: NavigationActions.navigate({routeName: 'ProductDetail',})
})

export default class RiskReveal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            content: RISK_REVEAL.content,
            backType: this.props.navigation.state.params,
        }
        // this.props.navigation.goBack(detailAction)
    }

    _keyExtractor = (item, index) => item.id;

    _keyChildren = (item, index) => item.id + 'children';
    
    renderContentItem = ({ item }) => {
        return (
            <View>
                <Text style = { styles.content }>{item.title}</Text>
                {
                    item.content && item.content.length > 0 ? item.content.map((text,index) => 
                    <Text key = { 'text' + item.id + index} style = { styles.content }>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{text}</Text>
                    ) : null
                }
                {
                    item.children && item.children.length > 0 ? <FlatList data = { item.children }  style = { styles.chindren } keyExtractor={this._keyChildren}
                    renderItem = {this.renderContentItem}/> : null
                }
                {
                    item.title.length === 0 ?  <RiskFooter props = {this.props}></RiskFooter>: null
                }
            </View>
        )
    }

    goBack() {
        // console.info(this.props.navigation)
        if(this.state.backType && this.state.backType.type === 'detail') {
            this.props.navigation.dispatch(detailAction)
        }else{
            this.props.navigation.goBack()
        }
    }

    render() {
        return ( 
            <View>
                <Header title= {'风险揭示书'} hasBack={true} back={this.goBack.bind(this)} props = {this.props.navigation}/>
                <View style = { styles.container }>
                    <FlatList data = { this.state.content }  style = {{ paddingTop: unitWidth * 20, }} keyExtractor={this._keyExtractor}
                    renderItem = {this.renderContentItem}/>
                </View>
            </View>
        )
    }
}
class RiskFooter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
        }
    }

    readKnow() {
        this.props.props.navigation.dispatch(detailAction)
    }

    agree() {
        this.setState({
            checked: !this.state.checked,
        })
    }

    render() {
        return ( 
            <View>
                <TouchableOpacity onPress={this.readKnow.bind(this)}  style={styles.btnImg}>
                    <Image source={require('../../assets/image/service/readKnow.png')}/>            
                </TouchableOpacity>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.radioBtn} onPress={this.agree.bind(this)}>
                    <View style={styles.radioCircle}>
                        <View style={this.state.checked ? styles.radioDot : null}></View>
                    </View>
                    </TouchableOpacity>
                    <Text style={styles.footerWhite} onPress={this.agree.bind(this)}>下次不再提醒</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingLeft: unitWidth * 20,
        paddingRight: unitWidth * 20,
        paddingBottom: unitWidth * 270,
    },
    content: {
        paddingTop: unitWidth * 20,
        fontFamily:  'PingFang-SC-Medium',
    },
    chindren: {
        // paddingTop: unitWidth * 20,
        paddingLeft: unitWidth * 20,
        paddingRight: unitWidth * 20,
    },
    btnImg: {
        alignItems:'center',
        justifyContent:'center',
        paddingTop: unitWidth * 20,
        paddingBottom: unitWidth * 20,
    },
    footer: {
        flexDirection: 'row',
        // position: 'relative',
        alignItems:'center',
        justifyContent:'center',
        paddingBottom: unitWidth * 20,
        paddingBottom: unitWidth * 40,
      },
      footerWhite: {
        color: '#cccccc',
        fontSize: unitWidth * 26,
        fontFamily:  'PingFang-SC-Medium',
      },
      radioBtn: {
        marginTop: unitWidth * 10,
        marginRight: unitWidth * 10,
      },
      radioCircle: {
        height: unitWidth * 20,
        width: unitWidth * 20,
        padding: unitWidth * 2,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'rgb(217,217,217)'
      },
      radioDot: {
        height: '100%',
        width: '100%',
        borderRadius: 20,
        backgroundColor: 'rgb(168,147,75)'
      },
});