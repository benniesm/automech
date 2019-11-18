import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps
} from './store/StateDispatch';
import fetchApi from './api/Fetch';
import styles from '../Styles';
import Header from './components/Header';
import Loading from './components/Loading';
import SignInButton from './components/SignInButton';
import ScreensIndex from './components/ScreensIndex';

class Container extends Component {
	constructor(props) {
		super(props);
	}

  componentDidMount() {
    this.getProfile();
    this.getServiceTypes();
    this.getMyPosition();
  }

  getMyPosition = () => {
		Geolocation.watchPosition(info => {
      console.log(info.coords)

      let currentCoords = info.coords;
      currentCoords.latitudeDelta = 0.0100;
      currentCoords.longitudeDelta = 0.0020;
      this.props.coordsSet(currentCoords);

      let marks = {
        latlng: {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude
        },
        title: 'Your Current Location',
        description: 'AutoMech keeps you connected!'
      };
      this.props.markMeSet(marks);
      console.log(this.props.state.map);
    });
  }

  getProfile = async() => {
    const profileData = this.props.state.auth.profile;
    //console.log(profileData);
    if (profileData === null) {
      this.props.loadOff();
      this.props.navigation.navigate('Sign');
      return;
    }
    console.log(profileData);

    this.props.loadOn();
    let myProfile = await fetchApi.fetchNow(
      'get',
      {
        'url': 'profile',
        'fetchId': profileData.id,
        'data': '',
        'token': profileData.api_token
      }
    );
    this.props.loadOff();

    if (myProfile.status !== 200) {
      this.props.navigation.navigate('Sign');
    }
  }

  getServiceTypes = async() => {
    const profileData = this.props.state.auth.profile;

    if (profileData === null) {
      this.props.loadOff();
      this.props.navigation.navigate('Sign');
      return;
    }

    this.props.loadOn();
    let services = await fetchApi.fetchNow(
      'get',
      {
        'url': 'service-types',
        'data': '',
        'token': profileData.api_token
      }
    );
    this.props.loadOff();

    if (services.status === 200) {
      this.props.servicesGet(services.data);
      console.log(this.props.state.page.list);
    }
  }

  goToSignIn = () => {
    this.props.navigation.navigate('Sign');
  }

  render() {
    return this.props.state.load.loading === true ?
      <View style={styles.loading}><Loading /></View>
      :
      this.props.state.auth.authenticated === true ?
        (
          <>
            <Header
              drawer={this.props.navigation.openDrawer}
              page='AUTOMECH' />
            <View style={styles.window}>
              <ScreensIndex nav={this.props.navigation.navigate} />
            </View>
          </>
        )
        :
        (
          <View>
    				<SignInButton goTo={() => this.goToSignIn()} />
          </View>
        )
  }
}

const Index = connect(mapStateToProps, mapDispatchToProps)(Container);

export default Index;
