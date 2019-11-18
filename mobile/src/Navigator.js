import React from 'react';
import { createAppContainer, DrawerNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import SideMenu from './components/SideMenu';
import Index from './Index';
import Login from './auth/Login';
import CreateVendorProfile from './screens/profile/vendor/Create';
import UpdateBasicProfile from './screens/profile/basic/Update';
import UpdateVendorLocation from './screens/profile/vendor/UpdateLocation';
import UpdateVendorProfile from './screens/profile/vendor/Update';
import UploadVendorImage from './screens/profile/vendor/UploadImage';
import ViewBasicProfile from './screens/profile/basic/View';
import ViewVendorProfile from './screens/profile/vendor/View';
import Services from './screens/services/Services';

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Index,
  },
  Profile: {
    screen: ViewBasicProfile,
  },
  CreateVendorProfile: {
    screen: CreateVendorProfile,
  },
  Sign: {
    screen: Login,
  },
  UpdateBasicProfile: {
    screen: UpdateBasicProfile,
  },
  UpdateVendorLocation: {
    screen: UpdateVendorLocation,
  },
  UpdateVendorProfile: {
    screen: UpdateVendorProfile,
  },
  UploadVendorImage: {
    screen: UploadVendorImage,
  },
  Vendor: {
    screen: ViewVendorProfile,
  },
  Services: {
    screen: Services,
  },
}, {
  contentComponent: SideMenu,
  drawerWidth: 250
});

const Navigator = createAppContainer(MyDrawerNavigator);

export default Navigator;
