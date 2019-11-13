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

  componentDidMount() {
    //this.getServiceTypes();
  }

  setVendorLocation = async() => {
    const profileData = this.props.state.auth.profile;
    const vendorCoords = this.props.state.map.coords;

    if (this.state.serviceValue === '0') {
      Alert.alert('Please select your service');
      return;
    }

    this.props.loadOn();
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
          api_token: profileData.api_token
				}
			}
		);
    this.props.loadOff();

		if (createRequest.status === 201) {
      const createdData = createRequest.data;
      profileData['vendor'] = createdData;
      //console.log({'cd':createdData});
      //console.log({'old':profileData});
      this.props.saveProfile(profileData);
      //console.log({'new':this.props.state.auth.profile});
      this.props.vendOn();

			this.props.navigation.navigate('Vendor');
		} else {
      //Alert.alert(createRequest.data);
      Alert.alert('Request Error, Please try again');
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
            <ShowMapView />
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
