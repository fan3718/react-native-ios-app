import React, { Component } from 'react';
import { 
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { unitWidth } from '../../config/AdapterUtil'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
        show: false
    }
  }
  

  render() { 
        const { title, hasBack, backTitle, type, nextTitle, nextStyle, nextRender} = this.props
        let current = null
        let content = <View style = { styles.content }>
                        {
                            hasBack? <TouchableOpacity style = { styles.back } activeOpacity={1} onPress={() => this.props.back()}>
                                    <Icon name="ios-arrow-back" size={unitWidth*50} color="white"/>
                                    <Text style = { styles.backTitle } >{backTitle || '返回'}</Text> 
                            </TouchableOpacity>: null
                        }
                        <Text style = { styles.headerTitle }>{title}</Text>
                        {
                            nextTitle? <View style = { styles.next }><Text style = { [styles.nextText, nextStyle ]} onPress={() => this.props.next()}>{nextTitle}</Text></View>: null
                        }
                        {
                            nextRender? <View style = { styles.next }>{nextRender}</View>: null
                        }
                    </View>
        switch(type){
            case 0: current = <ImageBackground style={styles.backgroundImage} source={require('./../../assets/image/tab/headerBg.png')}>{content}</ImageBackground>; breack
            default: current = <View style={[styles.backgroundBg,styles.backgroundImage]}>{content}</View> 
        }
        return(
            <View style = { styles.container }>
                {current}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height: unitWidth * 120,
        width: '100%',
        // alignItems: 'flex-start',
        // justifyContent: 'center',
    },
    backgroundImage:{
        width: '100%',
        height: unitWidth * 120,
    },
    content: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingTop: unitWidth * 30, 
    },
    backgroundBg: {
        backgroundColor: '#a8934b',
    },
    back: {
        position: 'absolute',
        left: unitWidth * 30,
        top: unitWidth * 15,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        height: unitWidth * 120,
    },
    next: {
        position: 'absolute',
        right: unitWidth * 40,
        top: unitWidth * 15,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        height: unitWidth * 120,
    },
    backTitle: {
        color: '#ffffff',
        fontSize: unitWidth * 32,
        fontFamily:  'PingFang-SC-Medium',
        marginLeft: unitWidth * 5,
    },
    headerTitle: {
        color: '#ffffff',
        fontSize: unitWidth * 36,
        fontFamily:  'PingFang-SC-Medium',
    },
    nextText: {
        color: '#ffffff',
        fontSize: unitWidth * 30,
        fontFamily:  'PingFang-SC-Regular',
    },
})