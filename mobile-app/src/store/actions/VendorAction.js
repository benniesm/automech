const vendorOn = () => {
  return {
    type: 'VENDOR_USER'
  }
}

const vendorOff = () => {
  return {
    type: 'NON_VENDOR_USER'
  }
}

const selectVendor = (data) => {
  return {
    type: 'SELECT_VENDOR',
    selected: data
  }
}

const calcVendorDist = (data) => {
  return {
    type: 'VENDOR_DISTANCE',
    distance: data
  }
}

export { vendorOn, vendorOff, selectVendor, calcVendorDist };
