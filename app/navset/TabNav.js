import {createBottomTabNavigator} from 'react-navigation'

import HomePage from "../pages/HomePage"
import DetailsPage from "../pages/DetailsPage"

const BottomTabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            tabBarLabel: '首页',//显示的标签文字
            //显示的图片
            // tabBarIcon: ({tintColor}) => (
            //     <Image
            //         // source={require('./images/ic_home.png')}
            //         style={[{height: 24, width: 24}, {tintColor: tintColor}]}
            //     />
            // ),
        },
    },
    Details: {
        screen: DetailsPage,
        navigationOptions: {
            tabBarLabel: '详情',//显示的标签文字
            //显示的图片
            // tabBarIcon: ({tintColor}) => (
            //     <Image
            //         // source={require('./images/ic_home.png')}
            //         style={[{height: 24, width: 24}, {tintColor: tintColor}]}
            //     />
            // ),
        },
    },

}, {
    navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, tintColor}) => {
            const {routeName} = navigation.state;
            let iconName;
            if (routeName === 'Home') {
                iconName = `ios-home${focused ? '' : '-outline'}`;
            } else if (routeName === 'Details') {
                iconName = `ios-options${focused ? '' : '-outline'}`;
            }

            // 在此处可以返回任何组件！
            // 我们通常使用react-native-vector-icons中的图标组件
            // return <Ionicons name={iconName} size={25} color={tintColor}/>;
        },
    }),
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        labelStyle: {
            fontSize: 16,
        },
        style: {
            backgroundColor: 'green',
        },
    },
    // animationEnabled: true,
    // swipeEnabled: false,
    // //是否可以滑动切换
    // swipeEnabled: true,
    // //切换是否有动画
    // animationEnabled: true,
    //进入App的首页面
    initialRouteName: 'Home',
});

export default BottomTabNavigator