# listeners-sample-app
The app uses [Meteor-restivus](https://github.com/kahmali/meteor-restivus), which a Server Side Package, to manage the backend, user authentication and adding the listeners.

## Creating Restivus API ##
The following code is use to create a restivus Api

```
const Api = new Restivus({
  useDefaultAuth: true,
  enableCors: true,
  prettyJson: true,
  .... })
```

## User Authentication ##
1. The first and the foremost step in this is to add the `Meteor.users` collection to the Api we have created.
```
Api.addCollection(Meteor.users,{
  authRequired: true,
  endpoints: {
    login: {
      authRequired: false,
    }
  },
  excludedEndpoints: ['put','delete','patch']
});
```

2. The next step is to create a user from the frontend. Adding `Meteor.users` collection to Meteor Restivus, gives us various routes at backend to which we need to make a call using appropriate data. In this case we will make a call to `http:api-url/api/users` to create user by passing the `username, email and password in request body`. Using Fetch Api to make ajax requests. Now if the request is successful, the API will return `201` status and then we can login with the same username/email and password.

```
const mySignupRequest = createAuthRequest({username,email,password});

fetch(apiPath, mySignupRequest).then((response) => {
  // console.info(response)
});
```

3. For logining into the system, we need to do 2 steps.

1. First is login to the API ( using the same username/email and password.) by making an api call to the
`http://api-url/api/login`. login is the endpoint.
###IMP NOTE###: The call to the login endpoint returns authToken and userId which needs to be saved for next api calls from the authenticated user. These 2 things act as a authentication.

2. Second is to login to the system using client side accounts password method `Meteor.loginWithPassword`, It is necessary because, Meteor Restivus is a server side method only. In order for you to use client side of the system you need to be logged in there.

```
fetch(apiPath, myLoginRequest).then((response) => {
  console.log(response);
  return response.json();
}).then(response => {
  console.log(response.data,response);
  const { userId, authToken } = response.data;

  // Store the items on session variable
  setItem('token',authToken);
  setItem('userId',userId);

  Meteor.loginWithPassword(email,password,(err,res) => {
    if(err) {
      alert(err.message);
      // Store the items on session variable
      setItem('token',null);
      setItem('userId',null);
    }else {
      FlowRouter.redirect();
    }
  });
})
.catch(err => {
  console.error('err',err);
});
```
