import { setMarkMe, setMarkVendors, setCoords } from '../actions/MapAction';

const defaultState = {
  coords: {
    latitude: 6.6211,
    longitude: 3.3609,
    latitudeDelta: 0.0100,
    longitudeDelta: 0.0020,
    accuracy: 23.58300018310547,
    altitude: 45,
    heading: 0,
    speed: 0
  },
  markMe: {
      latlng: { latitude: 6.6211, longitude: 3.3609 },
      title: 'Pinned Location',
      description: 'Currently Selected Location'
  },
  markVendors: []
};

const mapReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'COORDINATES':
      return {
        coords: action.coords,
        markMe: state.markMe,
        markVendors: state.markVendors
      }
    case 'MARK_ME':
      return {
        markMe: action.markMe,
        coords: state.coords,
        markVendors: state.markVendors
      }
    case 'MARK_VENDORS':
      return {
        markVendors: action.markVendors,
        coords: state.coords,
        markMe: state.markMe
      }
    default:
      return state;
  }
};

export { mapReducer };
