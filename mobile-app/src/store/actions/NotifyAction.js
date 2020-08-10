const showNotify = (data) => {
  return {
    type: 'SHOW_NOTIFY',
    info: data
  }
}

const hideNotify = () => {
  return {
    type: 'HIDE_NOTIFY'
  }
}

export { showNotify, hideNotify };
