const confirmationScreen = () => {
  return {
    type: 'CONFIRMATION_SCREEN'
  }
};

const loginScreen = () => {
  return {
    type: 'LOGIN_SCREEN'
  }
};

const loginUser = (data) => {
  return {
    type: 'LOGIN',
    profile: data
  }
};

const logoutUser = () => {
  return {
    type: 'LOGOUT'
  }
};

const profileUser = (data) => {
  return {
    type: 'PROFILE',
    profile: data
  }
};

export { confirmationScreen, loginScreen, loginUser, logoutUser, profileUser };
