import React, { Component } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps
} from '../store/StateDispatch';
import styles from '../../Styles';
/*
class VendorProfile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //console.log(this.props.nav)
  }

  showViewUpdate = () => {
    this.props.nav.navigate('updateVendorProfile');
  }

  render() {
    const data = this.props.state.page;
    const vendorDetails = () => {
      return (
        <View>
          <Text>
            {data.vendor.image}
          </Text>
          <Text>
            {data.name}
          </Text>
          <Text>
            {data.vendor.description}
          </Text>
          <Text>
            {data.mobile_phone}
          </Text>
          <Text>
            {data.email}
          </Text>
          <Text>
            {data.vendor.certified}
          </Text>
          <Text>
            {data.vendor.rating}
          </Text>
        </View>
      )
    }

    return (
      <View>
        {vendorDetails()}
        {
          this.props.self && this.props.self === 'true' ?
          <View>
            <TouchableHighlight
              underlayColor='#cbcbcb'
              style={Object.assign({}, styles.touchable, styles.backOrange)}
              onPress={() => this.showViewUpdate()}>
              <Text style={styles.buttonSmall}>Press here to edit...</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='#cbcbcb'
              style={Object.assign({}, styles.touchable, styles.backOrange)}
              onPress={() => this.showViewUpdate()}>
              <Text style={styles.buttonSmall}>
                Set your location on the map
              </Text>
            </TouchableHighlight>
          </View>
          :
          <View></View>
        }
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorProfile);
*/
