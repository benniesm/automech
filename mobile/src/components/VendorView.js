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
import { imagesUrlProfiles } from '../api/Api';
import styles from '../../Styles';
import Header from './Header';

class VendorViewContainer extends Component {
  render() {
    const venProps = this.props.state.vendor;
    const vendorData = venProps.selected;
    const venDist = venProps.distance;

    const Vendor = () => {
      return (
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
                      { uri: imagesUrlProfiles + vendorData.image }
                  }
                 />
               </View>
               <View style={{ width: '33%' }}>
                  <Text style={styles.textSizeMedium}>
                    {
                      venDist >= 1 ?
                        venDist.toFixed(2) + 'Km'
                        :
                        Math.round(venDist * 1000) + 'm'
                    }
                  </Text>
                  <Text style={styles.textSizeMediumNormal}>from here</Text>
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
