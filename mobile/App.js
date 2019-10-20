/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import styles from './Styles.js';
import Header from './src/components/Header';
import Navigator from './src/Navigator';

const App: () => React$Node = () => {
  return 2 === 0 ?
  (
    <View style={Object.assign({}, styles.window, styles.bg1)}>
      <View style={styles.welcome}>
        <Text style={styles.text}>AutoMech</Text>
      </View>
    </View>
  )
  :
  <View style={styles.container}>
    <Header />
    <Navigator style={styles.body} />
  </View>
};

export default App;
