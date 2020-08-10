import Geolocation from '@react-native-community/geolocation';
import {
  mapStateToProps,
  mapDispatchToProps
} from '../store/StateDispatch';
import getPermissions from './PermissionsCheck';
import requestPermissions from './PermissionsRequest';

const getMyPosition = async(props) => {
  try {
    const granted = await getPermissions();
    if (!granted) {
      const grantPerms = await requestPermissions();
      if (!grantPerms) {
        //await requestPermissions();
        //const geoData = { 'status': 1, 'data': 'Permission not granted' }
        //fetchRetry(geoData, this.getMyPosition);
        //return false;
        getMyPosition(props);
      }
    }
  } catch(e) {
    //Alert.alert('Could not determine app permissions');
  }

  Geolocation.watchPosition(info => {
    let currentCoords = info.coords;
    currentCoords.latitudeDelta = 0.0100;
    currentCoords.longitudeDelta = 0.0020;
    props.coordsSet(currentCoords);
    //console.log('props:' + props)

    let marks = {
      latlng: {
        latitude: info.coords.latitude,
        longitude: info.coords.longitude
      },
      title: 'Your Current Location',
      description: 'AutoMech keeps you connected!'
    };
    //console.log(marks);
    props.markMeSet(marks);
  });
}

export default getMyPosition;
