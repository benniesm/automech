import React, { Component } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import styles from '../../Styles.js';

class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    return (
      <View style={Object.assign(
        {},
        styles.container,
        styles.backRed,
        )}>
        <View style={styles.menuHeader}>
          <Image
            style={styles.imageMenu}
            source={require('../assets/images/spare-parts.jpg')}
           />
        </View>
        <View style={styles.menuItems}>
          <Text style={Object.assign(
  					{},
            styles.navItem,
  					styles.textSizeMedium,
            styles.textColorRedPale
  					)}
            onPress={this.navigateToScreen('Home')}>
              Home
          </Text>
          <Text style={Object.assign(
  					{},
            styles.navItem,
  					styles.textSizeMedium,
            styles.textColorRedPale
  					)}
            onPress={this.navigateToScreen('Scanner')}>
              Mobile Scanner
          </Text>
          <Text style={Object.assign(
  					{},
            styles.navItem,
  					styles.textSizeMedium,
            styles.textColorRedPale
  					)}
            onPress={this.navigateToScreen('AutoLoan')}>
              Auto Loan
          </Text>
          <Text style={Object.assign(
  					{},
            styles.navItem,
  					styles.textSizeMedium,
            styles.textColorRedPale
  					)}
            onPress={this.navigateToScreen('Insurance')}>
              Insurance
          </Text>
          <Text style={Object.assign(
  					{},
            styles.navItem,
  					styles.textSizeMedium,
            styles.textColorRedPale
  					)}
            onPress={this.navigateToScreen('Profile')}>
              Profile
          </Text>
          <Text style={Object.assign(
  					{},
            styles.navItem,
  					styles.textSizeMedium,
            styles.textColorRedPale
  					)}
            onPress={this.navigateToScreen('Vendor')}>
              Vendor
          </Text>
        </View>
        <View style={styles.menuFooter}>
          <Text style={Object.assign(
  					{},
  					styles.textSizeSmall,
            styles.textColorBlack
          )}>AutoMech App</Text>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;
