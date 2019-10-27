import React, { Component } from 'react';
import {
  Button,
  Image,
  Text,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import styles from '../../Styles.js';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  showMenu = () => {
    this.props.drawer();
    console.log(this.props);
  }

  render() {
    return (
          <View style={styles.header}>
            <View style={styles.menuIcon}>
              <Icon
              name='menu'
              color='white'
              size={30}
              onPress={() => this.showMenu()} />
            </View>
            <View style={styles.headerTitle}>
              <Text style={Object.assign(
      					{},
      					styles.textSizeMedium,
      					styles.textColorWhite,
      					styles.textCenter
      					)}>
                {this.props.page}
                </Text>
            </View>
          </View>
    )
  }
}

export default Header;

//Header title should alternate between states
