import React, { Component } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols
} from 'react-native-table-component';
import { connect } from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps
} from '../store/StateDispatch';
import fetchApi from '../api/Fetch';
import fetchRetry from '../functions/FetchRetry';
import uiData from '../assets/data/UiData';
import styles from '../../Styles';

class ScreensIndexContainer extends Component {
  constructor(props) {
    super(props);
  }

  getVendors = async(service) => {
    const profileData = this.props.state.auth.profile;

    let serviceVendors = await fetchApi.fetchNow(
      'get',
      {
        'url': 'vendors/services',
        'fetchId': service,
        'data': 'service_id=' + service,
        'token': profileData.api_token,
        'props': this.props,
        'info': uiData.notifyPerms
      }
    );

    fetchRetry(serviceVendors, this.getVendors);
    //console.log(this.props.state.map.markVendors);
    console.log(serviceVendors.data);
    if (serviceVendors.status === 200) {
      this.props.markVendorsSet(serviceVendors.data);
      //console.log(this.props.state.map.markVendors);
      this.props.modelOneGet(999);
      console.log(this.props.state.page.modelOne);
      this.props.pageToMap();
      this.props.nav('Services');
    } else {
      console.log(serviceVendors)
    }
  }

  render() {
    const screens = [
      [
        <TouchableOpacity
          style={styles.indexListItem}
          onPress={() => this.getVendors(2)}>
          <Image
            style={styles.iconIndex}
            source={require('../assets/images/autoscan.jpg')}
           />
          <Text style={styles.textSizeSmall}>Auto Scan</Text>
        </TouchableOpacity>,
        <TouchableOpacity
          style={styles.indexListItem}
          onPress={() => this.getVendors(6)}>
            <Image
              style={styles.iconIndex}
              source={require('../assets/images/check-engine.jpg')}
             />
            <Text style={styles.textSizeSmall}>Mechanic</Text>
        </TouchableOpacity>,
        <TouchableOpacity
          style={styles.indexListItem}
          onPress={() => this.getVendors(4)}>
          <Image
            style={styles.iconIndex}
            source={require('../assets/images/electronics.jpg')}
           />
          <Text style={styles.textSizeSmall}>Electronics</Text>
        </TouchableOpacity>
      ],
      [
        <TouchableOpacity
          style={styles.indexListItem}
          onPress={() => this.getVendors(9)}>
          <Image
            style={Object.assign(
              {transform: [{ rotate: '90deg' }]},
              styles.iconIndex
            )}
            source={require('../assets/images/car-keys.jpg')}
           />
          <Text style={styles.textSizeSmall}>Security</Text>
        </TouchableOpacity>,
        <TouchableOpacity
          style={styles.indexListItem}
          onPress={() => this.getVendors(1)}>
          <Image
            style={styles.iconIndex}
            source={require('../assets/images/wheel-alignment.jpg')}
           />
          <Text style={styles.textSizeSmall}>Alignment</Text>
        </TouchableOpacity>,
        <TouchableOpacity
          style={styles.indexListItem}
          onPress={() => this.getVendors(11)}>
          <Image
            style={styles.iconIndex}
            source={require('../assets/images/tyres.jpg')}
           />
          <Text style={styles.textSizeSmall}>Tyres</Text>
        </TouchableOpacity>
        ],
      [
        <TouchableOpacity
          style={styles.indexListItem}
          onPress={() => this.getVendors(3)}>
          <Image
            style={styles.iconIndex}
            source={require('../assets/images/car-body.jpg')}
           />
          <Text style={styles.textSizeSmall}>Body Works</Text>
        </TouchableOpacity>,
        <TouchableOpacity
          style={styles.indexListItem}
          onPress={() => this.getVendors(7)}>
          <Image
            style={styles.iconIndex}
            source={require('../assets/images/paint.jpg')}
           />
          <Text style={styles.textSizeSmall}>Paint</Text>
        </TouchableOpacity>,
        <TouchableOpacity
          style={styles.indexListItem}
          onPress={() => this.getVendors(8)}>
          <Image
            style={styles.iconIndex}
            source={require('../assets/images/spare-parts.jpg')}
           />
          <Text style={styles.textSizeSmall}>Spare Parts</Text>
        </TouchableOpacity>
      ],
      [
        <TouchableOpacity
          style={styles.indexListItem}
          onPress={() => this.getVendors(12)}>
          <Image
            style={styles.iconIndex}
            source={require('../assets/images/upholstery.jpg')}
           />
          <Text style={styles.textSizeSmall}>Upholstery</Text>
        </TouchableOpacity>,
        <TouchableOpacity
          style={styles.indexListItem}
          onPress={() => this.getVendors(5)}>
          <Image
            style={styles.iconIndex}
            source={require('../assets/images/petrol-station.png')}
           />
          <Text style={styles.textSizeSmall}>Fuel Station</Text>
        </TouchableOpacity>,
        <TouchableOpacity
          style={styles.indexListItem}
          onPress={() => this.getVendors(10)}>
          <Image
            style={styles.iconIndex}
            source={require('../assets/images/towing.jpg')}
           />
          <Text style={styles.textSizeSmall}>Towing Van</Text>
        </TouchableOpacity>
      ],
      [
        <TouchableOpacity
          style={styles.indexListItem}
          onPress={() => this.getVendors(13)}>
          <Image
            style={styles.iconIndex}
            source={require('../assets/images/car-wash.jpg')}
           />
          <Text style={styles.textSizeSmall}>Car Wash</Text>
        </TouchableOpacity>
      ]
    ];

    return (
      <ImageBackground
        source={require('../assets/images/spare-parts.jpg')}
        imageStyle={{
          resizeMode: 'cover',
          width: '100%',
          height: '100%',
          opacity: 0.2
        }}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center'

      }}>
        <Table style={styles.tableIndex}>
          <Rows data={screens} />
        </Table>
      </ImageBackground>
    )
  }
}

const ScreensIndex =
  connect(mapStateToProps, mapDispatchToProps)(ScreensIndexContainer);

export default ScreensIndex;
