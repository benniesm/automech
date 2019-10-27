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
import multiGet from './store/AsyncStorage/GetItems';
import { connect } from 'react-redux';
import { loadingOff, loadingOn } from './store/Redux/actions/LoadingAction';
import { pageTitle } from './store/Redux/actions/PageAction';
import { loginUser } from './store/Redux/actions/AuthAction';
import fetchApi from './api/Fetch';
import styles from '../Styles.js';
import Header from './components/Header';
import Loading from './components/Loading';
import SignInButton from './components/SignInButton';

class Container extends Component {
	constructor(props) {
		super(props);
	}

  componentDidMount() {
    this.props.pageName('Welcome!');
    this.getProfile();
  }

  getProfile = async() => {
    this.props.loadOn();

    const authData = ['id', 'mobile_phone', 'name', 'email', 'api_token'];
    const getData = await multiGet(authData);
    //console.log(getData);
    let userId = getData[0][1];
    let token = getData[4][1];

    let myProfile = await fetchApi.fetchNow(
      'get',
      {'url': 'profile', 'fetchId': userId, 'data': ''}
    );

    this.props.loadOff();

    if (myProfile.data.hasOwnProperty('api_token') && myProfile.data.api_token === token) {
      this.props.authenticateUser();
    } else {
      this.props.navigation.navigate('Sign');
    }
    //console.log(myProfile.data);
    //console.log({'profileToken': myProfile.data.api_token});
    //console.log({'token': token});
    //console.log(this.props.state.auth.authenticated);
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

    return this.props.state.auth.authenticated === true ?
      this.props.state.load.loading === true ?
        <View style={styles.loading}><Loading /></View>
      :
        (
          <>
            <Header
              drawer={this.props.navigation.openDrawer}
              page={this.props.state.page} />
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

const mapStateToProps = (state) => {
  return { state: state }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUser: () => {
      dispatch(loginUser())
    },
    loadOn: () => {
      dispatch(loadingOn())
    },
    loadOff: () => {
      dispatch(loadingOff())
    },
    pageName: (name) => {
      dispatch(pageTitle(name))
    }
  }
}

const Index = connect(mapStateToProps, mapDispatchToProps)(Container);

export default Index;
