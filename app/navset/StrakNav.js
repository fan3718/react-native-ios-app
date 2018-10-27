import {createStackNavigator} from 'react-navigation'

import BottomTabNavigator from "./TabNav"
import {
    LoginType, UserAgree, LoginMobile, LoginVcode, FaceReco, RecoSuccess,
    NewsDetail, RiskReveal, ProductDetail, ProductOrder, OrderSuccess,
    MyOrder, OrderDetail, FeedBack, JobCalendars, EditRemind, ViewRemind,
    ServiceCharge, EditCustomer, AddCommunicate, CustomerList,  ViewCustomer,
    ChildrenPerform, PerformDetail, LauchPage,
} from './../pages/index'
 const RootStack = createStackNavigator({
    BottomTabNavigator: {
        screen: BottomTabNavigator,
        navigationOptions: {
            header: null,
            headerBackTitle: "返回",
        }
    },
    NewsDetail: {
        screen: NewsDetail,
        navigationOptions: {
            headerTitle: '资讯详情',
        }
    },
    ServiceCharge: {
        screen: ServiceCharge,
        navigationOptions: {
            header: null,
        }
    },
    //登陆
    LauchPage: {
        screen: LauchPage,
        navigationOptions: {
            header: null,
            headerBackTitle: "返回",
        }
    },
    UserAgree: {
        screen: UserAgree,
        navigationOptions: {
            headerTitle: '用户协议',
        }
    },
    // LoginMobile: {
    //     screen: LoginMobile,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },
    // LoginVcode: {
    //     screen: LoginVcode,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },
    // FaceReco: {
    //     screen: FaceReco,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },
    // RecoSuccess: {
    //     screen: RecoSuccess,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },
    //产品/服务
    ProductDetail: {
        screen: ProductDetail,
        navigationOptions: {
            header: null,
        }
    },
    ProductOrder: {
        screen: ProductOrder,
        navigationOptions: {
            header: null,
        }
    },
    OrderSuccess: {
        screen: OrderSuccess,
        navigationOptions: {
            header: null,
        }
    },
    RiskReveal: {
        screen: RiskReveal,
        navigationOptions: {
            header: null,
        }
    },
    //我的预约
    MyOrder: {
        screen: MyOrder,
        navigationOptions: {
            header: null,
        }
    },
    OrderDetail: {
        screen: OrderDetail,
        navigationOptions: {
            header: null,
        }
    },
    FeedBack: {
        screen: FeedBack,
        navigationOptions: {
            header: null,
        }
    },
    //工作台历
    JobCalendars: {
        screen: JobCalendars,
        navigationOptions: {
            header: null,
        }
    },
    EditRemind: {
        screen: EditRemind,
        navigationOptions: {
            header: null,
        }
    },
    ViewRemind: {
        screen: ViewRemind,
        navigationOptions: {
            header: null,
        }
    },
    //客户管理
    CustomerList: {
        screen: CustomerList,
        navigationOptions: {
            header: null,
        }
    },
    EditCustomer: {
        screen: EditCustomer,
        navigationOptions: {
            header: null,
        }
    },
    ViewCustomer: {
        screen: ViewCustomer,
        navigationOptions: {
            header: null,
        }
    },
    AddCommunicate: {
        screen: AddCommunicate,
        navigationOptions: {
            header: null,
        }
    },
    ChildrenPerform: {
        screen: ChildrenPerform,
        navigationOptions: {
            header: null,
        }
    },
    PerformDetail: {
        screen: PerformDetail,
        navigationOptions: {
            header: null,
        }
    },
}, {
    /* 主屏幕的标题配置现在在这里 */
    //headerMode: 'none',
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
    //默认出现的首页页面
    initialRouteName: 'LauchPage',
    // mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    // headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    onTransitionStart: ()=>{ console.log('导航栏切换开始'); },  // 回调
});
export default RootStack