import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps
} from '../../../store/StateDispatch';
import fetchApi from '../../../api/Fetch';
import styles from '../../../../Styles';
import Header from '../../../components/Header';

class CreateVendorProfileContainer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>
        <Header
          drawer={this.props.navigation.openDrawer}
          page='New Vendor Profile' />
        <View style={styles.mainContent}>
          <TouchableHighlight
            underlayColor='#cbcbcb'
            style={Object.assign({}, styles.touchable, styles.backGray)}
            onPress={() => this.getPhoto()}>
            <Text style={styles.buttonSmall}>Submit</Text>
          </TouchableHighlight>
        </View>
      </>
    );
  }
}

const CreateVendorProfile =
  connect(mapStateToProps, mapDispatchToProps)(CreateVendorProfileContainer);

export default CreateVendorProfile;
