import React, { Component } from 'react';
import { Alert, Image, TouchableHighlight, Text, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps
} from '../../../store/StateDispatch';
import fetchApi from '../../../api/Fetch';
import styles from '../../../../Styles';
import Header from '../../../components/Header';

class UploadVendorImageContainer extends Component {
  constructor(props) {
    super(props);
    const vendorProfile = this.props.state.auth.profile.vendor;
    this.state = {
      image: vendorProfile.image === null ?
        require('../../../assets/images/avatar-icon.jpg')
        :
        vendorProfile.image,
      uploadImage: ''
    }
  }

  getPhoto = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log(response.uri);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        const uploadSource = response.uri;

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({ image: source, uploadImage: uploadSource });
      }
    });
  }

  uploadImage = async() => {
    const profileData = this.props.state.auth.profile;

    const formData = new FormData();
    formData.append('api_token', profileData.api_token);
    formData.append('image', this.state.uploadImage);
    formData.append('oldImage', this.props.state.auth.profile.vendor.image);

    this.props.loadOn();
    let uploadRequest = await fetchApi.fetchNow(
			'post',
			{
				'url': 'vendors/image',
				'fetchId': profileData.vendor.id,
        'content': 'multipart/form-data',
				'body': formData
			}
		);
    this.props.loadOff();

		if (uploadRequest.status === 200) {
      const updatedData = uploadRequest.data;
      profileData['vendor'] = updatedData;
      this.props.saveProfile(profileData);

			this.props.navigation.navigate('Vendor');
		} else {
      Alert.alert('Request Error, Please try again');
      console.log({ 's': uploadRequest.status, 'd': uploadRequest.data});
    }
  }

  render() {
    return (
      <>
        <Header
          drawer={this.props.navigation.openDrawer}
          page='Change Image' />
        <View style={styles.mainContent}>
          <Image
            style={{width: 170, height: 170}}
            source={this.state.image}
           />
          <TouchableHighlight
            underlayColor='#cbcbcb'
            style={Object.assign({}, styles.touchable, styles.backGray)}
            onPress={() => this.getPhoto()}>
            <Text style={styles.buttonSmall}>Select photo</Text>
          </TouchableHighlight>
         <TouchableHighlight
           underlayColor='#cbcbcb'
           style={Object.assign({}, styles.touchable, styles.backOrange)}
           onPress={() => this.uploadImage()}>
           <Text style={styles.buttonSmall}>UPLOAD NEW PHOTO</Text>
         </TouchableHighlight>
        </View>
      </>
    );
  }
}

const UploadVendorImage =
  connect(mapStateToProps, mapDispatchToProps)(UploadVendorImageContainer);

export default UploadVendorImage;
