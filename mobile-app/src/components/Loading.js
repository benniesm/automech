import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from '../../Styles';

const Loading = () => {
  return(
    <Image
      style={styles.imageLoading}
      source={require('../assets/images/loading.gif')}
     />
  )
}

export default Loading;
