/** @format */

import {AppRegistry} from 'react-native';
import Root from './app/root';
// import Root from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Root);
