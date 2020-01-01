import { Alert } from 'react-native';

const fetchRetry = (call, recall) => {
  if (call.status === 1) {
    Alert.alert(
      call.data === 'Permission not granted' ?
        'Grant Permissions' : 'Connection failed',
      call.data === 'Permission not granted' ?
        'AutoMech needs the permissions to function properly.'
        :
        'Check your network and retry',
      [{
        text: 'RETRY',
        onPress: () => {recall()}
      }],
      {cancelable: false},
    )
  }
}

export default fetchRetry;
