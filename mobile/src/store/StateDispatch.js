import {
  loadingOff,
  loadingOn
} from './actions/LoadingAction';
import { loginUser, logoutUser, profileUser } from './actions/AuthAction';
import { viewData } from './actions/PageAction';
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
    }
  }
}

export { mapStateToProps, mapDispatchToProps };
