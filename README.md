# REST API for Cloubi Blog

A Node.js REST API for create, uodate and delete posts with JWT user authentication

## Requirements

This API Service can be deployed and run on Docker. For instructions for installing Docker please visit https://docs.docker.com/get-docker/

## Clone the project

Use either following command to clone the repository

```sh
git clone git@github.com:lakeedrock/cloubi_blog_server.git
```

or

```sh
git clone https://github.com/lakeedrock/cloubi_blog_server.git
```

## Update configs

Go to config folder and make a copy of example.config.env and rename it to config.env

```
cd config
cp example.config.env config.env
```

useing your favoirite text editer update following fonfig values

```
DB_URL= Mongodb server url
For Docker : use mongodb://mongo:27017/cloubi_blog
If you wish to run the project locally : use mongodb://localhost:{local mongodb port | default: 27017}/cloubi_blog
```

```
PORT= Api service port which you wish to run the API service
```

```
SECRET= Secret for JWT token
```

## Run the Project

Go to the project root directory nd run following command to run the project

```sh
docker-compose up
```

## Testing API

Use `Postman` application to test the API service. Download `Postman` application from https://www.postman.com/downloads/

Import API collection json file from `cloubi_blog_server/postman/Cloubi.postman_collection.json` to Postman. For more instruction please visit https://learning.postman.com/docs/getting-started/importing-and-exporting-data/

## API Documentation

### Check API is up and running

```
API Call : http://api_service_url/api/checkhealth
Method : GET
Body Parms : none
Response Object:
{
    "message": "ok"
}

```

### Register User

```
API Call : http://api_service_url/api/register
Method : POST
Body Parms Object:
{
    "name": String,
    "email": String,
    "password": String
}
Response Object:
{
    "name": String,
    "email": String,
    "_id": String,
    "__v": 0
}

```

### Login User

```
API Call : http://api_service_url/api/login
Method : POST
Body Parms Object:
{
    "email": String,
    "password": String
}
Response Object:
{
    "message": "success"
}

```

### Get Current Logged User

```
API Call : http://api_service_url/api/login
Method : GET
Body Parms Object: N/A
Response Object:
{
    "_id": String,
    "name": String,
    "email": String,
    "__v": 0
}

```

### Logout User

```
API Call : http://api_service_url/api/logout
Method : POST
Body Parms Object: N/A
Response Object:
{
    "message": "success"
}

```

### Create Post

```
API Call : http://api_service_url/api/post
Method : POST
Body Parms Object:
{
    "title": String,
    "text": String
}
Response Object:
{
    "message": "success",
    "post_id": String
}

```

### Get Post

```
API Call : http://api_service_url/api/post
Method : GET
Body Parms Object:
{
    "postId": String
}
Response Object:
{
    "_id": String,
    "title": String,
    "text": String
    "userId": String,
    "createdAt": Date,
    "updatedAt": Date,
    "__v": 0
}

```

### Update Post

```
API Call : http://api_service_url/api/post
Method : PUT
Body Parms Object:
{
    "postId": String,
    "title": String,
    "text": String
}
Response Object:
{
    "message": "success"
}

```

### Delete Post

```
API Call : http://api_service_url/api/post
Method : DELETE
Body Parms Object:
{
    "postId": String
}
Response Object:
{
    "message": "success"
}

```

### Thank you !

`#happycoding`
