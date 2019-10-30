import React, { Component } from 'react';
import { Text, TextInput, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps
} from '../../../store/Redux/StateDispatch';
import multiGet from '../../../store/AsyncStorage/GetItems';
import multiSet from '../../../store/AsyncStorage/SetItems';
import fetchApi from '../../../api/Fetch';
import styles from '../../../../Styles.js';
import Header from '../../../components/Header';

class UpdateBasicProfileContainer extends Component {
  constructor(props) {
    super(props);
    const view = this.props.state.page;
    this.state = {
      email: view.email,
      errorMessage: '',
      mobile: view.mobile_phone,
      name: view.name,
    }
  }

  sendUpdate = async() => {
    this.props.loadOn();

    const authData = ['id'];
    const getData = await multiGet(authData);

    let userId = getData[0][1];

    let updateRequest = await fetchApi.fetchNow(
			'put',
			{
				'url': 'profile',
        'fetchId': userId,
				'body': {
					mobile_phone: this.state.mobile,
					name : this.state.name,
					email: this.state.email
				}
			}
		);
		if (updateRequest.status === 200) {
				const authData = [
					['name', updateRequest.data.name],
					['email', updateRequest.data.email]
				];
				const saveData = multiSet(authData);
        this.props.viewInfo(updateRequest.data);

				this.props.loadOff();
				this.props.navigation.navigate('Profile');
		} else {
      this.setState({ errorMessage: 'Request Error, Please try again' });
      this.props.loadOff();
    }
  }

  render() {
    return (
      <>
        <Header
          drawer={this.props.navigation.openDrawer}
          page='Update User Information' />
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
