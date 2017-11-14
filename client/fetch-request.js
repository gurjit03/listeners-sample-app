import { getItem } from './localstorage-helpers';

const SIMPLE_LOGIN_HEADERS = {
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json'
}

export const createPOSTRequestObj = (data) => {
  const headers = getAuthHeaders();
  headers.append('Accept', 'application/json, text/plain, */*');
  headers.append('Content-Type', 'application/json');
  return _createFetchRequestObj('POST',headers,data);
};

export const getAuthHeaders = () => {
  const userId = getItem('userId');
  const token = getItem('token');
  const headers = new Headers({
    'X-User-Id' : userId,
    'X-Auth-Token': token
  });
  return headers;
};

export const createGETRequestObj = () => {
  const headers = getAuthHeaders();
  return _createFetchRequestObj('POST',headers);
};

const _createFetchRequestObj = (method,headers,body) => {
  return {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
    mode: 'CORS',
    cache: 'default'
  };
};


export const createAuthRequest = (data) => {
  // const headers = new Headers();
  return _createFetchRequestObj('POST',SIMPLE_LOGIN_HEADERS,data);
};

// const createLoginRequest = (data) => {
//   const headers = new Headers();
//   return _createFetchRequestObj('POST',headers,data);
// };
