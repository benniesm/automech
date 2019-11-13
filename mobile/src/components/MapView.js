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

    console.log(this.props.state.map.marks[0].latlng);
    let newMark = [
      {
        latlng: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude
        },
        title: 'Selected Location',
        description: 'This location will be set as your work place'
      }
    ];

    this.props.coordsSet(newCoordinates);
    this.props.markersSet(newMark);
    console.log(this.props.state.map.marks[0].latlng);
  }

  render() {
    const coordsNow = this.props.state.map;
    return(
      <MapView
        style={styles.map}
        region={ coordsNow.coords }
      >
        {this.props.state.map.marks.map(marker =>
          this.props.state.map.marks.length > 1 ?
          <Marker
            key={marker.latlng}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
          :
          <Marker
            draggable
            onDragEnd={(e) => this.changeCoordinates(e.nativeEvent.coordinate)}
            key={marker.latlng}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
      )}
      </MapView>
    )
  }
}

const ShowMapView =
  connect(mapStateToProps, mapDispatchToProps)(MapViewContainer);

export default ShowMapView;
