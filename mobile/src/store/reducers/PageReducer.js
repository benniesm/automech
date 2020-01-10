import {
  viewData,
  getModelOne,
  getModels,
  getServices,
  setPageToMap,
  setPageToView
} from '../actions/PageAction';

const defaultState = {
  view: null,
  list: [],
  modelOne: null,
  models: [],
  pageTo: 'map'
};

const pageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE':
      return {
        view: action.view,
        modelOne: state.modelOne,
        models: state.models,
        list: state.list,
        pageTo: state.pageTo
      }
    case 'CAR_MODEL_ONE':
      return {
        modelOne: action.modelOne,
        models: state.models,
        list: state.list,
        view: state.view,
        pageTo: state.pageTo
      }
    case 'CAR_MODELS':
      return {
        models: action.models,
        modelOne: state.modelOne,
        list: state.list,
        view: state.view,
        pageTo: state.pageTo
      }
    case 'SERVICE_TYPES':
      return {
        list: action.list,
        modelOne: state.modelOne,
        models: state.models,
        view: state.view,
        pageTo: state.pageTo
      }
    case 'PAGE_MAP':
      return {
        pageTo: 'map',
        list: state.list,
        modelOne: state.modelOne,
        models: state.models,
        view: state.view
      }
    case 'PAGE_VIEW':
      return {
        pageTo: 'view',
        list: state.list,
        modelOne: state.modelOne,
        models: state.models,
        view: state.view
      }
    default:
      return state;
  }
};

export { pageReducer };
