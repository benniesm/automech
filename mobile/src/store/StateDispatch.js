import {
  loadingOff,
  loadingOn
} from './actions/LoadingAction';
import { loginUser, logoutUser, profileUser } from './actions/AuthAction';
import { setCoords, setMarkers } from './actions/MapAction';
import { viewData, getServices } from './actions/PageAction';
import { vendorOn, vendorOff } from './actions/VendorAction';

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
    markersSet: (data) => {
      dispatch(setMarkers(data))
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
    }
  }
}

export { mapStateToProps, mapDispatchToProps };
