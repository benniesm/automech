import React, { Component } from 'react';
import { Text, TextInput, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps
} from '../../../store/StateDispatch';
import fetchApi from '../../../api/Fetch';
import styles from '../../../../Styles';
import Header from '../../../components/Header';

class UpdateBasicProfileContainer extends Component {
  constructor(props) {
    super(props);
    const view = this.props.state.auth.profile;
    this.state = {
      email: view.email,
      errorMessage: '',
      mobile: view.mobilePhone,
      name: view.name,
    }
  }

  sendUpdate = async() => {
    const profileData = this.props.state.auth.profile;

    this.props.loadOn();
    let updateRequest = await fetchApi.fetchNow(
			'put',
			{
				'url': 'profile',
        'fetchId': profileData.id,
				'body': {
					mobile_phone: this.state.mobile,
					name : this.state.name,
					email: this.state.email,
          api_token: profileData.apiToken
				}
			}
		);
    this.props.loadOff();

		if (updateRequest.status === 200) {
      const updatedData = updateRequest.data[0];
      const newAuthData = {
        'id': updatedData.id.toString(),
        'mobilePhone': updatedData.mobile_phone,
        'name': updatedData.name,
        'email': updatedData.email,
        'apiToken': updatedData.api_token,
        'emailVerified': updatedData.email_verified_at,
        'createdAt': updatedData.created_at,
        'vendor': updatedData.vendor
      };
      this.props.saveProfile(newAuthData);
      //console.log(updateRequest.data);

				this.props.navigation.navigate('Profile');
		} else {
      this.setState({ errorMessage: 'Request Error, Please try again' });
    }
  }

  render() {
    return (
      <>
        <Header
          drawer={this.props.navigation.openDrawer}
          page='Update Information' />
        <View style={styles.mainContent}>
          <Text style={Object.assign(
            {},
            styles.textSizeMedium,
            styles.textCenter,
            styles.textPadded
            )}>
              Basic Information
          </Text>
          <Text
            style={Object.assign(
              {},
              styles.input,
              styles.inputText3,
              styles.backGray
            )}>
              {this.state.mobile}
          </Text>
          <TextInput
            name='name'
            onChangeText={(text) => this.setState({name: text})}
            style={Object.assign({}, styles.input, styles.inputText3)}
            placeholder='Your Name'
            value={this.state.name}>
          </TextInput>
          <TextInput
            name='email'
            onChangeText={(text) => this.setState({email: text})}
            style={Object.assign({}, styles.input, styles.inputText3)}
            placeholder='Your Email'
            value={this.state.email}>
          </TextInput>
          <Text style={Object.assign(
            {},
            styles.textSizeSmall,
            styles.textColorRed
            )}>
              {this.state.errorMessage}
          </Text>
          <TouchableHighlight
            underlayColor='#cbcbcb'
            style={Object.assign({}, styles.touchable, styles.backOrange)}
            onPress={() => this.sendUpdate()}>
            <Text style={styles.buttonSmall}>Submit</Text>
          </TouchableHighlight>
        </View>
      </>
    )
  }
}

const UpdateBasicProfile =
  connect(mapStateToProps, mapDispatchToProps)(UpdateBasicProfileContainer);

export default UpdateBasicProfile;
