import {
  viewData,
  getServices,
  setPageToMap,
  setPageToView
} from '../actions/PageAction';

const defaultState = {
  view: null,
  list: null,
  pageTo: 'map'
};

const pageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE':
      return {
        view: action.view,
        list: state.list,
        pageTo: state.pageTo
      }
    case 'SERVICE_TYPES':
      return {
        list: action.list,
        view: state.view,
        pageTo: state.pageTo
      }
    case 'PAGE_MAP':
      return {
        pageTo: 'map',
        list: state.list,
        view: state.view
      }
    case 'PAGE_VIEW':
      return {
        pageTo: 'view',
        list: state.list,
        view: state.view
      }
    default:
      return state;
  }
};

export { pageReducer };
