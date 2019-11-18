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

  componentDidMount() {
    //this.getMyCoordinates();
    //console.log(this.props.state.map);
  }

  changeCoordinates = (coordinates) => {
    //console.log(coordinates);
    const oldCoordinates = this.props.state.map.coords;
    let newCoordinates = {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      latitudeDelta: oldCoordinates.latitudeDelta,
      longitudeDelta: oldCoordinates.longitudeDelta
    }

    //console.log(this.props.state.map.markMe);
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
    console.log(this.props.state.map.markMe);
  }

  viewVendor = (ven) => {
    this.props.vendorSelect(ven);
    this.props.pageToView();
  }

  render() {
    const coordsNow = this.props.state.map;
    const markMe = coordsNow.markMe;
    const markVendors = coordsNow.markVendors;
    /*
    return this.props.state.map.markVendors.map(m => {
      <Text>{m.latitude}</Text>
    })
    */
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
              {
                console.log('marker.user')
              }
            })
        }
      </MapView>
    )
  }
}

const ShowMapView =
  connect(mapStateToProps, mapDispatchToProps)(MapViewContainer);

export default ShowMapView;
