import { viewData } from '../actions/PageAction';

const defaultState = {
  view: {}
};

const pageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE':
      return action.view;
    default:
      return state;
  }
};

export { pageReducer };
