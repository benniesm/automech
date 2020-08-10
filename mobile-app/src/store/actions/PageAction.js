const viewData = (data) => {
  return {
    type: 'UPDATE',
    view: data
  }
}

const getModelOne = (data) => {
  return {
    type: 'CAR_MODEL_ONE',
    modelOne: data
  }
}

const getModels = (data) => {
  return {
    type: 'CAR_MODELS',
    models: data
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

export {
  viewData, getModelOne, getModels, getServices, setPageToMap, setPageToView
};
