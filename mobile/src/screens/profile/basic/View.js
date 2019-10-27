import React, { Component } from 'react';
import {
  Alert,
  Button,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { logoutUser } from '../../../store/Redux/actions/AuthAction';
import { loadingOff, loadingOn } from '../../../store/Redux/actions/LoadingAction';
import { pageTitle } from '../../../store/Redux/actions/PageAction';
import multiGet from '../../../store/AsyncStorage/GetItems';
import multiRemove from '../../../store/AsyncStorage/RemoveItems';
import fetchApi from '../../../api/Fetch';
import styles from '../../../../Styles';
import Header from '../../../components/Header';
import Loading from '../../../components/Loading';
import SignInButton from '../../../components/SignInButton';

class ViewBasicProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: {}
    }
  }

  componentDidMount() {
    this.props.pageName('My Profile');
    this.getProfile();
  }

  getProfile = async() => {
    this.props.loadOn();

    const authData = ['id', 'mobile_phone', 'name', 'email', 'api_token'];
    const getData = await multiGet(authData);

    let userId = getData[0][1];
    let token = getData[4][1];

    let myProfile = await fetchApi.fetchNow(
      'get',
      {'url': 'profile', 'fetchId': userId, 'data': ''}
    );
    this.setState({
      profileData: myProfile.data
    });

    this.props.loadOff();
  }

  goToSignIn = () => {
    this.props.navigation.navigate('Sign');
  }

  showViewUpdate = () => {
    this.props.navigation.navigate('update');
  }

  signOut = () => {
    const authKeys = [
      'id',
      'mobile_phone',
      'name',
      'email',
      'api_token'
    ]
    let removeAuth = multiRemove(authKeys);
    this.props.authenticateUser();
  }

  signOutConfirm = () => {
    Alert.alert(
      'YOU ARE ABOUT TO SIGN OUT!',
      'You wil no longer be able to connect until sign in again',
      [
        {
          text: 'CANCEL',
        },
        {text: 'OK', onPress: () => this.signOut()},
      ],
      {cancelable: false},
    );
  }

  render() {
    const profile = () => {
      return (
        <View>
          <Text style={Object.assign(
            {},
            styles.textSizeMedium,
            styles.textCenter
            )}>
              MOBILE PHONE:
          </Text>
          <Text style={Object.assign(
            {},
            styles.textSizeMedium,
            styles.textCenter
            )}>
              {this.state.profileData.mobile_phone}
          </Text>
          <Text style={Object.assign(
            {},
            styles.textSizeMedium,
            styles.textCenter
            )}>
              NAME:
          </Text>
          <Text style={Object.assign(
            {},
            styles.textSizeMedium,
            styles.textCenter
            )}>
              {this.state.profileData.name}
          </Text>
          <Text style={Object.assign(
            {},
            styles.textSizeMedium,
            styles.textCenter
            )}>
              EMAIL:
          </Text>
          <Text style={Object.assign(
            {},
            styles.textSizeMedium,
            styles.textCenter
            )}>
              {this.state.profileData.email}
          </Text>
        </View>
      )
    }

    return this.props.state.auth.authenticated === true ?
      this.props.state.load.loading === true ?
        <View style={styles.loading}><Loading /></View>
      :
        (
          <>
            <Header
              drawer={this.props.navigation.openDrawer}
              page={this.props.state.page} />
            <View style={Object.assign({}, styles.window, )}>
              <ScrollView style={styles.view}>
                {profile()}
              </ScrollView>
              <TouchableHighlight
                underlayColor='#cbcbcb'
                style={styles.touchable}
                onPress={() => this.showViewUpdate()}>
                <Text style={styles.buttonSmall}>Update Information</Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor='#cbcbcb'
                style={styles.touchable}
                onPress={() => this.signOutConfirm()}>
                <Text style={styles.buttonSmall}>Sign Out</Text>
              </TouchableHighlight>
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

const ViewBasicProfile = connect(mapStateToProps, mapDispatchToProps)(ViewBasicProfileContainer);

export default ViewBasicProfile;
