# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# PropTypes get started

PropTypes are simply a mechanism that ensures that the passed value is of the correct datatype. This makes sure that we don’t receive an error at the very end of our app by the console which might not be easy to deal with.

## nstallation

npm install prop-types

## Syntax

MyComponent.propTypes = {
optionalArray: PropTypes.array,
optionalBigInt: PropTypes.bigint,
optionalBool: PropTypes.bool,
optionalFunc: PropTypes.func,
optionalNumber: PropTypes.number,
optionalObject: PropTypes.object,
optionalString: PropTypes.string,
optionalSymbol: PropTypes.symbol,}

# Default Props get started

The defaultProps is a React component property that allows you to set default values for the props argument. If the prop property is passed, it will be changed. The defaultProps can be defined as a property on the component class itself, to set the default props for the class.

## Syntax

MyComponent.defaultProps = {
name: "Vishnu",
eyeColor: "blue",
age: "20"
}

# Eslint

ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.

## Installation

npm init @eslint/config

## eslintrc file

eslintrc file contains all the rules and configurations to be followed in the project

## Intialize eslintrc file

npx eslint --init

# Prettier

Prettier is an opinionated code formatter which makes coding style consistent for teams.

## Eslint plugin installation

npm install eslint-config-prettier eslint-plugin-prettier prettier --save-dev

## Eslint and prettier scripts

"lint": "npx eslint src",
"lint:fix": "npm run lint -- --fix",
"prettier": "npx prettier src --check",
"prettier:fix": "npm run prettier -- --write",
"format": "npm run prettier:fix && npm run lint:fix"

# Babel plugin

Removes all console logs while the application is in production

## Installation

npm install babel-plugin-transform-remove-console --save

# .env configuration
 
create two files in root directory .env.development and .env.production

## code in .env.development

REACT_APP_API_URL='http://localhost:4000'

## code in .env.production

REACT_APP_API_URL='http://localhost:4000'

## to run the app

instead of npm start 
use npm run start:development to run in development environment
use npm run start:production to run in production environment