const setCoords = (data) => {
  return {
    type: 'COORDINATES',
    coords: data
  }
}

const setMarkMe = (data) => {
  return {
    type: 'MARK_ME',
    markMe: data
  }
}

const setMarkVendors = (data) => {
  return {
    type: 'MARK_VENDORS',
    markVendors: data
  }
}

const setMarkVendorsByCar = (data) => {
  return {
    type: 'MARK_VENDORS_BY_CAR',
    markVendorsByCar: data
  }
}

export { setCoords, setMarkMe, setMarkVendors, setMarkVendorsByCar };
