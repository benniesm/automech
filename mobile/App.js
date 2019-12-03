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
import { setCustomText } from 'react-native-global-props';
import { Provider } from 'react-redux';
import { persistor, store } from './src/store/Store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import styles from './Styles.js';
import Navigator from './src/Navigator';

const customTextProps = {
  style: {
    fontFamily: 'Roboto',
  }
}

setCustomText(customTextProps);

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <View style={styles.container}>
          <Navigator style={styles.body} />
        </View>
      </PersistGate>
    </Provider>
  )
};

export default App;
