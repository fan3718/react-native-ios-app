import { createSwitchNavigator } from 'react-navigation'
import LoginType from '../pages/login/LoginType'
import RootStack from '../navset/StrakNav'
import UserAgree from "../pages/login/UserAgree"
import ProductDetail from "../pages/product/ProductDetail"
import MyOrder from "../pages/room/MyOrder"

const SwitchNav = createSwitchNavigator({
    // MyOrder:  MyOrder,
    App: RootStack
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