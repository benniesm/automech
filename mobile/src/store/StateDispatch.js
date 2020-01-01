import {
  loadingOff,
  loadingOn
} from './actions/LoadingAction';
import { setFetchInfo } from './actions/ApiAction';
import {
  confirmationScreen,
  loginScreen,
  loginUser,
  logoutUser,
  profileUser
} from './actions/AuthAction';
import { setCoords, setMarkMe, setMarkVendors } from './actions/MapAction';
import {
  viewData,
  getModels,
  getServices,
  setPageToMap,
  setPageToView
} from './actions/PageAction';
import {
  showNotify,
  hideNotify
} from './actions/NotifyAction';
import {
  vendorOn,
  vendorOff,
  selectVendor,
  calcVendorDist
} from './actions/VendorAction';

const mapStateToProps = (state) => {
  return { state: state }
}

const mapDispatchToProps = (dispatch) => {
  return {
    screenConfirm: () => {
      dispatch(confirmationScreen())
    },
    screenLogin: () => {
      dispatch(loginScreen())
    },
    authenticateUser: (data) => {
      dispatch(loginUser(data))
    },
    deAuthenticateUser: () => {
      dispatch(logoutUser())
    },
    fetchInfoSet: (data) => {
      dispatch(setFetchInfo(data))
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
    vendorDistCalc: (data) => {
      dispatch(calcVendorDist(data))
    },
    loadOn: () => {
      dispatch(loadingOn())
    },
    loadOff: () => {
      dispatch(loadingOff())
    },
    notifyShow: (data) => {
      dispatch(showNotify(data))
    },
    notifyHide: () => {
      dispatch(hideNotify())
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
    modelsGet: (data) => {
      dispatch(getModels(data))
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
