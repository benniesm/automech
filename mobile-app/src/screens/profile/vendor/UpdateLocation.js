import React, { Component } from 'react';
import {
  Alert,
  Image,
  Picker,
  Text,
  TextInput,
  TouchableHighlight,
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
import Loading from '../../../components/Loading';
import ShowMapView from '../../../components/MapView';

class UpdateVendorLocationContainer extends Component {
  updateLocation = async() => {
    const profileData = this.props.state.auth.profile;
    const vendorCoords = this.props.state.map.markMe.latlng;

    let updateRequest = await fetchApi.fetchNow(
			'put',
			{
				'url': 'vendors',
				'fetchId': profileData.vendor.id,
				'body': {
					latitude : vendorCoords.latitude.toString(),
					longitude: vendorCoords.longitude.toString(),
          api_token: profileData.api_token
				},
        'props': this.props,
        'info': uiData.notifyPerms
			}
		);

    fetchRetry(updateRequest, this.updateLocation);

		if (updateRequest.status === 200) {
      const updatedData = updateRequest.data;
      profileData['vendor'] = updatedData;
      this.props.saveProfile(profileData);

			this.props.navigation.navigate('Vendor');
		} else {
      Alert.alert('Request Error, Please try again');
    }
  }

  render() {
    return this.props.state.load.loading === true ?
      <View style={styles.loading}><Loading /></View>
      :
      (
        <>
          <Header
            drawer={this.props.navigation.openDrawer}
            page='Edit My Location'
            nav={this.props.navigation} />
          <View style={styles.mainContent}>
            <View style={styles.mapView2}>
              <ShowMapView parent='me' />
            </View>
              <View>
                <TouchableHighlight
    							style={Object.assign(
    								{},
    								styles.touchable2,
    								styles.backOrange,
                    { minWidth: '100%' }
    								)}
    							onPress={() => this.updateLocation()}>
    								<Text style={styles.buttonSmall}>UPDATE LOCATION </Text>
    						</TouchableHighlight>
              </View>
            </View>
        </>
      )
  }
}

const UpdateVendorLocation =
  connect(mapStateToProps, mapDispatchToProps)(UpdateVendorLocationContainer);

export default UpdateVendorLocation;
