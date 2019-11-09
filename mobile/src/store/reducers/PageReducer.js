import { viewData } from '../actions/PageAction';

const defaultState = {
  view: null,
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
