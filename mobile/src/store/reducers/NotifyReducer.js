import {
  showNotify,
  hideNotify,
} from '../actions/AuthAction';

const defaultState = {
  info: {},
  style: 'notificationHide'
}

const notifyReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFY':
      return {
        style: 'notificationShow',
        info: action.info
      }
    case 'HIDE_NOTIFY':
      return {
        style: { display: 'none' },
        info: {}
      }
    default:
      return state;
  }
}

export { notifyReducer };
