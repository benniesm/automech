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

export { vendorOn, vendorOff };
