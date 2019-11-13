import React, { Component } from 'react';
import { Image, TouchableHighlight, Text, View } from 'react-native';
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
  constructor() {
    super();
    this.state = {
      image: require('../../../assets/images/avatar-icon.jpg') //this.props.state.auth.profile.image
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
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({ image: source });
      }
    });
  }

  render() {
    return (
      <>
        <Header
          drawer={this.props.navigation.openDrawer}
          page='New Vendor Profile' />
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
           onPress={() => this.updateImage()}>
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
