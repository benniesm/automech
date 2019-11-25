import { serverApi, countryCodes } from './Api';

function fetchUrl(urlName) {
  switch (urlName) {
    case 'countryCode':
      return countryCodes;
    default:
      return serverApi + urlName;
  }
}

const timeout = async(ms, promise) => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("timeout"))
    }, ms)
    promise.then(resolve, reject)
  })
}

const getApi = async(params) => {
  let url = fetchUrl(params.url);
  let view = '';

  if (params.hasOwnProperty('fetchId')) {
    view = '/' + params.fetchId;
  }

  const token = params.token;

  const response =
    await fetch(url + view + '?' + params.data + '&api_token=' + token, {
      headers: {
    		'Accept': 'application/json',
    		'Content-Type': 'application/json',
      }
    }).catch(err => {
      throw {'status': 0, 'data': err};
    });
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

  const response = await fetch(url + view, {
    method: 'POST',
    headers: headers,
    body: body
  }).catch(err => {
    throw {'status': 0, 'data': err};
  });

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

  const response = await fetch(url + view, {
    method: 'PUT',
    headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
    },
    body: JSON.stringify(params.body)
  }).catch(err => {
    throw {'status': 0, 'data': err};
  });
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

  fetch().then().then().catch();
}

const fetchApi = {
  fetchNow: async function (apiAction, params) {
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
}

export default fetchApi;

//limit timeout connection for all requests so user can try again
