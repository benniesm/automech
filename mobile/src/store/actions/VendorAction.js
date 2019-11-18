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

export { vendorOn, vendorOff, selectVendor };
