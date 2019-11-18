import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { connect } from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps
} from '../store/StateDispatch';
import styles from '../../Styles';
import Header from './Header';

class VendorViewContainer extends Component {
  render() {
    const vendorData = this.props.state.vendor.selected;
    const distance = () => {
      return 'distance'
    }
    const Vendor = () => {
      return(
        <View>
          <View style={Object.assign(
            {},
            styles.backRedPale,
            styles.displayDataIndividual
            )}>
              <View style={{ width: '67%' }}>
                <Image
                  style={{width: 150, height: 150, borderRadius: 100}}
                  source={
                    vendorData.image === null || vendorData.image === ''?
                      require('../assets/images/avatar-icon.jpg')
                      :
                      vendorData.image
                  }
                 />
               </View>
               <View style={{ width: '33%' }}>
                  <Text>
                    {distance()} Km
                  </Text>
               </View>
          </View>
          <View style={Object.assign(
            {},
            styles.backRedPale,
            styles.displayDataIndividual
            )}>
            <View>
              <Text style={styles.textSizeMediumNormal}>
                  Name
              </Text>
              <Text style={styles.textSizeSmall}>
                  {vendorData.user.name}
              </Text>
            </View>
          </View>
          <View style={Object.assign(
            {},
            styles.backRedPale,
            styles.displayDataIndividual
            )}>
            <View>
              <Text style={styles.textSizeMediumNormal}>
                  Service Rendered
              </Text>
              <Text style={styles.textSizeSmall}>
                  {
                    this.props.state.page.list.map(l => {
                      return l.id === vendorData.service_id ?
                        l.service_type: null
                    })
                  }
              </Text>
            </View>
          </View>
          {
            vendorData.description === null ?
              null
              :
              <View style={Object.assign(
                {},
                styles.backRedPale,
                styles.displayDataIndividual
                )}>
                <View>
                  <Text style={styles.textSizeMediumNormal}>
                      Personal Text
                  </Text>
                  <Text style={styles.textSizeSmall}>
                    <Text>{vendorData.description}</Text>
                  </Text>
                </View>
              </View>
          }
          <View style={Object.assign(
            {},
            styles.backRedPale,
            styles.displayDataIndividual
            )}>
            <View>
            <Text style={styles.textSizeMediumNormal}>
                Mobile Phone
            </Text>
            <Text style={styles.textSizeSmall}>
                {vendorData.user.mobile_phone}
            </Text>
            </View>
          </View>
        </View>
      )
    }

    return (
      <ScrollView style={Object.assign(
        styles.backRedPale
        )}>
        <Vendor />
      </ScrollView>
    )
  }
}

const VendorView =
  connect(mapStateToProps, mapDispatchToProps)(VendorViewContainer);

export default VendorView;
