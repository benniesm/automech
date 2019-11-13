import { viewData, getServices } from '../actions/PageAction';

const defaultState = {
  view: null,
  list: null
};

const pageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE':
      return {
        view: action.view,
        list: state.list
      };
      break;
    case 'SERVICE_TYPES':
      return {
        view: state.view,
        list: action.list
      }
      break;
    default:
      return state;
  }
};

export { pageReducer };
