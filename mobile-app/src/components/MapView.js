import React, { Component } from 'react';
import { Picker, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps
} from '../store/StateDispatch';
import getMyPosition from '../functions/GetMyPosition';
import fetchApi from '../api/Fetch';
import styles from '../../Styles';

class MapViewContainer extends Component {
  constructor(props) {
    super(props);
    //console.log('this.props.state.page.modelOne');
    this.state = {
      carMakeId: this.props.state.page.modelOne
    }
  }

  componentDidMount() {
    getMyPosition(this.props);
  }

  changeCoordinates = (coordinates) => {
    const oldCoordinates = this.props.state.map.coords;
    let newCoordinates = {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      latitudeDelta: oldCoordinates.latitudeDelta,
      longitudeDelta: oldCoordinates.longitudeDelta
    }

    let newMark =
      {
        latlng: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude
        },
        title: 'Selected Location',
        description: 'This location will be set as your work place'
      };

    this.props.coordsSet(newCoordinates);
    this.props.markMeSet(newMark);
  }

  changeCarMake = (itemValue) => {
    if (itemValue === 25 || itemValue === 999) {
      this.props.markVendorsByCarSet(this.props.state.map.markVendors);
      return;
    }
    //console.log(itemValue);
    const filteredMakes = this.props.state.map.markVendors.filter(fMake => {
      //console.log(fMake.cars + ' =? ' + itemValue);
      return parseInt(fMake.cars) === itemValue
    });
    //console.log(filteredMakes);
    this.props.markVendorsByCarSet(filteredMakes);
    this.props.modelOneGet(itemValue);
  }

  viewVendor = (ven) => {
    const coords = this.props.state.map.coords;
    let distance = this.vendorDistance(
      coords.latitude,
      coords.longitude,
      ven.latitude,
      ven.longitude
    );
    this.props.vendorSelect(ven);
    this.props.vendorDistCalc(distance);
    this.props.pageToView();
  }

  degreesToRadians = (degrees) => {
    return degrees * Math.PI / 180;
  }

  vendorDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadiusKm = 6371;

    const dLat = this.degreesToRadians(lat2-lat1);
    const dLon = this.degreesToRadians(lon2-lon1);

    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return earthRadiusKm * c;
  }

  render() {
    const coordsNow = this.props.state.map;
    const markMe = coordsNow.markMe;
    const markVendors = coordsNow.markVendors;

    const makes =this.props.state.page.models.map(make => {
      return <Picker.Item key={make.id} label={make.car_model} value={make.id} />
    });

    const showVendors = markVendors;

    return(
      <>
        <View style={{
          height: 50,
          width: '99%',
          borderColor: 'orange',
          borderWidth: 1,
          borderRadius: 7,
          margin: 2
        }}>
          <Picker
            selectedValue={this.state.carMakeId}
            onValueChange={(itemValue, itemIndex) =>
              {
                this.setState({carMakeId: itemValue});
                this.changeCarMake(itemValue);
              }
            }>
            <Picker.Item label="Filter by Brand" key={999} value={999} />
            {makes}
          </Picker>
        </View>
        <View style={{ height: '91%', width: '100%' }}>
          <MapView
            style={styles.map}
            region={ coordsNow.coords }
          >
            {
              this.props.parent === 'me' ?
                <Marker
                  draggable
                  onDragEnd={
                    (e) => this.changeCoordinates(e.nativeEvent.coordinate)
                  }
                  coordinate={markMe.latlng}
                  title={markMe.title}
                  description={markMe.description}
                />
                :
                showVendors.map(marker => {
                  return (
                    <Marker
                      key={marker.id}
                      coordinate={{
                        latitude: Number(marker.latitude),
                        longitude: Number(marker.longitude)
                      }}
                      title={marker.user.name.toString()}
                      description={marker.description}
                      onPress={() => this.viewVendor(marker)}
                    />
                  )
                })
            }
          </MapView>
        </View>
      </>
    )
  }
}

const ShowMapView =
  connect(mapStateToProps, mapDispatchToProps)(MapViewContainer);

export default ShowMapView;
