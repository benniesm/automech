import { combineReducers } from 'redux';
import { authReducer } from './AuthReducer';
import { loadingReducer } from './LoadingReducer';
import { pageReducer } from './PageReducer';
import { vendorReducer } from './VendorReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  load: loadingReducer,
  page: pageReducer,
  vendor: vendorReducer,
});

export default rootReducer;
