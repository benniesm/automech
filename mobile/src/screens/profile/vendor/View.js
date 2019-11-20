import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps
} from '../../../store/StateDispatch';
import fetchApi from '../../../api/Fetch';
import { imagesUrlProfiles } from '../../../api/Api';
import styles from '../../../../Styles';
import Header from '../../../components/Header';
import Loading from '../../../components/Loading';
import SignInButton from '../../../components/SignInButton';

class ViewVendorProfileContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //this.getVendor();
    //console.log(this.props.state.auth.profile);
  }

  editImage = () => {
    this.props.navigation.navigate('UploadVendorImage');
  }

  editLocation = () => {
    console.log(this.props.state.map.markMe);
    this.props.navigation.navigate('UpdateVendorLocation');
  }

  editText = () => {
    this.props.navigation.navigate('UpdateVendorProfile');
  }

  goToCreate = () => {
    this.props.navigation.navigate('CreateVendorProfile');
  }

  goToSignIn = () => {
    this.props.navigation.navigate('Sign');
  }

  render() {
    const vendorData = this.props.state.auth.profile.vendor;
    const Vendor = () => {
      return(
        <View>
          <View style={Object.assign(
            {},
            styles.backRedPale,
            styles.displayDataIndividual
            )}>
              <View style={{ width: '85%' }}>
                <Image
                  style={{width: 150, height: 150, borderRadius: 100}}
                  source={vendorData.image === null ?
                    require('../../../assets/images/avatar-icon.jpg')
                    :
                    { uri: imagesUrlProfiles + vendorData.image }}
                 />
               </View>
               <View style={styles.editIcon}>
                   <Icon
                   name='edit'
                   size={22}
                   onPress={() => this.editImage()} />
               </View>
          </View>
          <View style={Object.assign(
            {},
            styles.backRedPale,
            styles.displayDataJoin
            )}>
            <View style={{ width: '85%' }}>
              <Text style={styles.textSizeMediumNormal}>
                  Personal Text
              </Text>
              <Text style={styles.textSizeSmallNormal}>
                  {
                    vendorData.description === null ?
                      <Text style={{'fontStyle': 'italic'}}>
                        "Edit vendor profile to add personal text"
                      </Text>
                      :
                      <Text>{vendorData.description}</Text>
                  }
              </Text>
            </View>
            <View style={styles.editIcon}>
              <Icon
              name='edit'
              size={22}
              onPress={() => this.editText()} />
            </View>
          </View>
          <View style={Object.assign(
            {},
            styles.backRedPale,
            styles.displayDataJoin
            )}>
            <View style={{ width: '85%' }}>
            <Text style={styles.textSizeMediumNormal}>
                Service
            </Text>
            <Text style={styles.textSizeSmallNormal}>
                {vendorData.service.service_type}
            </Text>
            </View>
          </View>
          <View style={Object.assign(
            {},
            styles.backRedPale,
            styles.displayDataIndividual
            )}>
            <View style={{ width: '85%' }}>
            <Text style={styles.textSizeMediumNormal}>
                Coordinates
            </Text>
            <Text style={styles.textSizeSmallNormal}>
                Latitude: {vendorData.latitude + '\n'}
                Longitude: {vendorData.longitude}
            </Text>
            </View>
            <View style={styles.editIcon}>
              <Icon
              name='edit'
              size={22}
              onPress={() => this.editLocation()} />
            </View>
          </View>
        </View>
      )
    }

    return this.props.state.load.loading === true ?
      <View style={styles.loading}><Loading /></View>
      :
      this.props.state.auth.authenticated === true ?
        (
          <>
            <Header
              drawer={this.props.navigation.openDrawer}
              page='My Vendor Profile'
              nav={this.props.navigation} />
            <View style={Object.assign({}, styles.window)}>
              {
                this.props.state.auth.profile.vendor === null ?
                  <View>
                    <Text>Confirm your work location to become a vendor</Text>
                    <TouchableHighlight
                      underlayColor='#cbcbcb'
                      style={Object.assign(
                        {},
                        styles.touchable,
                        styles.backOrange
                      )}
                      onPress={() => this.goToCreate()}>
                      <Text style={styles.buttonSmall}>
                        Press here to continue
                      </Text>
                    </TouchableHighlight>
                  </View>
                  :
                  <ScrollView style={styles.backRedPale}>
                    <Vendor />
                  </ScrollView>
              }
            </View>
          </>
        )
        :
        (
          <View>
            <SignInButton goTo={() => this.goToSignIn()} />
          </View>
        )
  }
}

const ViewVendorProfile =
  connect(mapStateToProps, mapDispatchToProps)(ViewVendorProfileContainer);

export default ViewVendorProfile;
