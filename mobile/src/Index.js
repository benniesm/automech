import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols
} from 'react-native-table-component';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
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

class Container extends Component {
	constructor(props) {
		super(props);
	}

  componentDidMount() {
    this.getProfile();
    this.getServiceTypes();
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
        'token': profileData.apiToken
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
        'token': profileData.apiToken
      }
    );
    this.props.loadOff();

    if (services.status === 200) {
      this.props.servicesGet(services.data);
      //console.log(this.props.state.page.list);
    }
  }

  goToSignIn = () => {
    this.props.navigation.navigate('Sign');
  }

  render() {
    const screens = [
      ['Auto Mech', 'Auto Parts', 'Auto Scan'],
      ['Electronics', 'Body Works', 'Paint'],
      ['Tyres', 'Fuel Station', 'Towing Van'],
    ];

    return this.props.state.load.loading === true ?
      <View style={styles.loading}><Loading /></View>
      :
      this.props.state.auth.authenticated === true ?
        (
          <>
            <Header
              drawer={this.props.navigation.openDrawer}
              page='Welcome!' />
            <View style={Object.assign({}, styles.window, styles.bg2)}>
              <Table style={styles.tableIndex}>
                <Rows data={screens} />
              </Table>
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
