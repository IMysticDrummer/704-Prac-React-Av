# NODEPOP practise to KeepCoding Full Stack Web 13

In the bass part you can access to the instructions incorporated by `create-react-app`.

## How's build this app

### Login / Signup page

There's a login/sign up page in which you are going to be redirect the first time you came to this site.  
In case you has logged in this site before, and you didn't logout, the site will remember you and you'll be redirect to the advertisements list.

To become a member, you have to signup. After the process, you'll be redirect directly to the advertisements list.  
In the case of a registration, the sesion is not going to be remembered when you go out. It's necessary to do a coplety login to be remembered by the app.

### Advertisement list

In this page you can see all the advertisements contained in the API.  
If there's no advertisements, the app will invite you to create one.  
You can operate the filters to get a better view of the advertisements of your interest.  
If there's no advertisements which have coincidende with your desires, the app will invite you to create one.

### New Advertisements

You can navigate between new advertisements and the advertisement list, by the links in the header of the page.  
To create a new advertisement, you'll must provide:

- the name of the product
- if you are selling our buying (looking for this product)
- the price of sale or the budget to get one
- the tags related to this product (lifestyle, mobile, work and/or motor). **You can choose more than one**
- a photografy of the product

All inputs are required, except the photo.

### Others

You can have access to an advertisement, adding the id in the url, after the `/adverts`. More exactly: `/adverts/{id}`.  
If you are wrong or you are looking for an advertisement that it doesn't exist, you'll be redirect to an 404 page.

As extra, the signup process.

I couldn't implement the filters save for the user.

All the pages, except login and 404 are protected, and you'll be redirect to the login page.

**Remember to have the nodepop-api running before start with this app**, to be sure to get advertisements.

Regards.

Iván García Rodríguez

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

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
