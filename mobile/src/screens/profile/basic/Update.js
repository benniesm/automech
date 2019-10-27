import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

class UpdateBasicProfileContainer extends Component {
  render() {
    return (
      <Text>update info</Text>
    )
  }
}

const mapStateToProps = (state) => {
  return { state: state }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUser: (data) => {
      dispatch(loginUser(data))
    }
  }
}

const UpdateBasicProfile = connect(mapStateToProps, mapDispatchToProps)(UpdateBasicProfileContainer);

export default UpdateBasicProfile;
