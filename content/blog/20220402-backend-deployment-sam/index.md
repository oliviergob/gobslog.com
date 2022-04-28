---
title: Serverless Web App in AWS - Part 2 - Back End with Lambda / API Gateway and AWS SAM
date: "2022-04-03T09:02:22.284Z"
description: "Build an API using API Gateway, Lambda and S3 and automate its deployment using AWS SAM (Serverless Application Model)"
image: ./automation.png
---


This blog post is part a of series on [How to build and deploy a serverless web app on AWS](../20220226-build-webapp-aws/).


In this post we will:
* Create a simple Restful API using API Gateway and AWS Lambda
* Automate the deployment of those resources with AWS SAM

The API will be really simple and just read a file in an S3 bucket. It is unauthenticated and has just one method:
```GET /configuration```

![Architecture Diagram](./api-gateway-lambda.drawio.png "Architecture Diagram")


A few definitions first:
* AWS Lambda is a serverless compute service. It allows us to execute a function in the language of our choice (Python in our case) without having to worry at all about the infrastructure beneath it
* API Gateway allows us to publish and manage Rest APIs and route them to Lambda functions
* CloudFormaion lets us provision and manage AWS resources (E.G. API Gateways, Lambda Functions...) by treating infrastructure as code. It uses json or yaml templates describing the resources to be created and their relationships
* Serverless Application Model (SAM) is AWS framework for building Serverless applications. It provides a wrapper around CloudFormation and simplifies the templates required to create the AWS resources we need

## Prerequisites

* [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
* [Install AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* [Install Python 3.9](https://www.python.org/downloads/)

## The Lambda Function

Create a new project for the backend, it is important you have a separate git repository so it can be built and deployed independently when commits are pushed to the main branch.

By convention, I always put all AWS resources in a dedicated directory under ```./resources``` in my projects and name lambda function handler files ```function.py``` like that:
```
.
├── resources
│   └── functions
│       └── function_01
│           ├── function.py
│           └── requirements.txt
│       └── function_02
│           ├── function.py
│           └── requirements.txt
└── template.yaml
```

Create the lambda function file ```resources/functions/configuration/function.py```
It just read the ```config.yaml``` file in the S3 bucket and returns the content:

embed-url-code https://raw.githubusercontent.com/oliviergob/aws-tutorial-serverless-backend/part-02/resources/functions/configuration/function.py python

Create a ```requirements.txt``` file next to the function code to install PyYAML. SAM will install those requirement when building your lambda function.

embed-url-code https://raw.githubusercontent.com/oliviergob/aws-tutorial-serverless-backend/part-02/resources/functions/configuration/requirements.txt txt


## The SAM tempalte

At the root of the project, create your SAM template: ```template.yaml```

embed-url-code https://raw.githubusercontent.com/oliviergob/aws-tutorial-serverless-backend/part-02/template.yaml yaml


This tempalte defines a few resources:
* An S3 bucket, I use the AWS Account ID in the bucket name as it has to be unique accros all AWS Accounts
* An HTTP API. We could do without explicitly declaring it, but having the resource in the temaplte will allow later on to create multiple stages (e.g.: test and prod)
* A Lambda Function, those are the important fields:
  * ```Handler```: this is the module and the function to be called when the lambda function is invoked. Our function could end up having many packages and modules.
  * ```Architectures```: I use arm64 as it is cheaper to run than the default x86
  * ```Policies```: I defined here an inline policy allowing the lambda function to download file from the S3 bucket. This actually creates an IAM Role with the policy attached and assign it to the function.
  * ```Events```: The HttpGet event links the lambda function to the API created earlier (note the reference ```!Ref HttpApi```). This will create a GET method  under the ```/configuration``` path 


## Build and deploy the stack

Run the following SAM command to build and deploy your stack:

```
sam build
sam deploy --resolve-s3  --capabilities CAPABILITY_IAM --stack-name serverless-webapp-backend
```

Sam should return with the API URL and the S3 bucket name.
Upload a simple yaml config file like that one:
embed-url-code https://raw.githubusercontent.com/oliviergob/aws-tutorial-serverless-backend/part-02/config.yaml yaml
```
aws s3 cp ./config.yaml s3://serverless-webapp-prod-1111111111111
```

You can now try to invoke the /configuration GET method of your API:
```
curl https://<apiId>.execute-api.us-east-1.amazonaws.com/prod/configuration
```


## Get the front end to call the API

Now that we have our back end ready, we want our front end to call it
