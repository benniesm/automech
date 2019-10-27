import React from 'react';
import { createAppContainer, DrawerNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import SideMenu from './components/SideMenu';
import Index from './Index';
import Login from './auth/Login';
import ViewBasicProfile from './screens/profile/basic/View';
import UpdateBasicProfile from './screens/profile/basic/Update';

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Index,
  },
  Profile: {
    screen: ViewBasicProfile,
  },
  Sign: {
    screen: Login,
  },
  update: {
    screen: UpdateBasicProfile,
  }
}, {
  contentComponent: SideMenu,
  drawerWidth: 250
});

const Navigator = createAppContainer(MyDrawerNavigator);

export default Navigator;
