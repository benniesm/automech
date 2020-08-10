import {
  setFetchInfo
} from '../actions/ApiAction';

const defaultState = {
  fetchInfo: {}
}

const apiReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_FETCH_INFO':
      return {
        fetchInfo: action.fetchInfo
      }
    default:
      return state;
  }
}

export { apiReducer };
