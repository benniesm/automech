import React, { Component } from 'react';
import { Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps
} from '../store/StateDispatch';
import fetchApi from '../api/Fetch';
import styles from '../../Styles';

class MapViewContainer extends Component {
  constructor(props) {
    super(props);
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

    return(
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
            this.props.state.map.markVendors.map(marker => {
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
    )
  }
}

const ShowMapView =
  connect(mapStateToProps, mapDispatchToProps)(MapViewContainer);

export default ShowMapView;
