import {
  vendorOn,
  vendorOff,
  selectVendor,
  calcVendorDist
} from '../actions/VendorAction';

const defaultState = {
  vendorUser: false,
  selected: {},
  distance: 0
};

const vendorReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'VENDOR_USER':
      return {
        vendorUser: true,
        selected: state.selected,
        distance: state.distance
      }
    case 'NON_VENDOR_USER':
      return {
        vendorUser: false,
        selected: state.selected,
        distance: state.distance
      }
    case 'SELECT_VENDOR':
      return {
        selected: action.selected,
        vendorUser: state.vendorUser,
        distance: state.distance
      }
    case 'VENDOR_DISTANCE':
      return {
        distance: action.distance,
        vendorUser: state.vendorUser,
        selected: state.selected
      }
    default:
      return state;
  }
};

export { vendorReducer };
