import React, { Component } from 'react';
import {
  Button,
  Image,
  Text,
  View,
} from 'react-native';
import styles from '../../Styles.js';

class Header extends Component {
  render() {
    return (
          <View style={styles.header}>
            <View>
              <Text>
                Logo
              </Text>
            </View>
            <View style={styles.headerTitle}>
              <Text style={styles.font1}>AutoMech App</Text>
            </View>
          </View>
    )
  }
}

export default Header;

//Header title should alternate between states
