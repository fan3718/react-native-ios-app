import React, { Component } from 'react'
import { 
    View,
    Text,
    Animated,
    Modal,
    ScrollView,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ImageBackground
} from 'react-native'

import { unitWidth, height } from '../../config/AdapterUtil'

const TOP = unitWidth * 500
export default class TopModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            opacity: new Animated.Value(0),
            selectedValue: [],
            data: [],
            allSelected: false,
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        })
    }
    setModalVisible(visible) {
        let isShow = visible || !this.state.modalVisible
        if(isShow) {
            this.toShow()
        }else{
            this.toHide()
        }
    }

    toHide() {
        Animated.timing(
            // Animate value over time
            this.state.opacity, // The value to drive
            {
              toValue: 0, // Animate to final value of 1
              duration: 500,
            }
          ).start(() => this.setState({ modalVisible: false }));
    }
    toShow() {
        this.setState({ modalVisible: true })
        Animated.timing(
            // Animate value over time
            this.state.opacity, // The value to drive
            {
              toValue: 1, // Animate to final value of 1
              duration: 500,
            }
          ).start();
    }

    search() {
        let list = [];
        this.state.data.forEach(adviser => {
            if(list.indexOf(adviser.name) > -1){
                return false
            }
            if(this.state.allSelected) {
                list.push(adviser.name)
            }else if(this.state.selectedValue.indexOf(adviser.id) > -1) {
                list.push(adviser.name)
            }
        });
        this.props.filterList(list);
    }

    selectPerson(key) {
        let newArr = []
        let arr = newArr.concat(this.state.selectedValue)
        let index = arr.indexOf(key)
        if(key === 'All') {
            this.setState({
                allSelected: !this.state.allSelected
            })
        }
        if(index > -1) {
            if(key === 'All') {
                arr = newArr
            }else{
                arr.splice(index, 1)
                if(this.state.allSelected) {
                    this.setState({
                        allSelected: !this.state.allSelected
                    })
                }
            }
        }else{
            if(key === 'All') {
                arr = []
                if(!this.state.allSelected) {
                    this.state.data.forEach(item => {
                        arr.push(item.id)
                    })
                }
            }else{
                arr.push(key)
            }
        }
        this.setState({
            selectedValue: arr
        })
    }

    render() { 
        return(
            <View style={[styles.container, !this.state.modalVisible && {width: 0,height: 0}]}>
                {this.state.modalVisible ? <TouchableOpacity activeOpacity={1} style={styles.mask}
                onPress={() => {
                    this.setModalVisible();
                }}></TouchableOpacity> : null}
                <Animated.View  style = {[styles.modelBox,{
                opacity: this.state.opacity,//将动画对象赋值给需要改变的样式属性
                }]}>
                    <View style = {styles.modelPadding}>
                        <View style = {styles.modelHeader}>
                            <Text style = {styles.headerText}>查看范围</Text>
                        </View>
                        <View style = {styles.modelBody}>
                            <View style = {[styles.btnBox,{width: unitWidth * 100},this.state.allSelected && styles.bgColor]}>
                                <Text onPress={this.selectPerson.bind(this,'All')} style = {[styles.btnText,this.state.allSelected && styles.textColor]}>全部</Text>
                            </View>
                            <FlatList data = { this.state.data } keyExtractor={(item,index) => index.toString()} style = {styles.content} numColumns= {4}
                            horizontal={false} extraData= {this.state} renderItem = {({item}) => 
                                <TouchableOpacity style={styles.btnImage} activeOpacity={0.6} onPress={this.selectPerson.bind(this,item.id)}>
                                    <View style = {[styles.btnBox,(this.state.selectedValue.includes(item.id) ||this.state.allSelected) && styles.bgColor]}>
                                        <Text style = {[styles.btnText,(this.state.selectedValue.includes(item.id) ||this.state.allSelected) && styles.textColor]}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            }/>
                        </View>
                    </View>
                    <View style={styles.bottomBar}>
                        <TouchableOpacity style={styles.btnImage} activeOpacity={0.6} onPress={this.search.bind(this)}>
                            <ImageBackground style={styles.btnImage} source={require('./../../assets/image/tab/shortBtn.png')}>
                                <Text style={styles.bottomBtn}>确认</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View> 
        )
    }
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        // flex: 1,
        top: unitWidth * 120,
        width: '100%',
        height: height - unitWidth * 120,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    mask: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    modelBox: {
        position: 'absolute',
        top: 0,
        height: TOP,
        width: '100%',
        backgroundColor: '#a8934b',
        // padding: unitWidth * 30,
    },
    modelPadding: {
        paddingRight: unitWidth * 30,
        paddingLeft: unitWidth * 30,
        paddingRight: unitWidth * 30,
    },
    modelHeader: {
        height: unitWidth * 60,
        borderBottomWidth: unitWidth * 1,
        borderColor: '#cccccc',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    btnBox: {
        borderWidth: unitWidth * 2,
        borderColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        // width: unitWidth * 120,
        marginRight: unitWidth * 30,
        marginTop: unitWidth * 30,
        borderRadius: unitWidth * 20,
    },
    bgColor: {
        backgroundColor: '#ffffff',
    },
    textColor: {
        color: '#a8934b',
    },
    headerText: {
        color: '#ffffff',
        fontSize: unitWidth * 28,
        fontFamily:  'PingFang-SC-Regular',
    },
    btnText: {
        color: '#ffffff',
        fontSize: unitWidth * 20,
        fontFamily:  'PingFang-SC-Regular',
        paddingTop: unitWidth * 4,
        paddingBottom: unitWidth * 4,
        paddingLeft: unitWidth * 20,
        paddingRight: unitWidth * 20,
    },
    modelBody: {
        // position: 'relative',
        paddingTop: unitWidth * 10,
        paddingBottom: unitWidth * 26,
        // height: unitWidth * 400,
        // width: '100%',
    },
    content: {
        height: unitWidth * 240,
        marginLeft: - unitWidth * 15,
        marginRight: - unitWidth * 15,
        // width: '100%',
        // flexWrap: 'wrap',
        // flexDirection: 'row',
        // backgroundColor: 'red',
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: unitWidth * 90,
    },
    btnImage: {
        width: unitWidth * 180,
        height: unitWidth * 90,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: - unitWidth * 3,
    },
    bottomBtn:{
        color: '#FFFFFF',
        fontSize: unitWidth * 30,
        fontFamily:  'PingFang-SC-Medium',
    },
})