import { loginUser, logoutUser, profileUser } from '../actions/AuthAction';

const defaultState = {
  authenticated: false,
  profile: {},
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        authenticated: true,
        profile: action.profile
      };
      break;
    case 'LOGOUT':
      return {
        authenticated: false,
        profile: {}
      };
      break;
    case 'PROFILE':
      return {
        authenticated: true,
        profile: action.profile
      };
      break;
    default:
      return state;
  }
};

export { authReducer };
