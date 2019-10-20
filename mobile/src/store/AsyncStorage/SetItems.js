import AsyncStorage from '@react-native-community/async-storage';

const multiSet = async (data) => {
  try {
    await AsyncStorage.multiSet(data)
  } catch(e) {
    console.log(e);
  }

  console.log("Done.")
}

export default multiSet;
