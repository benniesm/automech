import { combineReducers } from 'redux';
import { authReducer } from './AuthReducer';
import { loadingReducer } from './LoadingReducer';
import { mapReducer } from './MapReducer';
import { pageReducer } from './PageReducer';
import { vendorReducer } from './VendorReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  load: loadingReducer,
  map: mapReducer,
  page: pageReducer,
  vendor: vendorReducer,
});

export default rootReducer;
