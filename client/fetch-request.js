export const createPOSTrequest = (data) => {
  const headers = new Headers();
  return {
    method: 'POST',
    headers: headers,
    mode: 'CORS',
    cache: 'default'
  };
};

export const createGETrequest = (headers) => {

};
