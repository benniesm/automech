import { PermissionsAndroid } from 'react-native';

const getPermissions = async() => {
  let permit = true;
  const listPermissions = [
    'CAMERA',
    'ACCESS_FINE_LOCATION',
    'WRITE_EXTERNAL_STORAGE'
  ];

  for (let lp = 0; lp < listPermissions.length; lp ++) {
    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS[listPermissions[lp]]
      );

      if (!granted) {
        permit = false;
        break;
      }
      //return request;
    } catch (err) {
      //console.log(err);
    }
  }

  return permit;
}

export default getPermissions;
