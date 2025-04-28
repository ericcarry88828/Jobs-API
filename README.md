# Blogging Platform API
The Jobs API is a project designed as a RESTful API system. 
It requires users, such as HR specialists, to register an account before logging in.
Once logged in, users can perform CRUD (Create, Read, Update, Delete) operations on candidates' interview statuses.
The system utilizes JWT (JSON Web Token) technology for managing user login and authentication, ensuring robust security. This approach not only enhances system security but also streamlines the user experience.

NOTE: This project does not implement a frontend client. The backend web service sends/recieves posts in JSON form. 

## Goals
The goals of this project are to:
- Demonstrate RESTful APIs and their best practices and conventions
- Demonstrate CRUD operations using an Object-Document Mapping (ODM)
- Implement JSON Web Token (JWT) for user authentication and authorization
- Handle common errors and provide meaningful error responses for better user experience

## Features
The RESTful API allows users to perform the following operations:
- Register a new user
- Log in a user
- Create a new job item
- Retrieve a single job item
- Retrieve all job items
- Update an existing job item
- Delete an existing job item

## Deployment
### Local
 - Clone the repository:
 ```
git clone git@github.com:ericcarry88828/Jobs-API.git
```
- Navigate into the directory:
```
cd Jobs-API
```
- Configure the `.env` file:
```
- Open the `.env` file in your preferred text editor.
- Set the `MONGO_URI` variable to point to your local MongoDB instance. For example:
  MONGO_URI=mongodb://127.0.0.1:27017/your-database-name
```
- Install dependencies:
```
npm install
```
- Start the application:
```
npm start
```

### Docker
 - Clone the repository:
```
git clone https://github.com/ericcarry88828/Todo-List-API.git
```
- Navigate into the directory:
```
cd Jobs-API
```
- Start the application using Docker:
```
docker compose up
```

- **Important:** If you have changed the MongoDB service name in your `docker-compose.yml`, make sure to update the hostname in the `MONGO_URI`. For example, if the service name is changed to `my-mongo`, set:
    MONGO_URI=mongodb://my-mongo:27017/your-database-name


## Examples

### User Registration
Register a new user using the following request:

```json
POST /api/v1/auth/register
{
  "name": "alan",
  "email": "alan@doe.com",
  "password": "123456"
}
```

This will validate the given details, make sure the email is unique and store the user details in the database.

```json
{
  "user": {
    "name": "alan"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODBmNTk3YmFkY2VmYTY5MzAzZGFmOGEiLCJuYW1lIjoiYWxhbiIsImlhdCI6MTc0NTgzNjQxMSwiZXhwIjoxNzQ4NDI4NDExfQ.RQ7f81ypgsn8DlQY3YNvhi_gr1pZ9wuAHdS9u3RJlYo"
}
```

### User Login
Authenticate the user using the following request:

```json
POST /api/v1/auth/login
{
  "email": "alan@gmail.com",
  "password": "123456"
}
```
This will validate the given email and password, and respond with a token if the authentication is successful.

```json
{
  "user": {
    "name": "alan"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODBmNTk3YmFkY2VmYTY5MzAzZGFmOGEiLCJuYW1lIjoiYWxhbiIsImlhdCI6MTc0NTgzNjQ5NCwiZXhwIjoxNzQ4NDI4NDk0fQ.wwA6GHtzNa2dr6mw4UST0mhChmU33Ytx-BMLGyRSPVo"
}
```

### Create a Job Item
Create a new job item using the following request:

```josn
POST /api/v1/auth/jobs
{
  "company": "netflix", "position": "back-end developer"
}
```
User must send the token received from the login endpoint in the header to authenticate the request. You can use the Authorization header with the token as the value. In case the token is missing or invalid, respond with an error and status code 401.

```josn
{
  "msg": "Authentication invalid"
}
```

Upon successful creation of the to-do item, respond with the details of the created item.

```josn
{
  "job": {
    "company": "netflix",
    "position": "back-end developer",
    "status": "pending",
    "createdBy": "680f597badcefa69303daf8a",
    "_id": "680f5a2eadcefa69303daf8d",
    "createdAt": "2025-04-28T10:36:30.814Z",
    "updatedAt": "2025-04-28T10:36:30.814Z",
    "__v": 0
    }
}
```

### Get a Single Job or All Jobs
Retrieve all jobs. Returns a list of job objects and the total count.
```
GET /api/v1/auth/jobs
```

```josn
{
  "jobs": [
    {
      "_id": "680f6334cd3859bb919e4c7f",
      "company": "netflix",
      "position": "intern",
      "status": "pending",
      "createdBy": "680f597badcefa69303daf8a",
      "createdAt": "2025-04-28T11:15:00.285Z",
      "updatedAt": "2025-04-28T11:15:41.501Z",
      "__v": 0
    },
    {
      "_id": "680f5a2eadcefa69303daf8d",
      "company": "netflix",
      "position": "back-end developer",
      "status": "pending",
      "createdBy": "680f597badcefa69303daf8a",
      "createdAt": "2025-04-28T11:15:13.956Z",
      "updatedAt": "2025-04-28T11:15:13.956Z",
      "__v": 0
    }
  ],
  "count": 2
}
```

Retrieve a single job by its ID. Returns the job object if found, or an error message if not found.
```
GET /api/v1/auth/jobs/680f5a2eadcefa69303daf8d
```
```json
{
  "job": {
      "_id": "680f5a2eadcefa69303daf8d",
      "company": "netflix",
      "position": "back-end developer",
      "status": "pending",
      "createdBy": "680f597badcefa69303daf8a",
      "createdAt": "2025-04-28T11:15:13.956Z",
      "updatedAt": "2025-04-28T11:15:13.956Z",
      "__v": 0
  }
}
```

```json
{
  "msg": "No item found with id : 680f6341cd3859bb919e4c811"
}
```


### Update a Job Item
Update an existing job item using the following request:

```json
PATCH /api/v1/jobs/680f5a2eadcefa69303daf8d
{
    "company": "netflix", "position": "full stack developer"
}
```

Just like the create job endpoint, user must send the token received. Also make sure to validate the user has the permission to update the job item i.e. the user is the creator of job item that they are updating. Respond with an error and status code 403 if the user is not authorized to update the item.

```json
{
  "msg": "No job with id 680f5a2eadcefa69303daf8d"
}
```

Upon successful update of the to-do item, respond with the updated details of the item.

```json
{
  "job": {
    "_id": "680f5a2eadcefa69303daf8d",
    "company": "netflix",
    "position": "full stack developer",
    "status": "pending",
    "createdBy": "680f597badcefa69303daf8a",
    "createdAt": "2025-04-28T11:08:00.295Z",
    "updatedAt": "2025-04-28T11:11:10.163Z",
    "__v": 0
  }
}
```

### Delete a Job Item
Delete an existing job item using the following request:
```
DELETE /api/v1/jobs/680f5a2eadcefa69303daf8d
```
User must be authenticated and authorized to delete the job item. Upon successful deletion, respond with the status code 200.
