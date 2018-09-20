import { createSwitchNavigator } from 'react-navigation'
import LoginType from '../pages/login/LoginType'
import RootStack from '../navset/StrakNav'
import LoginVcode from "../pages/login/LoginVcode"

const SwitchNav = createSwitchNavigator({
    LoginVcode:LoginVcode,
    App: RootStack
},{
    initialRouteName: 'LoginVcode',
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
});


export default SwitchNav;