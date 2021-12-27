# ISD-API
## A Serverless Micro-Service facilitating the Imaginary Sales Department

ISD-API leverages the Serverless Framework to easily develop, test locally and eventually deploy AWS Lambda functions into the cloud.


## Tech

Dillinger implements a number of technologies:

- NodeJs
- Serverless Stack
- Jest
- Docker
- Joi

## Installation

Dillinger requires [Node.js](https://nodejs.org/) run, ensure latest stable release is installed.

Install the dependencies and devDependencies:

```sh
npm i
```

Spin up the database locally:

```sh
npm run db:start
```

To run the lambdas locally: 

```sh
npm start
```
This well expose the lambdas so they can be hit directly, via a platform such as Postman (A postman collection and environment is available at `/postman`

Run unit tests via: 
```sh
npm test
```

# Api Structure

The core of the API is facilitating the creation of leads and their associated interests.

A end-user can use the `form` api, which creates a lead and interest in transaction.
Alternatively, following a conversation with an ISD representative, the `manual` api can create Leads independently of interests, and later attach interests. 

# Commit Standard

All commits are subject to linting and commit-message validation via the husky library, this will ensure a clean codebase upon the inclusion of other developers into the project. 

https://www.conventionalcommits.org/en/v1.0.0/
