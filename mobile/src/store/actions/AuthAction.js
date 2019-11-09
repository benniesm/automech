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

export { loginUser, logoutUser, profileUser };
