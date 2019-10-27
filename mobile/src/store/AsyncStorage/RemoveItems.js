import AsyncStorage from '@react-native-community/async-storage';

multiRemove = async (keys) => {
  try {
    await AsyncStorage.multiRemove(keys)
  } catch(e) {
    console.log(e);
  }
  console.log('Done')
}

export default multiRemove;
