import React, { Component } from 'react';
import { Alert, Image, TouchableHighlight, Text, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps
} from '../../../store/StateDispatch';
import fetchApi from '../../../api/Fetch';
import fetchRetry from '../../../functions/FetchRetry';
import { imagesUrlProfiles } from '../../../api/Api';
import uiData from '../../../assets/data/UiData';
import styles from '../../../../Styles';
import Header from '../../../components/Header';
import Loading from '../../../components/Loading';

class UploadVendorImageContainer extends Component {
  constructor(props) {
    super(props);
    const vendorProfile = this.props.state.auth.profile.vendor;
    this.state = {
      image: vendorProfile.image === null ?
        require('../../../assets/images/avatar-icon.jpg')
        :
        { uri: imagesUrlProfiles + vendorProfile.image }
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
      if (response.didCancel) {
        //console.log('User cancelled image picker');
      } else if (response.error) {
        //console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        //console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {
          uri: response.uri,
          name: response.fileName,
          type: response.type,
          size: response.fileSize
        };

        this.setState({ image: source });
      }
    });
  }

  uploadImage = async() => {
    const profileData = this.props.state.auth.profile;

    if (this.state.image && this.state.image.size > 1) {
      const formData = new FormData();
      formData.append('api_token', profileData.api_token);
      formData.append('image', this.state.image);
      formData.append('oldImage', this.props.state.auth.profile.vendor.image);

      let uploadRequest = await fetchApi.fetchNow(
  			'post',
  			{
  				'url': 'vendors/image',
  				'fetchId': profileData.vendor.id,
          'content': 'multipart/form-data',
  				'body': formData,
          'props': this.props,
          'info': uiData.notifyPerms
  			}
  		);

      fetchRetry(uploadRequest, this.uploadImage);

  		if (uploadRequest.status === 200) {
        const updatedData = uploadRequest.data;
        profileData['vendor'] = updatedData;
        this.props.saveProfile(profileData);

  			this.props.navigation.navigate('Vendor');
  		} else {
        Alert.alert('Unsuccesful, Please try again');
      }

    } else {
      Alert.alert('Invalid Image File');
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
            page='Edit Image'
            nav={this.props.navigation} />
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
