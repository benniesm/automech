import { vendorOn, vendorOff, selectVendor } from '../actions/VendorAction';

const defaultState = {
  vendorUser: false,
  selected: {}
};

const vendorReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'VENDOR_USER':
      return {
        vendorUser: true,
        selected: state.selected
      }
    case 'NON_VENDOR_USER':
      return {
        vendorUser: false,
        selected: state.selected
      }
    case 'SELECT_VENDOR':
      return {
        selected: action.selected,
        vendorUser: state.vendorUser
      }
    default:
      return state;
  }
};

export { vendorReducer };
