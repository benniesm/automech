const loadingOn = () => {
  return {
    type: 'ONLINE'
  }
};

const loadingOff = () => {
  return {
    type: 'OFFLINE'
  }
};

export { loadingOn, loadingOff };
