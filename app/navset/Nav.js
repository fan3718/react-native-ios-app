import { createSwitchNavigator } from 'react-navigation'
import RootStack from '../navset/StrakNav'

import {
    JobCalendars,EditCustomer,ViewCustomer,CustomerList,ChildrenPerform,PerformDetail,LoginType,
    LauchPage, UserAgree,
} from './../pages/index'
const SwitchNav = createSwitchNavigator({
    // LauchPage: {
    //     screen: LauchPage,
    //     navigationOptions: {
    //         header: null,
    //         headerBackTitle: "返回",
    //     }
    // },
    // UserAgree: {
    //     screen: UserAgree,
    //     navigationOptions: {
    //         headerTitle: '用户协议',
    //     }
    // },
    App: RootStack,
},{
    initialRouteName: 'App',
    navigationOptions: ({navigation}) => ({
        title: navigation.state.routeName,
        
        headerStyle: {
            backgroundColor: 'rgb(168,147,75)',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }),
});


export default SwitchNav;