import { getItem } from './localstorage-helpers';

export const createPOSTRequestObj = (data) => {
  const headers = getAuthHeaders();
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

export const createGETRequestObj = (additionalHeaders) => {
  const headers = getAuthHeaders();
  return _createFetchRequestObj('POST',headers);
};

const _createFetchRequestObj = (method,headers,body) => {
  return {
    method: method,
    headers: headers,
    body: body,
    mode: 'CORS',
    cache: 'default'
  };
};
