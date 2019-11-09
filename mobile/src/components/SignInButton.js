import React, { Component } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import styles from '../../Styles';

class SignInButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <TouchableHighlight
        underlayColor='#cbcbcb'
        style={styles.touchable}
        onPress={() => this.props.goTo()}>
        <Text style={Object.assign(
          {},
          styles.touchable,
          styles.backViolet,
          styles.buttonSmall)}>
          Press Here To Sign In
        </Text>
      </TouchableHighlight>
    )
  }
}

export default SignInButton;
