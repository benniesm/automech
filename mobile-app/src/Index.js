import React, { Component } from 'react';
import {
  Alert,
  PermissionsAndroid,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps
} from './store/StateDispatch';
import fetchApi from './api/Fetch';
import fetchRetry from './functions/FetchRetry';
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
    this.getCarModels();
    this.getServiceTypes();
      this.getProfile();
    //console.log(this.props.state.auth.profile);
    //console.log(this.props.state.auth.profile.vendor);
  }

  getProfile = async() => {
    const profileData = this.props.state.auth.profile;
    if (profileData === null) {
      this.props.navigation.navigate('Sign');
      return;
    };

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

    fetchRetry(myProfile, this.getProfile);
    console.log('myProfile.data');

    if (myProfile.status !== 200) {
      this.props.navigation.navigate('Sign');
    }
  }

  getCarModels = async() => {
    const profileData = this.props.state.auth.profile;

    if (profileData === null) {
      this.props.navigation.navigate('Sign');
      return;
    }

    let models = await fetchApi.fetchNow(
      'get',
      {
        'url': 'car-models',
        'data': '',
        'token': profileData.api_token,
        'props': this.props,
        'info': uiData.notifyPerms
      }
    );

    fetchRetry(models, this.getCarModels);

    if (models.status === 200) {
      this.props.modelsGet(models.data);
      //console.log(this.props.state.page.models);
    }
  }

  getServiceTypes = async() => {
    const profileData = this.props.state.auth.profile;

    if (profileData === null) {
      this.props.navigation.navigate('Sign');
      return;
    }

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

    fetchRetry(services, this.getServiceTypes);

    if (services.status === 200) {
      this.props.servicesGet(services.data);
      //console.log(this.props.state.page.list);
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
