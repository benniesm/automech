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

class UpdateVendorProfileContainer extends Component {
  constructor(props) {
    super(props);

    const view = this.props.state.auth.profile.vendor;
    this.state = {
      description: view.description
    }
  }

  sendUpdate = async() => {
    const profileData = this.props.state.auth.profile;

    this.props.loadOn();
    let updateRequest = await fetchApi.fetchNow(
			'put',
			{
				'url': 'vendors',
        'fetchId': profileData.vendor.id,
				'body': {
					description: this.state.description,
          api_token: profileData.apiToken
				}
			}
		);
    this.props.loadOff();

		if (updateRequest.status === 200) {
      const updatedData = updateRequest.data;
      let newAuthData = profileData;
      newAuthData.vendor.description = updatedData.description;
      this.props.saveProfile(newAuthData);
      //console.log(this.props.state.auth.profile);

				this.props.navigation.navigate('Vendor');
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
          <TextInput
            multiline={true}
            name='description'
            onChangeText={(text) => this.setState({description: text})}
            style={Object.assign({}, styles.input, styles.inputTextArea)}
            placeholder='Enter personal text'
            value={this.state.description}>
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

const UpdateVendorProfile =
  connect(mapStateToProps, mapDispatchToProps)(UpdateVendorProfileContainer);

export default UpdateVendorProfile;
