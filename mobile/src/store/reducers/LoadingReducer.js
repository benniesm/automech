import { loadingOn, loadingOff } from '../actions/LoadingAction';

const defaultState = {
  loading: false
};

const loadingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ONLINE':
      return {
        loading: true
      };
      break;
    case 'OFFLINE':
      return {
        loading: false
      };
      break;
    default:
      return state;
  }
};

export { loadingReducer };
