import { combineReducers } from 'redux';
import { authReducer } from './AuthReducer';
import { loadingReducer } from './LoadingReducer';
import { pageReducer } from './PageReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  load: loadingReducer,
  page: pageReducer
});

export default rootReducer;
