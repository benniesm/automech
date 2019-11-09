import React, { Component } from 'react';
import { ScrollView, Text, TouchableHighlight, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps
} from '../../../store/StateDispatch';
import fetchApi from '../../../api/Fetch';
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
    //console.log(this.props.state.auth.profile.vendor);
  }

  goToCreate = () => {
    this.props.navigation.navigate('CreateVendorProfile');
  }

  goToSignIn = () => {
    this.props.navigation.navigate('Sign');
  }

  editText = () => {
    this.props.navigation.navigate('updateVendorProfile');
  }

  render() {
    const vendorData = this.props.state.auth.profile.vendor;
    const Vendor = () => {
      return(
        <View>
          <View style={Object.assign(
            {},
            styles.backRedPale,
            styles.displayData
            )}>
            <Text style={styles.textSizeMediumNormal}>
                image
            </Text>
          </View>
          <View style={Object.assign(
            {},
            styles.backRedPale,
            styles.displayDataIndividual
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
            styles.displayDataIndividual,
            {borderBottomWidth: 2}
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
              page='Vendor Information' />
            <View style={Object.assign({}, styles.window)}>
              {
                this.props.state.auth.profile.vendor === null ?
                  <View>
                    <Text>Update your profile to become a vendor</Text>
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
                  <ScrollView style={Object.assign(
                    {},
                    styles.view,
                    styles.backRedPale
                    )}>
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
