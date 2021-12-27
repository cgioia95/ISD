# ISD-API
## A Serverless Micro-Service facilitating the Imaginary Sales Department

ISD-API leverages the Serverless Framework to easily develop, test locally and eventually deploy AWS Lambda functions into the cloud.


## Tech

Dillinger implements a number of technologies:

- NodeJs
- Typescript
- Serverless Stack
- Jest
- Docker
- Joi
- Postgres

## Installation

Required installations: 

- NodeJS:LTS
- NPM
- Docker & Docker-Compose

Install the dependencies and devDependencies:

```sh
npm i
```

Spin up the database locally and then seed it:

```sh
npm run db:start
npm run seed:run
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

# API Structure

The core of the API is facilitating the creation of leads and their associated interests.

A end-user can use the `form` api, which creates a lead and interest in transaction.
Alternatively, following a conversation with an ISD representative, the `manual` api can create Leads independently of interests, and later attach interests. 

```
/dev/leads:

GET: Returns ALL leads, ordered by the most recently created. 

/dev/leads/form:

POST: Creates the Lead + Interest:

Receives object like so: 

{
	"email": "John.Doe@gmail.com",
	"phone": "+491738341284",
	"firstName": "John",
	"lastName": "Doe",
    "message": "Product X"
}

Returns created object:

{
    "email": "sad.sadads@gmail.com",
    "phone": "+491738341284",
    "firstName": "askdh",
    "lastName": "Mjakdskl",
    "id": "da690751-aee7-4f8a-bb9b-3c43b6b129e8",
    "createdAt": "2021-12-27T13:48:04.899Z",
    "updatedAt": "2021-12-27T13:48:04.899Z"
}


/dev/leads/manual: 

POST: Creates a lead without a message to attach an associated interest. 

Receives object like so: 

{
	"email": "Jane.Doe@gmail.com",
	"phone": "+491739341284",
	"firstName": "Jane",
	"lastName": "Doe"
}

Returns created object:

{
    "email": "jia.mys@gmail.com",
    "phone": "+491739341284",
    "firstName": "Jia",
    "lastName": "McNuashlty",
    "id": "239b931c-f77b-4962-94e9-8894f993348d",
    "createdAt": "2021-12-27T12:31:39.828Z",
    "updatedAt": "2021-12-27T12:31:39.828Z"
}

/dev/interests/manual:

POST: Creates and associates an interest with an existing lead. 

Receives object like so: 

{
	"leadId": "249ae8e7-f5ac-4b01-bbe3-e539c8da98fd",
	"message": "The law!"
}

Returns created object: 

{
    "leadId": "249ae8e7-f5ac-4b01-bbe3-e539c8da98fd",
    "message": "The law!",
    "id": "1b7081a5-1c32-4cfc-91b6-fbf35d3a0b82",
    "createdAt": "2021-12-27T13:47:42.123Z",
    "updatedAt": "2021-12-27T13:47:42.123Z"
}

```



  

# Commit Standard

All commits are subject to linting and commit-message validation via the husky library, this will ensure a clean codebase upon the inclusion of other developers into the project. 

https://www.conventionalcommits.org/en/v1.0.0/
