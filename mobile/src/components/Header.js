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
              <View style={styles.headerIcons}>
                <Icon
                name='chevron-left'
                color='maroon'
                size={35} />
              </View>
              <View>
                <Text style={Object.assign(
        					{},
        					styles.textSizeMedium,
        					styles.textColorWhite,
        					styles.textCenter
        					)}>
                  {this.props.page}
                  </Text>
                </View>
                <View style={styles.headerIcons}>
                  <Icon
                  name='chevron-right'
                  color='maroon'
                  size={35} />
                </View>
            </View>
          </View>
    )
  }
}

export default Header;

//Header title should alternate between states
