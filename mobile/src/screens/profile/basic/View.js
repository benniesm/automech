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
} from '../../../store/StateDispatch';
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

  goToSignIn = () => {
    this.props.navigation.navigate('Sign');
  }

  showViewUpdate = () => {
    this.props.navigation.navigate('UpdateBasicProfile');
  }

  signOut = () => {
    const authKeys = [
      'id',
      'mobile_phone',
      'name',
      'email',
      'api_token'
    ]
    //let removeAuth = multiRemove(authKeys);
    this.props.viewInfo({});
    this.props.vendOff();
    //this.props.vendorInfo({});
    this.props.deAuthenticateUser();
  }

  signOutConfirm = () => {
    Alert.alert(
      'YOU ARE ABOUT TO SIGN OUT!',
      'You will no longer be able to connect until sign in again',
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
    const profileData = this.props.state.auth.profile;
    const Profile = () => {
      return (
        <View>
          <View style={Object.assign(
            {},
            styles.backRedPale,
            styles.displayData
            )}>
            <Text style={styles.textSizeMediumNormal}>
                Mobile
            </Text>
            <Text style={styles.textSizeSmallNormal}>
                {profileData.mobile_phone}
            </Text>
          </View>
            <View style={Object.assign(
              {},
              styles.backRedPale,
              styles.displayData
              )}>
              <Text style={styles.textSizeMediumNormal}>
                  Name
              </Text>
              <Text style={styles.textSizeSmallNormal}>
                  {profileData.name}
              </Text>
            </View>
              <View style={Object.assign(
                {},
                styles.backRedPale,
                styles.displayData
                )}>
                <Text style={styles.textSizeMediumNormal}>
                    Email
                </Text>
                <Text style={styles.textSizeSmallNormal}>
                    {profileData.email}
                </Text>
              </View>
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
              page='My Profile'
              nav={this.props.navigation} />
            <View style={Object.assign({}, styles.window)}>
              <ScrollView style={Object.assign(
                {},
                styles.view,
                styles.backRedPale
                )}>
                <Profile />
                <View style={Object.assign(
                  {},
                  styles.backRedPale,
                  styles.displayData,
                  { borderBottomWidth: 2 }
                  )}>
                    <TouchableHighlight
                      underlayColor='#cbcbcb'
                      style={Object.assign(
                        {},
                        styles.touchable,
                        styles.backOrange
                      )}
                      onPress={() => this.showViewUpdate()}>
                      <Text style={styles.buttonSmall}>Edit Profile</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      underlayColor='#cbcbcb'
                      style={Object.assign(
                        {},
                        styles.touchable,
                        styles.backRed
                      )}
                      onPress={() => this.signOutConfirm()}>
                      <Text style={styles.buttonSmall}>
                        Sign Out of AutoMech
                      </Text>
                    </TouchableHighlight>
                </View>
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

const ViewBasicProfile =
  connect(mapStateToProps, mapDispatchToProps)(ViewBasicProfileContainer);

export default ViewBasicProfile;
