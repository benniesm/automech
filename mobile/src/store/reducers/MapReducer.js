import { setMarkers, setCoords } from '../actions/MapAction';

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
  marks: [
    {
      latlng: { latitude: 6.6211, longitude: 3.3609 },
      title: 'Pinned Location',
      description: 'Currently Selected Location'
    }
  ],
};

const mapReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'COORDINATES':
      return {
        coords: action.coords,
        marks: state.marks
      };
    case 'MARKERS':
      return {
        coords: state.coords,
        marks: action.marks
      };
    default:
      return state;
  }
};

export { mapReducer };
