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
import fetchRetry from '../../../functions/FetchRetry';
import uiData from '../../../assets/data/UiData';
import styles from '../../../../Styles';
import Header from '../../../components/Header';
import Loading from '../../../components/Loading';

class UpdateVendorProfileContainer extends Component {
  constructor(props) {
    super(props);

    const view = this.props.state.auth.profile.vendor;
    this.state = {
      description: view.description,
      cars: view.cars,
      serviceId: view.service.id
    }
    //console.log(this.props.state.page.models);
  }

  sendUpdate = async() => {
    const profileData = this.props.state.auth.profile;

    let updateRequest = await fetchApi.fetchNow(
			'put',
			{
				'url': 'vendors',
        'fetchId': profileData.vendor.id,
				'body': {
					description: this.state.description,
          service_id: this.state.serviceId,
          cars: this.state.cars,
          api_token: profileData.api_token
				},
        'props': this.props,
        'info': uiData.notifyPerms
			}
		);

    fetchRetry(updateRequest, this.sendUpdate);

		if (updateRequest.status === 200) {
      const updatedData = updateRequest.data;
      let newAuthData = profileData;
      newAuthData.vendor.description = updatedData.description;
      newAuthData.vendor.model.car_model = updatedData.model.car_model;
      newAuthData.vendor.service.service_type =
        updatedData.service.service_type;
      this.props.saveProfile(newAuthData);

			this.props.navigation.navigate('Vendor');
		} else {
      Alert.alert('Request Error, Please try again');
    }
  }

  render() {
    const list = this.props.state.page.list
    list.sort((a, b) => (a.service_type > b.service_type) ? 1 : -1);
    const serviceList = list.map(list => {
      return (
        <Picker.Item
            key={list.id}
            label={list.service_type}
            value={list.id} />
      )
    });

    const modelList = this.props.state.page.models.map(model => {
      return (
        <Picker.Item
          key={model.id}
          label={model.car_model}
          value={model.id} />
      )
    });

    return this.props.state.load.loading === true ?
      <View style={styles.loading}><Loading /></View>
      :
      (
        <>
          <Header
            drawer={this.props.navigation.openDrawer}
            page='Edit My Details'
            nav={this.props.navigation} />
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
            <View style={{
              height: 50,
              width: '80%',
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 7,
              margin: 2
            }}>
              <Picker
                selectedValue={this.state.cars}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({cars: itemValue})
                }>
                {modelList}
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
