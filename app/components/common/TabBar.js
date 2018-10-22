import React, { Component } from 'react'
import { 
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native'

import { unitWidth } from '../../config/AdapterUtil'

export default class TabBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posLeft: 0
        }
    }

    componentDidMount() {
        this.props.scrollValue.addListener(this.setAnimationValue.bind(this));    
    }

    componentWillUnmount() {
        this.props.scrollValue.removeListener(this.setAnimationValue); 
    }

    setAnimationValue({value}) {
        this.setState({
            posLeft: unitWidth * (this.props.width || 150) * value
        })
    }

    changeTab(index) {
        this.props.goToPage(index)
    }

    render() { 
        const { tabs, tabWidth, lineStyle, layout,tabText } = this.props
        return(
            <View style={[styles.container,layout]}>
                <View style={styles.tabBarBox}>
                    <View style={styles.tabContent}>
                        {
                            tabs.map((item,index) => {
                                return <View style={[styles.tabTextBox, tabWidth]} key={index + 'tab'}>
                                    <Text onPress={this.changeTab.bind(this,index)} style={[styles.tabText,tabText]}>{item}</Text>
                                </View>
                            })
                        }
                    </View>
                    <View style={[styles.tabLinePos,{left: this.state.posLeft}]}>
                        <View style={[styles.tabLine,lineStyle]}></View>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: unitWidth * 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#a8934b',
    },
    tabBarBox: {
        position: 'relative',
    },
    tabContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: '100%',
    },
    tabBar: {
        marginLeft: '20%',
        marginRight: '20%',
    },
    tabTextBox: {
        width: unitWidth * 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        color: '#ffffff',
        fontSize: unitWidth * 30,
        fontFamily:  'PingFang-SC-Medium',
    },
    tabLinePos: {
        position: 'absolute',
        bottom: unitWidth * 1,
    },
    tabLine: {
        width: unitWidth * 50,
        height: unitWidth * 7,
        marginLeft: unitWidth * 50,
        marginRight: unitWidth * 50,
        borderRadius: unitWidth * 7,
        backgroundColor: '#ffffff',
    },
});