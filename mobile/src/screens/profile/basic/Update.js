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
      mobile: view.mobile_phone,
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
          api_token: profileData.api_token
				}
			}
		);
    this.props.loadOff();

		if (updateRequest.status === 200) {
      const updatedData = updateRequest.data;
      this.props.saveProfile(updatedData);
      //console.log(updateRequest.data);

			this.props.navigation.navigate('Profile');
		} else {
      Alert.alert('Request Error, Please try again');
    }
  }

  render() {
    return (
      <>
        <Header
          drawer={this.props.navigation.openDrawer}
          page='Change Information' />
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
            autoCapitalize='words'
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
