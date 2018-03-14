# Chatty API

This API was developed as test.
It was designed with **[Swagger](https://swagger.io/)** and developed in **[NodeJS](https://nodejs.org/en/)** with **[Express](http://expressjs.com)** and **[Firestore](https://firebase.google.com/docs/firestore/?hl=en)** 

This project consist in an REST API who handle communication between users.


# Installation
Follow this steps to run Chatty API:

 - Clone this repository locally or in a server;
 - Create a Firestore database;
 - Copy and paste the json of your API Key inside the file  **fs_apiKey.json** located in the project's root;
 - Install all dependencies with the comand
	 ```sh
	 $ npm install
	 ```
- Run the Chatty API 
	```sh
	$ npm start
	```
The API now are listen your app requests in the port 9000.

Next I'll present you the paths and required parameters Chatty API will expect.

# Paths

 ## /users
To create Users send a **POST** request with a json object like
{
	"name": "string",
	"username": "strting"
}

The *username* field is unique and accept alphanumeric char and only the specials "." and "_" .
When created, the User will receive 10 budgets to send messages.

## /users/:id
Send a **GET** request passing the hash ID from an user to get all information about him.

*Request*: localhost:9000/users/aUc3h1UAeqIP51Lymf9H

*Response*: {
					    "username": "string",
					    "updatedAt": "Date ISO String",
					    "createdAt": "Date ISO String",
					    "budget": Integer,
					    "name": "string",
					    "id": "Hash String"
					}

## /messages

Send a **POST** request with a json object to send a message to other user.
{
	"from":  "string",
	"to":  "string",
	"body":  "string"
}

## /messages/:to

Send a **GET** request passing the receiver *Hash Id* to get all messages the User has received.

*Request*: localhost:9000/messages/o9hkIN517XRGmFE9Vnnv

*Response*: {  "messages":  [  {  
"id":  "string",  
"from":  "string", 
"to":  "string", 
"body":  "string",  
"sentAt":  "2018-03-14T15:31:09.446Z"  
}]  
}

## /message/:id

Send a **GET** request passing the hash ID from a message to get his informations.

*Request*: localhost:9000/message/e6f5GZtPPxxIY7jVdXFh

*Response*: {  
"id":  "string",  
"from":  "string",  
"to":  "string",  
"body":  "string",  
"sentAt":  "2018-03-14T15:47:52.960Z"  
}

## More
To get more information about the *Status* response from the server, please, access the designed structure on [SwaggerHub - ChattyAPI](https://app.swaggerhub.com/apis/p47/Chatty/1.0.0)


# Docker

To run Chatty API in a container, please, follow this steps:
    - Grant executable permission to *DockerRun* file:
    
        ```sh
              $ sudo chmod +x DockerRun
        ```
    - Run DockerRun file:
    
        ```sh
              $ ./DockerRun
        ```
	
*DockerRun* will build a new image from a server with **NodeJS** and execute the *docker run* command to start a new container.
