import {
  loadingOff,
  loadingOn
} from './actions/LoadingAction';
import { loginUser, logoutUser, profileUser } from './actions/AuthAction';
import { setCoords, setMarkMe, setMarkVendors } from './actions/MapAction';
import {
  viewData,
  getServices,
  setPageToMap,
  setPageToView
} from './actions/PageAction';
import { vendorOn, vendorOff, selectVendor } from './actions/VendorAction';

const mapStateToProps = (state) => {
  return { state: state }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUser: (data) => {
      dispatch(loginUser(data))
    },
    deAuthenticateUser: () => {
      dispatch(logoutUser())
    },
    coordsSet: (data) => {
      dispatch(setCoords(data))
    },
    markMeSet: (data) => {
      dispatch(setMarkMe(data))
    },
    markVendorsSet: (data) => {
      dispatch(setMarkVendors(data))
    },
    vendorSelect: (data) => {
      dispatch(selectVendor(data))
    },
    loadOn: () => {
      dispatch(loadingOn())
    },
    loadOff: () => {
      dispatch(loadingOff())
    },
    saveProfile: (data) => {
      dispatch(profileUser(data))
    },
    vendOn: () => {
      dispatch(vendorOn())
    },
    vendOff: () => {
      dispatch(vendorOff())
    },
    viewInfo: (data) => {
      dispatch(viewData(data))
    },
    servicesGet: (data) => {
      dispatch(getServices(data))
    },
    pageToMap: () => {
      dispatch(setPageToMap())
    },
    pageToView: () => {
      dispatch(setPageToView())
    }
  }
}

export { mapStateToProps, mapDispatchToProps };
