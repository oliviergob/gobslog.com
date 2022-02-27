---
title: Automate your Web Frontend build and deployment with AWS Amplify
date: "2022-02-27T09:02:22.284Z"
description: "Automate the build and deployment of your frontend using AWS Amplify"
---

I will focus here on the app deployment. I will build a simple page using Bulma CSS Framework and package the app using Webpack. The learnings here should apply with any other app framework or build tool.


## Creating the App
The steps below mostly follow [Bulma's documentation](https://bulma.io/documentation/customize/with-webpack/). Skip to the next section if you an app ready to deploy.

Create a new folder for your app and install webpack, bulma and the required dependencies:

```
mkdir my-web-app
cd my-web-app
npm init -y
npm install bulma --save-dev
npm install css-loader --save-dev
npm install extract-text-webpack-plugin@next --save-dev
npm install mini-css-extract-plugin --save-dev
npm install node-sass --save-dev
npm install sass-loader --save-dev
npm install style-loader --save-dev
npm install webpack --save-dev
npm install webpack-cli --save-dev
npm install webpack-dev-server --save-dev
npm install html-webpack-plugin --save-dev
```


Create a webpack.config.js file with the css loaders and a dev server for testing.

embed-url-code https://raw.githubusercontent.com/oliviergob/aws-training-amplify/main/webpack.config.js js