import {
  loadingOff,
  loadingOn
} from './actions/LoadingAction';
import { loginUser, logoutUser } from './actions/AuthAction';
import { viewData } from './actions/PageAction';

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
    viewInfo: (data) => {
      dispatch(viewData(data))
    }
  }
}

export { mapStateToProps, mapDispatchToProps };
