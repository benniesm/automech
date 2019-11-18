import React, { Component } from 'react';
import { ImageBackground, Text, TouchableHighlight, View } from 'react-native';
import styles from '../../Styles';

class SignInButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <ImageBackground
        source={require('../assets/images/spare-parts.jpg')}
        imageStyle={{
          opacity: 1
        }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          height: '100%'
      }}>
        <TouchableHighlight
          underlayColor='#cbcbcb'
          style={styles.touchable}
          onPress={() => this.props.goTo()}>
          <Text style={Object.assign(
            {},
            styles.touchable,
            styles.backRed,
            styles.buttonSmall)}>
             Press here to login or sign up!
          </Text>
        </TouchableHighlight>
      </ImageBackground>
    )
  }
}

export default SignInButton;
