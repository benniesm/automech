import React from 'react';
import {
  Button,
  Icon,
  Image,
  Text,
  View,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import styles from '../Styles.js';
import fetchApi from './api/Fetch';
import Index from './Index';
import Login from './auth/Login';

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Index,
  },
  Sign: {
    screen: Login,
  },

});

const Navigator = createAppContainer(MyDrawerNavigator);

export default Navigator;
