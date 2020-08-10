import { Alert } from 'react-native';
import { serverApi, countryCodes } from './Api';
import getPermissions from '../functions/PermissionsCheck';
import requestPermissions from '../functions/PermissionsRequest';
import uiData from '../assets/data/UiData';

function fetchUrl(urlName) {
  switch (urlName) {
    case 'countryCode':
      return countryCodes;
    default:
      return serverApi + urlName;
  }
}

const timeout = (url, options, timeout = 30000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        )
    ]);
}

const getApi = async(params) => {
  let url = fetchUrl(params.url);
  let view = '';

  if (params.hasOwnProperty('fetchId')) {
    view = '/' + params.fetchId;
  }

  const token = params.token;

  const response =
    await timeout(url + view + '?' + params.data + '&api_token=' + token, {
      headers: {
    		'Accept': 'application/json',
    		'Content-Type': 'application/json',
      }
    }).catch(err => {
      return {'status': 1, 'data': err};
    });

  if (response.status === 1) {
    return {'status': response.status, 'data': response.data};
  }

  const jsonStatus = await response.status;
  const jsonData = await response.json();
  if (500 > jsonStatus >= 300){
    return {'status': jsonStatus, 'data': jsonData};
  }
  if (jsonStatus >= 500) {
    return {'status': jsonStatus, 'data': 'server Error'}
  }

  return {'status': jsonStatus, 'data': jsonData};
}

const postApi = async(params) => {
  let url = fetchUrl(params.url);
  let view = '';
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  let body = JSON.stringify(params.body);

  if (params.hasOwnProperty('fetchId')) {
    view = '/' + params.fetchId;
  }

  if (params.hasOwnProperty('content')
    && params.content === 'multipart/form-data') {
    headers = {
      'Accept': 'application/json'
    };
    body = params.body;
  }

  const response = await timeout(url + view,
    {
      method: 'POST',
      headers: headers,
      body: body
    },
    60000
  ).catch(err => {
    return {'status': 1, 'data': err};
  });

  if (response.status === 1) {
    return {'status': response.status, 'data': response.data};
  }

  const jsonStatus = await response.status;
  const jsonData = await response.json();
  if (500 > jsonStatus >= 300) {
    return {'status': jsonStatus, 'data': jsonData};
  }
  if (jsonStatus >= 500) {
    return {'status': jsonStatus, 'data': 'server Error'}
  }

  return {'status': jsonStatus, 'data': jsonData};
}

const putApi = async(params) => {
  let url = fetchUrl(params.url);
  let view = '/' + params.fetchId;

  const response = await timeout(url + view, {
    method: 'PUT',
    headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
    },
    body: JSON.stringify(params.body)
  }).catch(err => {
    return {'status': 1, 'data': err};
  });

  if (response.status === 1) {
    return {'status': response.status, 'data': response.data};
  }

  const jsonStatus = await response.status;
  const jsonData = await response.json();
  if (500 > jsonStatus >= 300) {
    return {'status': jsonStatus, 'data': jsonData};
  }
  if (jsonStatus >= 500) {
    return {'status': jsonStatus, 'data': 'server Error'}
  }

  return {'status': jsonStatus, 'data': jsonData};
}

function deleteApi(params) {
  let url = fetchUrl(params.url);
  let view = '/' + params.fetchId;

  //fetch().then().then().catch();
}

const fetchApi = {
  fetchNow: async function (apiAction, params) {

    params.props.fetchInfoSet({
      toFetch: apiAction,
      parameters: params
    });
    /*
    const getPerms = await getPermissions();//console.log(getPerms);

    if (!getPerms) {
      //console.log('need to');
      const requestPerms = await requestPermissions();
      if (!requestPerms) {
        return { 'status': 1, 'data': 'Permission not granted'}
      }
    }
    */
    //console.log('yes');

    const executeRequest = async() => {
      switch (apiAction) {
        case 'get':
          return await getApi(params);
        case 'post':
          return await postApi(params);
        case 'put':
          return await putApi(params);
        case 'delete':
          return await deleteApi(params);
        default:
          return 'Bad Request';
      }
    }

    params.props.loadOn();
    const doneRequest = await executeRequest();
    //console.log(params.url + ': ' + doneRequest.status);
    params.props.loadOff();

    return doneRequest;
  }
}

export default fetchApi;
