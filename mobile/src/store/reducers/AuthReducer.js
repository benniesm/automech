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
      }
    case 'LOGOUT':
      return {
        authenticated: false,
        profile: {}
      }
    case 'PROFILE':
      return {
        authenticated: true,
        profile: action.profile
      }
    default:
      return state;
  }
};

export { authReducer };
