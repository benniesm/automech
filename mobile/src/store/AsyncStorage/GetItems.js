import AsyncStorage from '@react-native-community/async-storage';

const multiGet = async (data) => {

  let values;
  try {
    values = await AsyncStorage.multiGet(data)
    //console.log(values);
    return values;
  } catch(e) {
    console.log(e);
  }
}

export default multiGet;
