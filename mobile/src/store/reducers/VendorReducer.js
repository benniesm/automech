import { vendorOn, vendorOff } from '../actions/VendorAction';

const defaultState = {
  vendorUser: false
};

const vendorReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'VENDOR_USER':
      return {
        vendorUser: true
      }
    case 'NON_VENDOR_USER':
      return {
        vendorUser: false
      }
    default:
      return state;
  }
};

export { vendorReducer };
