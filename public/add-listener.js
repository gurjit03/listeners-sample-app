/******************** LOCAL STORAGE ********************/
const getItem = (itemName) => {
  const jsonStringifiedValue = localStorage.getItem(itemName);
  console.log(jsonStringifiedValue);
  return JSON.parse(jsonStringifiedValue);
};


/****************** API PATH ***********************/
const BASEPATH = 'http://localhost:3000/api';

const createCustomAPIPath = (additionalPath) => {
  return BASEPATH +'/' + additionalPath;
};

/****************** POST REQUESTS... *****************/
const createPOSTRequestObj = (data) => {
  const headers = getAuthHeaders();
  headers.append('Accept', 'application/json, text/plain, */*');
  // headers.append('Content-Type', 'application/json');
  return _createFetchRequestObj('POST',headers,data);
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

const getAuthHeaders = () => {
  const userId = getItem('userId');
  const token = getItem('token');
  const headers = new Headers({
    'X-User-Id' : userId,
    'X-Auth-Token': token
  });
  return headers;
};

/************************************************/

window.addEventListener('load',function(){
  const addListenerButton = document.getElementById('addListener');
  //  adding the listener event
  addListenerButton.addEventListener('click',function() {
    event.preventDefault();
    const apiPath = createCustomAPIPath('add-listener');
    const postObject = createPOSTRequestObj();
    postObject.body = JSON.stringify({});
    // console.log(apiPath,postObject,postObject.headers.get("X-User-Id"),postObject.headers.get("X-Auth-Token"));
    fetch(apiPath,postObject).then(response => {
      console.log(response);
      return response.json();
    }).then(response => {
      console.log(response,"response");
      if(response.status === 201) {
        alert('Listener add successfully');
      }
    }).catch(err => {
      console.warn(err,"err");
      //alert(err.message);
    })
  });
});
