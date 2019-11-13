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

export { viewData, getServices };
