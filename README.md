## installation 开发环境安装

brew install node
brew install watchman
npm install -g yarn react-native-cli

cd ./phcf/
npm install/yarn install

```
react-native-scrollable-tab-view SceneComponent.js 报错
    cd ./node_module/react-native-scrollable-tab-view/SceneComponent.js
    第九行  ...props 后 ','删除

native echarts
    Platform引入
    import { WebView, View, StyleSheet, Platform } from 'react-native';
    const source = Platform.OS === 'ios' ? require('./tpl.html') : { uri: 'file:///android_asset/tpl.html'}
    
    <WebView
    originWhitelist={['*']}
    source={source}/>
```

## Run

1. xcode  
    cd ./ios/phcf.xcodepoj  Build and then run the current secheme
    右侧可以选择手机型号/连接的测试机
2. 终端命令行启动 react-native run-ios
