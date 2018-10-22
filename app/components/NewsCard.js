import React, { Component } from 'react';
import { 
    View,
    Text, 
    Image,
    TouchableOpacity,
    StyleSheet
 } from 'react-native'

import { unitWidth } from './../config/AdapterUtil'

export default class NewsCard extends Component {
  constructor(props) {
    super(props)
  }

  toDetail(item) {
    // this.props.props.navigation.dispatch(detailAction);
    this.props.props.navigation.navigate("NewsDetail",{id:item.id});
  }

  render() { 
    const { item } = this.props
    return(
        <View style = {styles.cardBox}>
            <TouchableOpacity onPress={this.toDetail.bind(this,item)} activeOpacity={0.8}>
                <View style = {styles.cardHeader}>
                    <Text st
                    yle = {styles.headerTitle}>{item.author} | {item.createTime}</Text>
                </View>
                <View style = {styles.cardBody}>
                    <View style = {styles.bodyLeft}>
                        <Text style = {styles.cardTitle}>{item.summary}</Text>
                    </View>
                    <Image style={styles.cardImg}
                    source = {{ uri : item.pictureUrl}}></Image>
                </View>
            </TouchableOpacity>
        </View>
    )
  }
}
const styles = StyleSheet.create({
    cardBox: {
        // height: unitWidth * 210,
        marginTop: unitWidth * 32,
        paddingLeft: unitWidth * 32,
        paddingRight: unitWidth * 32,
        paddingBottom: unitWidth * 32,
        backgroundColor: '#ffffff',
    },
    cardHeader: {
        paddingTop: unitWidth * 12,
        paddingBottom: unitWidth * 12,
    },
    headerTitle: {
        color: '#cccccc',
        fontSize: unitWidth * 24,
        fontFamily:  'PingFang-SC-Medium',
    },
    cardBody: {
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    bodyLeft: {
        width: '68%',
        borderColor: '#cccccc',
        borderTopWidth: 0.5,
    },
    cardTitle: {
        paddingTop: unitWidth * 30,
        color: '#333333',
        fontSize: unitWidth * 30,
        fontFamily:  'PingFang-SC-Medium',
    },
    cardImg: {
        width: '26%',
        resizeMode: 'contain',
    },
});