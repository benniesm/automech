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
      //console.log(listPermissions[lp] + ': ' + granted);

      if (!granted) {
        permit = false;
        break;
      }
      //return request;
    } catch (err) {
      console.log(err);
    }
  }

  if (permit) {
    console.log('permitted');
    return true;
  }

  console.log('no permit')
  return false;
}

export default getPermissions;
