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
import { Provider } from 'react-redux';
import { persistor, store } from './src/store/Store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import styles from './Styles.js';
import Navigator from './src/Navigator';

const App: () => React$Node = () => {
  return 2 === 0 ?
  (
    <View style={Object.assign({}, styles.window, styles.bg1)}>
      <View style={styles.welcome}>
        <Text style={Object.assign({}, styles.textH1, styles.textColorWhite)}>
          AutoMech
        </Text>
      </View>
    </View>
  )
  :
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <View style={styles.container}>
        <Navigator style={styles.body} />
      </View>
    </PersistGate>
  </Provider>
};

export default App;
