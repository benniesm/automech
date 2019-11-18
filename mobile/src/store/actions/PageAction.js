const viewData = (data) => {
  return {
    type: 'UPDATE',
    view: data
  }
}

const getServices = (data) => {
  return {
    type: 'SERVICE_TYPES',
    list: data
  }
}

const setPageToMap = () => {
  return {
    type: 'PAGE_MAP'
  }
}

const setPageToView = () => {
  return {
    type: 'PAGE_VIEW'
  }
}

export { viewData, getServices, setPageToMap, setPageToView };
