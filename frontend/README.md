# medium frontend

## Steps to Setup

1. If you have not run `npm install` at the root of the repo, please finish that at the root level first that will take care of setting up a few things for you.
2. Then, use `npm run dev` to start the development server for frontend.
3. Access the localhost url given once you start the dev server.

## Authentication

We will be using Github OAuth authentication for our app. You might have seen `Login using Google`, we will be using the approach but with github. \
Means You should provide an option like `Login using github`.\
In you UI, you should have an option like `Login using Github` with the link pointing to `https://github.com/login/oauth/authorize?client_id={{CLIEND_ID}}` to authenticate with github. \
It will redirect you to the github page to do the login process, once finished you will get the 200 success response.\
\
NOTE: Please access the `CLIENT_ID` from the env variable. Please do not commit any environment variables in your code.

## Check whether logged in or not

Use the endpoint provided in the backend to see if the user is logged in or not.

## Building and serving the react app

1. Run `npm run build` to generate static files
2. Once the `dist` folder is generated, follow the steps provided [here](../backend/README.md#serving-static-files).
