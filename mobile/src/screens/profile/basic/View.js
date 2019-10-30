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
import {
  mapStateToProps,
  mapDispatchToProps
} from '../../../store/Redux/StateDispatch';
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
    this.getProfile();
  }

  getProfile = async() => {
    this.props.loadOn();

    const authData = ['id', 'mobile_phone', 'name', 'email', 'api_token'];
    const getData = await multiGet(authData);

    let userId = getData[0][1];
    console.log(getData);

    let myProfile = await fetchApi.fetchNow(
      'get',
      {'url': 'profile', 'fetchId': userId, 'data': ''}
    );

    this.props.viewInfo(myProfile.data);

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
    this.props.deAuthenticateUser();
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
            styles.textCenter,
            styles.textPadded
            )}>
              MOBILE PHONE:
          </Text>
          <Text style={Object.assign(
            {},
            styles.textSizeMediumNormal,
            styles.textCenter,
            styles.textPadded,
            styles.backRedPale
            )}>
              {this.props.state.page.mobile_phone}
          </Text>
          <Text style={Object.assign(
            {},
            styles.textSizeMedium,
            styles.textCenter,
            styles.textPadded
            )}>
              NAME:
          </Text>
          <Text style={Object.assign(
            {},
            styles.textSizeMediumNormal,
            styles.textCenter,
            styles.textPadded,
            styles.backRedPale
            )}>
              {this.props.state.page.name}
          </Text>
          <Text style={Object.assign(
            {},
            styles.textSizeMedium,
            styles.textCenter,
            styles.textPadded
            )}>
              EMAIL:
          </Text>
          <Text style={Object.assign(
            {},
            styles.textSizeMediumNormal,
            styles.textCenter,
            styles.textPadded,
            styles.backRedPale
            )}>
              {this.props.state.page.email}
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
              page='User Information' />
            <View style={Object.assign({}, styles.window, )}>
              <ScrollView style={styles.view}>
                {profile()}
                <TouchableHighlight
                  underlayColor='#cbcbcb'
                  style={Object.assign({}, styles.touchable, styles.backOrange)}
                  onPress={() => this.showViewUpdate()}>
                  <Text style={styles.buttonSmall}>Press Here to Update Information</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor='#cbcbcb'
                  style={Object.assign({}, styles.touchable, styles.backRed)}
                  onPress={() => this.signOutConfirm()}>
                  <Text style={styles.buttonSmall}>Sign Out</Text>
                </TouchableHighlight>
              </ScrollView>
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

const ViewBasicProfile = connect(mapStateToProps, mapDispatchToProps)(ViewBasicProfileContainer);

export default ViewBasicProfile;
