import { PermissionsAndroid } from 'react-native';

const requestPermissions = async() => {
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
      permit = false;
    }
  }

  return permit;
}

export default requestPermissions;
