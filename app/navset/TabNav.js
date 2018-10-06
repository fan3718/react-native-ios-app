import React, { Component } from 'react';
import {
  Image,
} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation'
import { unitWidth } from "./../config/AdapterUtil"
import RoomPage from "../pages/homeTab/RoomPage"
import NewsPage from "../pages/homeTab/NewsPage"
import ServicePage from "../pages/homeTab/ServicePage"

const BottomTabNavigator = createBottomTabNavigator({
    Service: {
        screen: ServicePage,
        navigationOptions: {
            tabBarLabel: '服务',//显示的标签文字
            //显示的图片
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./../assets/image/tab/ic_service.png')}
                    style={[{height: 24, width: 24}, {tintColor: tintColor}]}
                />
            ),
        },
    },
    News: {
        screen: NewsPage,
        navigationOptions: {
            tabBarLabel: '资讯',//显示的标签文字
            //显示的图片
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./../assets/image/tab/ic_news.png')}
                    style={[{height: 24, width: 24}, {tintColor: tintColor}]}
                />
            ),
        },
    },
    Room: {
        screen: RoomPage,
        navigationOptions: {
            tabBarLabel: '工作室',//显示的标签文字
            //显示的图片
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./../assets/image/tab/ic_room.png')}
                    style={[{height: 24, width: 24}, {tintColor: tintColor}]}
                />
            ),
        },
    },
}, {
    navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, tintColor}) => {
            const {routeName} = navigation.state;
            let iconName;
            // if (routeName === 'Service') {
            //     iconName = `ios-home${focused ? '' : '-outline'}`;
            // } else if (routeName === 'News') {
            //     iconName = `ios-options${focused ? '' : '-outline'}`;
            // } else if (routeName === 'Wealth') {
            //     iconName = `ios-options${focused ? '' : '-outline'}`;
            // }

            // 在此处可以返回任何组件！
            // 我们通常使用react-native-vector-icons中的图标组件
            // return <Ionicons name={iconName} size={25} color={tintColor}/>;
        },
    }),
    tabBarOptions: {
        activeTintColor: '#b6a878',
        inactiveTintColor: '#cccccc',
        labelStyle: {
            fontSize: unitWidth * 22,
            fontFamily:  'PingFang-SC-Regular',
        },
        style: {
            backgroundColor: 'white',
        },
    },
    // animationEnabled: true,
    // swipeEnabled: false,
    // //是否可以滑动切换
    // swipeEnabled: true,
    // //切换是否有动画
    // animationEnabled: true,
    //进入App的首页面
    initialRouteName: 'Room',
});

export default BottomTabNavigator