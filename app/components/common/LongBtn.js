import React, { Component } from 'react';
import { 
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
 } from 'react-native'
 
 import { unitWidth } from '../../config/AdapterUtil'

export default class LongBtn extends Component {
    constructor(props) {
        super(props)
    }

    render() { 
        const { title } = this.props
        return(
            <TouchableOpacity style={styles.footer} activeOpacity={0.6} onPress={() => this.props.onPress()}>
                <ImageBackground style={styles.longBtn} source={require('./../../assets/image/service/longBtn.png')}>
                    <Text style={styles.longBtnText}>{title}</Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    footer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    longBtn: {
        width: unitWidth * 640,
        height: unitWidth * 90,
        alignItems: 'center',
        justifyContent: 'center',
    },
    longBtnText:{
        color: '#FFFFFF',
        fontSize: unitWidth * 30,
        fontFamily:  'PingFang-SC-Medium',
    },
});