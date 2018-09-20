import {createStackNavigator} from 'react-navigation'

import LoginType from '../pages/login/LoginType'
import UserAgree from "../pages/login/UserAgree"
import LoginMobile from "../pages/login/LoginMobile"
import LoginVcode from "../pages/login/LoginVcode"

import SettingsPage from "../pages/SettingsPage"
import SettingsPage2 from "../pages/SettingsPage2"
import BottomTabNavigator from "./TabNav"
const RootStack = createStackNavigator({
    BottomTabNavigator: {
        screen: BottomTabNavigator,
        navigationOptions: {
            header: null,
        }
    },
    LoginType: LoginType,
    LoginMobile: LoginMobile,
    LoginVcode: LoginVcode,
    UserAgree: {
        screen: UserAgree,
    },
    Settings: {
        screen: SettingsPage
    },
    Set2: {
        screen: SettingsPage2
    }
}, {
    /* 主屏幕的标题配置现在在这里 */
    //headerMode: 'none',
    navigationOptions: ({navigation}) => ({
        title: navigation.state.routeName,
        
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }),
    //默认出现的首页页面
    initialRouteName: 'BottomTabNavigator',
    // mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    // headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    onTransitionStart: ()=>{ console.log('导航栏切换开始'); },  // 回调
});

export default RootStack