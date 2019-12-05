import { PermissionsAndroid } from 'react-native';

const requestPermissions = async(props, info) => {
  let permit = true;
  const listPermissions = [
    'CAMERA',
    'ACCESS_FINE_LOCATION',
    'WRITE_EXTERNAL_STORAGE'
  ];

  for (let lp = 0; lp < listPermissions.length; lp ++) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS[listPermissions[lp]]
      );

      if (granted === 'denied') {
        permit = false;
        break;
      }
    } catch (err) {
      console.log(err);
      permit = false;
    }
  }
  console.log('per'); console.log(permit);
  if (permit) {
    return true;
  }

  props.notifyShow(info);
  return false;
}

export default requestPermissions;
