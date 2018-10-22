import React, { Component } from 'react'
import { 
    View,
    Text,
    Image,
    Linking,
    SectionList,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native'
import { connect } from 'react-redux' // 引入connect函数

import * as customerAction from '../../actions/CustomerAction' // 导入action方法
import { unitWidth } from '../../config/AdapterUtil';
import { getFirstLetter } from '../../config/Util'

sections = []
class Section extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            list: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q','R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#' ],
            activekey: 'A'
        }
    }


    toTel(tel) {
        let url = 'tel: ' + tel;
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('不支持: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('通讯错误', err));
    }

    scrollKey(key) {
        sections.forEach((item,index) =>{
            if(item.title === key) {
                this.refs.sectionList.scrollToLocation({
                    sectionIndex: index,
                    itemIndex: 0,
                    viewOffset: unitWidth * 38,
                })
            }
        })
        
    }
    
    toCustomerDetail(id) {
        console.info(this.props)
        this.props.navigation.navigate("ViewCustomer",{id:id})
    }

  sectionItem = ({item, index, section}) => {
      return (
        <TouchableOpacity style={styles.iconBox} activeOpacity={0.8} onPress={
            this.toCustomerDetail.bind(this,item.id)}>
            <View style={styles.itemBox}  key={index}>
                <View style={[styles.itemPadding,index !== 0 && styles.itemBorder]}>
                    <View style={styles.leftItem}>
                        <Text  style={styles.leftTitle}>{item.name}</Text>
                        <View style={styles.itemTag}>
                            <View style={[styles.tagBox,styles.activeBox]}>
                                <Text  style={[styles.tagText,styles.activeText]}>未实名</Text>
                            </View>
                            <View style={[styles.tagBox,styles.activeBox]}>
                                <Text  style={[styles.tagText,styles.activeText]}>保守型</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.iconBox} activeOpacity={0.8} onPress={
                        this.toTel.bind(this,item.mobile)
                    }>
                        <Image style={styles.tabIcon} source={require('../../assets/image/room/phone.png')}/>
                    </TouchableOpacity>
                </View>
            
            </View>
        </TouchableOpacity>
      )
  }

  render() { 
    let {list} = this.props
    sections = list
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
                    <Text style={styles.headerTitle}>{title}</Text>
                </View>
            )}
            sections={sections}
            keyExtractor={(item, index) => index}
            />
            <View style = {styles.scrollKey}>
                {
                    this.state.list.map((item,index) => <View key={item}>
                    <Text style={[styles.keyText, this.state.activekey === item && styles.keyActivce]} onPress={this.scrollKey.bind(this,item)}>{item}</Text>
                </View>)
                }
            </View>
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
    }, 
    scrollKey: {
        position: 'absolute',
        top:0,
        right: unitWidth * 20,
        marginTop: unitWidth * 120,
        height: unitWidth * 1000,
    },
    keyText: {
        textAlign: 'center',
        color: 'rgb(204,204,204)',
        fontSize: unitWidth * 24,
        fontFamily:  'PingFang-SC-Regular',
    },
    keyActivce: {
        color: 'rgb(168,147,75)',
    },
    header: {
        height: unitWidth * 40,
        paddingLeft: unitWidth * 30,
        backgroundColor: '#f2f2f2',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    headerTitle: {
        color: 'rgb(128,128,128)',
        fontSize: unitWidth * 24,
        fontFamily:  'PingFang-SC-Regular',
    },
    itemBox: {
        height: unitWidth * 108,
        paddingLeft: unitWidth * 35,
        backgroundColor: '#ffffff',
    },
    itemPadding: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: unitWidth * 90,
    },
    itemBorder: {
        borderTopWidth: unitWidth * 2,
        borderColor: '#e6e6e6',
    },
    itemTag: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: unitWidth * 6,
    },
    leftItem: {
        paddingTop: unitWidth * 20,
    },
    leftTitle: {
        color: 'rgb(51,51,51)',
        fontSize: unitWidth * 28,
        fontFamily:  'PingFang-SC-Light',
    },
    tagBox: {
        borderWidth: unitWidth * 1,
        borderColor: '#cccccc',
        borderRadius: unitWidth * 20,
        marginRight: unitWidth * 10,
    },
    tagText: {
        color: '#cccccc',
        fontSize: unitWidth * 18,
        fontFamily:  'PingFang-SC-Light',
        paddingTop: unitWidth * 2,
        paddingBottom: unitWidth * 2,
        paddingLeft: unitWidth * 8,
        paddingRight: unitWidth * 8,
    },
    activeBox: {
        borderColor: 'rgb(168,147,75)',
    },
    activeText: {
        color: 'rgb(168,147,75)',
    },
    iconBox: {
        marginTop: unitWidth * 20,
    },
})
export default connect(
    (state) => ({
        type: state.customerReducer.type,
        customerList: state.customerReducer.customerList || [],
    }),
    (dispatch) => ({
        getCustomerList: (data) => dispatch(customerAction.getCustomerList(data)),
    })
)(Section)