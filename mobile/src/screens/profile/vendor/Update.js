import React, { Component } from 'react';
import {
  Alert,
  Picker,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
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
      description: view.description,
      serviceId: view.service.id
    }
  }

  componentDidMount() {
  //  console.log(this.props.state.auth.profile.vendor.service.id);
  }

  sendUpdate = async() => {
    const profileData = this.props.state.auth.profile;
    //console.log(this.state.serviceId)

    this.props.loadOn();
    let updateRequest = await fetchApi.fetchNow(
			'put',
			{
				'url': 'vendors',
        'fetchId': profileData.vendor.id,
				'body': {
					description: this.state.description,
          service_id: this.state.serviceId,
          api_token: profileData.api_token
				}
			}
		);
    this.props.loadOff();

		if (updateRequest.status === 200) {
      const updatedData = updateRequest.data;
      let newAuthData = profileData;
      newAuthData.vendor.description = updatedData.description;
      newAuthData.vendor.service.service_type =
        updatedData.service.service_type;
      this.props.saveProfile(newAuthData);
      //console.log(this.props.state.auth.profile);

			this.props.navigation.navigate('Vendor');
		} else {
      Alert.alert('Request Error, Please try again');
    }
  }

  render() {
    const serviceList = this.props.state.page.list.map(list => {
      return list.id === this.state.service ?
        null
        :
        <Picker.Item
          key={list.id}
          label={list.service_type}
          value={list.id} />
    });

    return (
      <>
        <Header
          drawer={this.props.navigation.openDrawer}
          page='Update Information' />
        <View style={styles.mainContent}>
          <View style={{
            height: 50,
            width: '80%',
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 7,
            margin: 2
          }}>
          <Picker
            selectedValue={this.state.serviceId}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({serviceId: itemValue})
            }>
            {serviceList}
          </Picker>
          </View>
          <TextInput
            multiline={true}
            name='description'
            onChangeText={(text) => this.setState({description: text})}
            style={Object.assign({}, styles.input, styles.inputTextArea)}
            placeholder='Enter personal text'
            value={this.state.description}>
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

const UpdateVendorProfile =
  connect(mapStateToProps, mapDispatchToProps)(UpdateVendorProfileContainer);

export default UpdateVendorProfile;
