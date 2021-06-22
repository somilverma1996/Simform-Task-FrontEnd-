# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Deploy on netlify

First Install netlify-cli  globally on your system with the following command 

    `npm install netlify-cli -g`

To make a sharable link of netlify run the following command

    `netlify deploy`

The above command asks for authentication first, will directly open a tab to enter credentials in default browser.

After authentication it asks for the Publish Directory, that basically is required to point to from where we need to deploy. Here we need to pass "build".

    Publish directory /media/somil/db95795c-7cfe-467f-8422-9f9f8a6b2fc7/var/www/html/Assignment/

    build

This is turn will now create a website URl to share and use


