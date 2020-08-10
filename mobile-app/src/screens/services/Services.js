import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps
} from '../../store/StateDispatch';
import fetchApi from '../../api/Fetch';
import styles from '../../../Styles';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import SignInButton from '../../components/SignInButton';
import ShowMapView from '../../components/MapView';
import VendorView from '../../components/VendorView';

class ServicesContainer extends Component {
  render() {
    return (
    <>
      <Header
        drawer={this.props.navigation.openDrawer}
        page='Vendor Profile' />
      <View style={styles.window}>
        {
          this.props.state.page.pageTo === 'map' ?
            <ShowMapView parent='vendors' />
            :
            <VendorView nav={this.props.navigation} />
        }
      </View>
    </>
    )
  }
}

const Services =
  connect(mapStateToProps, mapDispatchToProps)(ServicesContainer);

export default Services;
