# IT2810 - Project 2 - Group 16
This is a project for the course Web Development (IT2810) at NTNU, fall 2019.

The project can be found [here](http://it2810-16.idi.ntnu.no/prosjekt3/)

## Contributors
*  [Kim André Midtlid](https://github.com/kamidtli)
*  [Eirik Sture](https://github.com/eirsture)
*  [Sebastian Aas](https://github.com/SebastianAas)

# Documentation

## Functionality

IMDbest is a website for finding movies. The website have a large database of movies from many directors and genres. On IMDbest you can search for movies based on title or director. 
You can also find movies based on genre. On the homepage, you have easy access to the searchfield and see the latest released movies. 
You can also make your own user and save your favorite movies  

## Technology

### MongoDB
We use MongoDB as the database for the project. MongoDB is a NoSQL database and uses JSON-like documents for storing the data. 
This gives flexibility and fields can vary from document to document and data structures can be changed over time. 
The document model maps to the objects in your application code, making data easy to work with.

For our database we uses the Sample Mflix Dataset which is a database given by MongoDB. 
The dataset contains details on movies. Each document contains a single movie, and information such as its title, release year, and cast. 

### Express js
Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
Express.js is a framworks which helps to manage everything, from routes, to handling requests and views. When using express, it is easier to 
connect to a backend and many of the network logistics features are implemented. 

We have choose to use Express js, because it makes a lot of the logistics easier. It makes it possible to connect to a database using 
MongoDB and Mongoose, which we also intended to use. 

### Mongoose
For modeling your application data, Mongoose offers a simple, schema-based solution. 
It includes built-in casting, validation, query construction, hooks for business logic, and more, out of the box. 

To connect our database to the express server and node js, we uses mongoose. Mongoose is a elegant MongoDB object modeling for node.js, which makes it
easier for use to model the application data, and to connect to mongodb database. 

### GraphQL
GraphQL is a query language for APIs and a can be used instead of REST API. GraphQL is different from REST API in the sense that it only gets
concrete data requirement you query instead of all the data. 

We have choosen to use GraphQL for our query language, since we were curious on how GraphQL worked and wanted to learn more.
Some of the groups members had a some experience with use of REST API, but we all agreed to use GraphQL, because we wanted to learn more.

### Apollo Client
Apollo Client is a complete state management library for JavaScript apps. 
When using Apollo Client it makes it much simpler to write GraphQL queries.
After you have written a query , the Apollo Client will take care of requesting and caching your data, as well as updating your UI.

We have choose to use Apollo Client, because that makes it easier to connect the GraphQL query language with the frontend. 



### Testing




This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
