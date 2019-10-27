import { pageTitle } from '../actions/PageAction';

const defaultState = {
  title: 'AutoMech'
};

const TITLE = 'TITLE';

const pageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TITLE:
      return action.title;
    default:
      return state;
  }
};

export { pageReducer };
