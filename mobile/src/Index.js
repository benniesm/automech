import React, { Component } from 'react';
import {
  Alert,
  PermissionsAndroid,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps
} from './store/StateDispatch';
import fetchApi from './api/Fetch';
import getPermissions from './functions/PermissionsCheck';
import requestPermissions from './functions/PermissionsRequest';
import uiData from './assets/data/UiData';
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
    this.getMyPosition();
    this.getProfile();
    this.getServiceTypes();
  }

  getMyPosition = async() => {
    try {
      const granted = await getPermissions();
      if (!granted) {
        const grantPerms = await requestPermissions(
          this.props,
          uiData.notifyPerms
        );
        if (!grantPerms) {
          return false;
        }
      }
    } catch(e) {
      //Alert.alert('Could not determine app permissions');
    }

		Geolocation.watchPosition(info => {
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
    });
  }

  getProfile = async() => {
    const profileData = this.props.state.auth.profile;
    if (profileData === null) {
      this.props.loadOff();
      this.props.navigation.navigate('Sign');
      return;
    };

    this.props.loadOn();
    let myProfile = await fetchApi.fetchNow(
      'get',
      {
        'url': 'profile',
        'fetchId': profileData.id,
        'data': '',
        'token': profileData.api_token,
        'props': this.props,
        'info': uiData.notifyPerms
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
        'token': profileData.api_token,
        'props': this.props,
        'info': uiData.notifyPerms
      }
    );
    this.props.loadOff();

    if (services.status === 0) {
      const info = {
        msg: 'You need to grant permissions to use AutoMech',
        click: 'GO TO SETTINGS'
      }
      //requestPermissions(this.props, info);
      return;
    }

    if (services.status === 200) {
      this.props.servicesGet(services.data);
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
              page='AutoMech'
              nav={this.props.navigation} />
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
