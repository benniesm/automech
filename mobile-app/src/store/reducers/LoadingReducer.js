import { loadingOn, loadingOff } from '../actions/LoadingAction';

const defaultState = {
  loading: false
};

const loadingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ONLINE':
      return {
        loading: true
      }
    case 'OFFLINE':
      return {
        loading: false
      }
    default:
      return state;
  }
};

export { loadingReducer };
