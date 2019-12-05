import React, { Component } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps
} from '../store/StateDispatch';
import styles from '../../Styles.js';

class NotificationContainer extends Component {
  constructor(props) {
    super(props);
  }

  takeAction = () => {
    this.props.notifyHide();
  }

  render() {
    const state = this.props.state;

    return (
      <View style={styles[state.notify.style]}>
        <Text style={Object.assign(
          {},
          styles.textCenter,
          styles.textColorRed,
          styles.textPaddedSmall
        )}>
          {state.notify.info.msg}
        </Text>
        <TouchableHighlight
          style={Object.assign(
            {},
            styles.touchable3,
          )}
          onPress={() =>this.takeAction()}>
            <Text style={Object.assign(
              {},
              styles.textColorRed,
              styles.textCenter,
              styles.textSizeSmall
            )}>{state.notify.info.click}</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const Notification =
  connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);

export default Notification;
