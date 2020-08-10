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
        authenticated: state.authenticated,
        profile: state.profile
      }
    case 'LOGIN_SCREEN':
      return {
        confirmSent: true,
        authenticated: state.authenticated,
        profile: state.profile
      }
    case 'LOGIN':
      return {
        authenticated: true,
        profile: action.profile,
        confirmSent: state.confirmSent
      }
    case 'LOGOUT':
      return {
        authenticated: false,
        confirmSent: false,
        profile: {}
      }
    case 'PROFILE':
      return {
        authenticated: true,
        profile: action.profile,
        confirmSent: state.confirmSent
      }
    default:
      return state;
  }
};

export { authReducer };
