import React, { Component } from 'react';
import {
  Alert,
  Image,
  Picker,
  TextInput,
  TouchableHighlight,
  Text,
  View
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
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
import ShowMapView from '../../../components/MapView';

class CreateVendorProfileContainer extends Component {
  constructor() {
    super();;
    this.state = {
      serviceValue: ''
    }
  }

  setVendorLocation = async() => {
    const profileData = this.props.state.auth.profile;
    const vendorCoords = this.props.state.map.coords;

    if (this.state.serviceValue === '0') {
      Alert.alert('Please select your service');
      return;
    }

    let createRequest = await fetchApi.fetchNow(
			'post',
			{
				'url': 'vendors',
				'body': {
					user_id: profileData.id,
          service_id: this.state.serviceValue,
					latitude : vendorCoords.latitude.toString(),
					longitude: vendorCoords.longitude.toString(),
          certified: 'false',
          cars: this.props.state.page.modelOne,
          api_token: profileData.api_token
				},
        'props': this.props,
        'info': uiData.notifyPerms
			}
		);

    fetchRetry(createRequest, this.setVendorLocation);

		if (createRequest.status === 201) {
      const createdData = createRequest.data;
      profileData['vendor'] = createdData;
      this.props.saveProfile(profileData);
      this.props.vendOn();

			this.props.navigation.navigate('Vendor');
		} else {
      Alert.alert('Request Error, Please try again');
      console.log(createRequest);
    }
  }

  render() {
    const serviceList = this.props.state.page.list.map(list => {
      return <Picker.Item
        key={list.id}
        label={list.service_type}
        value={list.id} />
    });

    return (
      <>
        <Header
          drawer={this.props.navigation.openDrawer}
          page='New Vendor Profile' />
        <View style={styles.mainContent}>
          <View style={styles.mapView}>
            <ShowMapView parent='me' />
          </View>
          <View style={Object.assign(
            {},
            styles.mapForm
            )}>
            <View style={{
              height: 50,
              width: '99%',
              borderColor: 'orange',
              borderWidth: 1,
              borderRadius: 7,
              margin: 2
            }}>
              <Picker
                selectedValue={this.state.serviceValue}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({serviceValue: itemValue})
                }>
                <Picker.Item label="SELECT THE SERVICE YOU RENDER" value="0" />
                {serviceList}
              </Picker>
            </View>
            <View>
              <TouchableHighlight
  							style={Object.assign(
  								{},
  								styles.touchable2,
  								styles.backOrange,
                  { minWidth: '100%' }
  								)}
  							onPress={() => this.setVendorLocation()}>
  								<Text style={styles.buttonSmall}>FINISH >> </Text>
  						</TouchableHighlight>
            </View>
          </View>
        </View>
      </>
    );
  }
}

const CreateVendorProfile =
  connect(mapStateToProps, mapDispatchToProps)(CreateVendorProfileContainer);

export default CreateVendorProfile;
