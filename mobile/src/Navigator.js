import React from 'react';
import { createAppContainer, DrawerNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import SideMenu from './components/SideMenu';
import Index from './Index';
import Login from './auth/Login';
import CreateVendorProfile from './screens/profile/vendor/Create';
import UpdateBasicProfile from './screens/profile/basic/Update';
import UpdateVendorProfile from './screens/profile/vendor/Update';
import ViewBasicProfile from './screens/profile/basic/View';
import ViewVendorProfile from './screens/profile/vendor/View';

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Index,
  },
  Profile: {
    screen: ViewBasicProfile,
  },
  createVendorProfile: {
    screen: CreateVendorProfile,
  },
  Sign: {
    screen: Login,
  },
  updateBasicProfile: {
    screen: UpdateBasicProfile,
  },
  updateVendorProfile: {
    screen: UpdateVendorProfile,
  },
  Vendor: {
    screen: ViewVendorProfile,
  },
}, {
  contentComponent: SideMenu,
  drawerWidth: 250
});

const Navigator = createAppContainer(MyDrawerNavigator);

export default Navigator;
