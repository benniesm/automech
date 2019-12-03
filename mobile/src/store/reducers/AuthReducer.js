import {
  confirmationScreen,
  loginScreen,
  loginUser,
  logoutUser,
  profileUser
} from '../actions/AuthAction';

const defaultState = {
  authenticated: false,
  confirmSent: false,
  profile: {},
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CONFIRMATION_SCREEN':
      return {
        confirmSent: false,
        authenticated: action.authenticated,
        profile: action.profile
      }
    case 'LOGIN_SCREEN':
      return {
        confirmSent: true,
        authenticated: action.authenticated,
        profile: action.profile
      }
    case 'LOGIN':
      return {
        authenticated: true,
        confirmSent: action.confirmSent,
        profile: action.profile
      }
    case 'LOGOUT':
      return {
        authenticated: false,
        confirmSent: action.confirmSent,
        profile: {}
      }
    case 'PROFILE':
      return {
        authenticated: true,
        confirmSent: action.confirmSent,
        profile: action.profile
      }
    default:
      return state;
  }
};

export { authReducer };
