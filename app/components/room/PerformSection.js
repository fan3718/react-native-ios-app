import React, { Component } from 'react'
import { 
    View,
    Text,
    Image,
    ScrollView,
    SectionList,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { unitWidth } from '../../config/AdapterUtil';

export default class PerformSection extends Component {
    constructor(props) {
        super(props)
    }

  sectionItem({item, index, section}) {
      return (
            <View style={styles.itemBox}  key={index}>
                <View style={[styles.itemPadding, index !== 0 && styles.itemBorder]}>
                    <View style={styles.topItem}>
                        <Text  style={styles.topTitle}>{item.productName}</Text>
                    </View>
                    <View style={styles.bottomItem}>
                        <Text  style={styles.bottomText}>销售姓名：{item.advisorName}</Text>
                        <Text  style={styles.bottomText}>额度：{item.signAmount || item.reservationAmount} 万</Text>
                    </View>
                </View>
            </View>
      )
  }

  render() { 
    const { perform } = this.props
    return(
        <View style={styles.container}>
            <SectionList ref='sectionList' 
            renderItem={this.sectionItem} onViewableItemsChanged={(obj) =>
                this.setState({
                activekey: obj.viewableItems.length > 0 ? obj.viewableItems[0].section.title : 'A'
            })
        }   stickySectionHeadersEnabled = {false} //header顶端停留
            renderSectionHeader={({ section: { title } }) => (
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>日期：{title}</Text>
                </View>
            )}
            renderSectionFooter = {() => 
                <View style={styles.footerBorder}></View>
            }
            sections={perform} 
            onEndReached ={() => this.props.onEnd()}
            keyExtractor={(item, index) => index}
            />
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%',
        width: '100%',
        paddingBottom: unitWidth * 40,
        backgroundColor: '#ffffff',
    }, 
    header: {
        height: unitWidth * 60,
        paddingLeft: unitWidth * 30,
        marginTop: unitWidth * 40,
        backgroundColor: '#f2f2f2',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderTopWidth: unitWidth * 2,
        borderBottomWidth: unitWidth * 2,
        borderColor: '#e6e6e6',
    },
    headerTitle: {
        color: 'rgb(128,128,128)',
        fontSize: unitWidth * 24,
        fontFamily:  'PingFang-SC-Regular',
    },
    itemBox: {
        // height: unitWidth * 140,
        paddingLeft: unitWidth * 35,
    },
    itemPadding: {
        justifyContent: 'center',
        paddingRight: unitWidth * 40,
        paddingTop: unitWidth * 30,
        paddingBottom: unitWidth * 30,
    },
    itemBorder: {
        borderTopWidth: unitWidth * 2,
        borderColor: '#e6e6e6',
    },
    topItem:{
        // paddingTop: unitWidth * 20,
    },
    topTitle: {
        color: '#333333',
        fontSize: unitWidth * 32,
        fontFamily:  'PingFang-SC-Regular',
    },
    bottomItem: {
        paddingTop: unitWidth * 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bottomText: {
        color: '#808080',
        fontSize: unitWidth * 28,
        fontFamily:  'PingFang-SC-Light',
    }, 
    footerBorder: {
        borderTopWidth: unitWidth * 2,
        borderColor: '#e6e6e6',
    },
})