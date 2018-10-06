import {createStackNavigator} from 'react-navigation'

import BottomTabNavigator from "./TabNav"
import {
    LoginType, UserAgree, LoginMobile, LoginVcode, FaceReco, RecoSuccess,
    NewsDetail, RiskReveal, ProductDetail, ProductOrder, OrderSuccess,
    MyOrder, OrderDetail, FeedBack,
    
    SettingsPage, 
    SettingsPage2,
} from './../pages/index'
const RootStack = createStackNavigator({
    BottomTabNavigator: {
        screen: BottomTabNavigator,
        navigationOptions: {
            header: null,
        }
    },
    LoginType: LoginType,
    UserAgree: UserAgree,
    LoginMobile: LoginMobile,
    LoginVcode: LoginVcode,
    FaceReco: FaceReco,
    RecoSuccess: RecoSuccess,

    NewsDetail: NewsDetail,
    ProductDetail: ProductDetail,
    ProductOrder: ProductOrder,
    OrderSuccess: OrderSuccess,
    RiskReveal: RiskReveal,
    MyOrder: MyOrder,
    OrderDetail: OrderDetail,
    FeedBack: FeedBack,




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
        header: null,
        title: navigation.state.routeName,
        
        headerStyle: {
            backgroundColor: 'rgb(168,147,75)',
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